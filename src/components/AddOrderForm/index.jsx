import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../../context/AppContext";

import {
  OrderContainer,
  OrderHeader,
  Form,
  FormRow,
  FormInput,
  ProductContainer,
  Button,
  CustomerInfo,
  ShipmentSelect,
  OrderTable,
  OrderTH,
  OrderTD,
  QtyInput,
  RemoveBtn,
} from "./styledComponents";

/* ---------------- HELPERS ---------------- */

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1,
  ).padStart(2, "0")}-${String(d.getFullYear()).slice(-2)}`;
};

const getOrderedQty = (addedProducts, shipmentId, productName, categoryName) =>
  addedProducts
    .filter(
      (p) =>
        p.shipmentId === shipmentId &&
        p.productName.toLowerCase() === productName.toLowerCase() &&
        (p.categoryName || "") === (categoryName || ""),
    )
    .reduce((sum, p) => sum + p.quantity, 0);

/* ---------------- COMPONENT ---------------- */

const CreateOrder = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [city, setCity] = useState("");
  const { state } = useAppContext();
  const cities = state.cities;

  const [products, setProducts] = useState([
    {
      productName: "",
      categoryName: "",
      shipmentId: "",
      quantity: 1,
      soldPrice: 0,
      priceAtShipment: 0,
      shipments: [],
      categories: [],
    },
  ]);

  const [addedProducts, setAddedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("saFruitsToken");

  /* -------- FETCH CUSTOMER -------- */

  useEffect(() => {
    if (customerNumber.length !== 10) {
      setCustomerDetails(null);
      return;
    }

    axios
      .get(
        `https://backend-zmoa.onrender.com/customers/phone/${customerNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setCustomerDetails(res.data);
        if (res.data.city) setCity(res.data.city);
      })
      .catch(() => {
        setCustomerDetails(null);
        toast.error("Customer not found");
      });
  }, [customerNumber, token]);

  /* -------- PRODUCT SEARCH -------- */

  const handleSearchShipments = async (index) => {
    const prod = products[index];
    if (!prod.productName.trim()) return toast.error("Enter product name");

    try {
      const res = await axios.get(
        `https://backend-zmoa.onrender.com/shipments/product/${prod.productName}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const shipments = res.data.filter((s) =>
        s.products.some(
          (p) =>
            p.productName.toLowerCase() === prod.productName.toLowerCase() &&
            p.remainingQuantity > 0,
        ),
      );

      const categories = new Set();
      shipments.forEach((s) =>
        s.products.forEach((p) => {
          if (
            p.productName.toLowerCase() === prod.productName.toLowerCase() &&
            p.remainingQuantity > 0 &&
            p.categoryName
          ) {
            categories.add(p.categoryName);
          }
        }),
      );

      const updated = [...products];
      updated[index].shipments = shipments;
      updated[index].categories = [...categories];
      updated[index].shipmentId =
        shipments.length === 1 ? shipments[0]._id : "";
      updated[index].priceAtShipment =
        shipments.length === 1
          ? shipments[0].products.find(
              (p) =>
                p.productName.toLowerCase() ===
                  prod.productName.toLowerCase() &&
                (!prod.categoryName ||
                  p.categoryName?.toLowerCase() ===
                    prod.categoryName.toLowerCase()),
            )?.priceAtShipment || 0
          : 0;

      setProducts(updated);
    } catch {
      toast.error("Error fetching shipments");
    }
  };

  /* -------- ADD PRODUCT -------- */

  const handleAddProduct = (index) => {
    const prod = products[index];
    if (!prod.shipmentId) return toast.error("Select shipment");
    if (!prod.soldPrice || prod.soldPrice <= 0)
      return toast.error("Enter a valid sold price");

    const shipment = prod.shipments.find((s) => s._id === prod.shipmentId);
    const shipmentProduct = shipment.products.find(
      (p) =>
        p.productName.toLowerCase() === prod.productName.toLowerCase() &&
        (!prod.categoryName ||
          p.categoryName?.toLowerCase() === prod.categoryName.toLowerCase()),
    );

    const orderedQty = getOrderedQty(
      addedProducts,
      shipment._id,
      prod.productName,
      prod.categoryName,
    );

    const availableQty = shipmentProduct.remainingQuantity - orderedQty;
    if (prod.quantity > availableQty)
      return toast.error(`Only ${availableQty} available`);

    setAddedProducts((prev) => {
      const existing = prev.find(
        (p) =>
          p.shipmentId === shipment._id &&
          p.productName === prod.productName &&
          (p.categoryName || "") === (prod.categoryName || ""),
      );

      if (existing) {
        return prev.map((p) =>
          p === existing
            ? {
                ...p,
                quantity: p.quantity + prod.quantity,
                remainingQuantity: availableQty - prod.quantity,
              }
            : p,
        );
      }

      return [
        ...prev,
        {
          productName: prod.productName,
          categoryName: prod.categoryName,
          shipmentId: shipment._id,
          vehicleNumber: shipment.vehicleNumber,
          shipmentDate: shipment.shipmentDate,
          quantity: prod.quantity,
          soldPrice: prod.soldPrice,
          priceAtShipment: shipmentProduct.priceAtShipment,
          maxQuantity: availableQty,
          remainingQuantity: availableQty - prod.quantity,
        },
      ];
    });

    setProducts((prev) =>
      prev.map((p, i) =>
        i === index
          ? {
              productName: "",
              categoryName: "",
              shipmentId: "",
              quantity: 1,
              soldPrice: 0,
              priceAtShipment: 0,
              shipments: [],
              categories: [],
            }
          : p,
      ),
    );
  };

  /* -------- SUBMIT ORDER -------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addedProducts.length) return toast.error("Add products first");

    setLoading(true);
    try {
      await axios.post(
        "https://backend-zmoa.onrender.com/orders/create",
        { customerNumber, city, products: addedProducts },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Order created");
      setAddedProducts([]);
    } catch {
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <OrderContainer>
      <ToastContainer />
      <OrderHeader>Create Order</OrderHeader>

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormInput
            placeholder="Customer Phone"
            value={customerNumber}
            onChange={(e) =>
              setCustomerNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />

          <FormInput
            as="select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </FormInput>
        </FormRow>

        {customerDetails && (
          <CustomerInfo>
            <p>Name: {customerDetails.customerName}</p>
            <p>Pending: {customerDetails.pendingAmount || 0}</p>
          </CustomerInfo>
        )}

        <ProductContainer>
          {products.map((prod, index) => (
            <FormRow key={index}>
              <FormInput
                placeholder="Product Name"
                value={prod.productName}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) =>
                      i === index
                        ? { ...p, productName: e.target.value, shipmentId: "" }
                        : p,
                    ),
                  )
                }
              />

              <Button
                type="button"
                onClick={() => handleSearchShipments(index)}
              >
                Search
              </Button>

              {prod.categories.length > 0 && (
                <FormInput
                  as="select"
                  value={prod.categoryName}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p, i) =>
                        i === index
                          ? {
                              ...p,
                              categoryName: e.target.value,
                              shipmentId: "",
                            }
                          : p,
                      ),
                    )
                  }
                >
                  <option value="">Select Category</option>
                  {prod.categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </FormInput>
              )}

              <ShipmentSelect
                value={prod.shipmentId}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) => {
                      if (i === index) {
                        const selectedShipment = p.shipments.find(
                          (s) => s._id === e.target.value,
                        );
                        const shipmentProduct = selectedShipment?.products.find(
                          (pr) =>
                            pr.productName.toLowerCase() ===
                              p.productName.toLowerCase() &&
                            (!p.categoryName ||
                              pr.categoryName?.toLowerCase() ===
                                p.categoryName.toLowerCase()),
                        );
                        return {
                          ...p,
                          shipmentId: e.target.value,
                          priceAtShipment:
                            shipmentProduct?.priceAtShipment || 0,
                        };
                      }
                      return p;
                    }),
                  )
                }
              >
                <option value="">Select Shipment</option>
                {prod.shipments.map((s) => {
                  const shipmentProduct = s.products.find(
                    (p) =>
                      p.productName.toLowerCase() ===
                        prod.productName.toLowerCase() &&
                      (!prod.categoryName ||
                        p.categoryName?.toLowerCase() ===
                          prod.categoryName.toLowerCase()),
                  );
                  if (!shipmentProduct) return null;

                  const orderedQty = getOrderedQty(
                    addedProducts,
                    s._id,
                    prod.productName,
                    prod.categoryName,
                  );

                  const availableQty =
                    shipmentProduct.remainingQuantity - orderedQty;
                  if (availableQty <= 0) return null;

                  return (
                    <option key={s._id} value={s._id}>
                      {s.vehicleNumber} | {formatDate(s.shipmentDate)} |
                      Remaining: {availableQty} | CP:{" "}
                      {shipmentProduct.priceAtShipment}
                    </option>
                  );
                })}
              </ShipmentSelect>

              <FormInput
                type="number"
                value={prod.quantity}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) =>
                      i === index
                        ? { ...p, quantity: Number(e.target.value) }
                        : p,
                    ),
                  )
                }
              />

              <FormInput
                type="number"
                step={0.01}
                placeholder="Sold Price"
                value={prod.soldPrice}
                onChange={(e) =>
                  setProducts((prev) =>
                    prev.map((p, i) =>
                      i === index
                        ? { ...p, soldPrice: Number(e.target.value) }
                        : p,
                    ),
                  )
                }
              />

              <Button type="button" onClick={() => handleAddProduct(index)}>
                Add
              </Button>
            </FormRow>
          ))}
        </ProductContainer>

        {addedProducts.length > 0 && (
          <OrderTable>
            <thead>
              <tr>
                <OrderTH>Product</OrderTH>
                <OrderTH>Category</OrderTH>
                <OrderTH>Shipment</OrderTH>
                <OrderTH>Qty</OrderTH>
                <OrderTH>CP</OrderTH>
                <OrderTH>SP</OrderTH>
                <OrderTH>Amount</OrderTH>
                <OrderTH>Action</OrderTH>
              </tr>
            </thead>
            <tbody>
              {addedProducts.map((p, idx) => (
                <tr key={idx}>
                  <OrderTD>{p.productName}</OrderTD>
                  <OrderTD>{p.categoryName || "-"}</OrderTD>
                  <OrderTD>
                    {p.vehicleNumber} | {formatDate(p.shipmentDate)}
                  </OrderTD>
                  <OrderTD>
                    <QtyInput
                      type="number"
                      min={1}
                      max={p.maxQuantity}
                      value={p.quantity}
                      onChange={(e) =>
                        setAddedProducts((prev) =>
                          prev.map((x, i) =>
                            i === idx
                              ? {
                                  ...x,
                                  quantity: Number(e.target.value),
                                  remainingQuantity:
                                    x.maxQuantity - Number(e.target.value),
                                }
                              : x,
                          ),
                        )
                      }
                    />
                  </OrderTD>
                  <OrderTD>{p.priceAtShipment}</OrderTD>
                  <OrderTD>{p.soldPrice.toFixed(2)}</OrderTD>
                  <OrderTD>{(p.soldPrice * p.quantity).toFixed(2)}</OrderTD>
                  <OrderTD>
                    <RemoveBtn
                      onClick={() =>
                        setAddedProducts((prev) =>
                          prev.filter((_, i) => i !== idx),
                        )
                      }
                    >
                      Remove
                    </RemoveBtn>
                  </OrderTD>
                </tr>
              ))}
            </tbody>
          </OrderTable>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Order"}
        </Button>
      </Form>
    </OrderContainer>
  );
};

export default CreateOrder;

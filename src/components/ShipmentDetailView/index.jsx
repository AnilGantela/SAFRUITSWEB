import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ShipmentDetailView = ({ shipment: shipmentProp }) => {
  const { shipmentId } = useParams();

  const [shipment, setShipment] = useState(shipmentProp || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get("saFruitsToken");

  useEffect(() => {
    // If shipment is already passed as prop, no need to fetch
    if (shipmentProp) {
      setShipment(shipmentProp);
      return;
    }

    // If no prop and no URL param, do nothing
    if (!shipmentId) return;

    const fetchShipment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backend-zmoa.onrender.com/shipments/${shipmentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setShipment(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [shipmentProp, shipmentId]);

  // ---------- UI states ----------
  if (loading) return <div>Loading shipment...</div>;
  if (error) return <div>{error}</div>;
  if (!shipment) return <div>No shipment data available</div>;

  const {
    shipmentDate,
    transportCompany,
    vehicleNumber,
    city,
    products = [],
  } = shipment;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Shipment Details</h2>

      <p>
        <strong>Date:</strong>{" "}
        {shipmentDate
          ? new Date(shipmentDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A"}
      </p>

      <p>
        <strong>Transport Company:</strong> {transportCompany || "N/A"}
      </p>
      <p>
        <strong>Vehicle Number:</strong> {vehicleNumber || "N/A"}
      </p>
      <p>
        <strong>City:</strong> {city || "N/A"}
      </p>

      <h3>Products</h3>
      {products.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Product Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Category Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Quantity
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Remaining Quantity
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.productName || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.categoryName || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.quantity}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.remainingQuantity}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.priceAtShipment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ShipmentDetailView;

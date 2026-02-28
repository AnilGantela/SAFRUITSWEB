import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CustomerDataContainer,
  CustomerInfoBox,
  CustomerInfoContainer,
  CustomerInfoItem,
  CustomerPage,
  Table,
  TableContainer,
  TableContainerHeader,
  TablesContainer,
  PaginationContainer,
  PaginationButton,
} from "./styledComponents";
import { ChartsContainer } from "./styledComponents";
import { ChartCard } from "./styledComponents";

const ITEMS_PER_PAGE = 5;

const CustomerDetailView = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const customerName = query.get("name");
  const phoneNumberQuery = query.get("phone");

  const [customerDetails, setCustomerDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orderSearch, setOrderSearch] = useState("");
  const [paymentSearch, setPaymentSearch] = useState("");

  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const [currentPaymentPage, setCurrentPaymentPage] = useState(1);

  const token = Cookies.get("saFruitsToken");

  /* ===============================
     🔹 API FUNCTIONS
  =============================== */

  const fetchCustomerDetails = async () => {
    try {
      let res;

      if (phoneNumberQuery) {
        res = await axios.get(
          `https://backend-zmoa.onrender.com/customers/phone/${phoneNumberQuery}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else if (customerName) {
        res = await axios.get(
          `https://backend-zmoa.onrender.com/customers/name/${customerName}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        toast.error("No customer identifier provided");
        return null;
      }

      return res.data;
    } catch (error) {
      toast.error("Customer not found");
      return null;
    }
  };

  const fetchCustomerOrders = async (customerId) => {
    try {
      const res = await axios.get(
        `https://backend-zmoa.onrender.com/customers/orders/${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data || [];
    } catch (error) {
      toast.error("Failed to fetch orders");
      return [];
    }
  };

  const fetchCustomerPayments = async (customerId) => {
    try {
      const res = await axios.get(
        `https://backend-zmoa.onrender.com/customers/payments/${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data || [];
    } catch (error) {
      toast.error("Failed to fetch payments");
      return [];
    }
  };

  /* ===============================
     🔹 LOAD CUSTOMER
  =============================== */

  useEffect(() => {
    const loadCustomer = async () => {
      setLoading(true);
      const data = await fetchCustomerDetails();
      if (data) setCustomerDetails(data);
      setLoading(false);
    };

    loadCustomer();
  }, [customerName, phoneNumberQuery, token]);

  /* ===============================
     🔹 LOAD ORDERS & PAYMENTS
  =============================== */

  useEffect(() => {
    if (!customerDetails) return;

    const loadData = async () => {
      const [ordersData, paymentsData] = await Promise.all([
        fetchCustomerOrders(customerDetails._id),
        fetchCustomerPayments(customerDetails._id),
      ]);

      setOrders(ordersData);
      setPayments(paymentsData);
    };

    loadData();
  }, [customerDetails]);

  /* ===============================
     🔹 SEARCH FILTERING
  =============================== */

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.orderId?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        new Date(o.orderDate)
          .toLocaleDateString()
          .includes(orderSearch.toLowerCase()),
    );
  }, [orders, orderSearch]);

  const filteredPayments = useMemo(() => {
    return payments.filter(
      (p) =>
        p.paymentId?.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        p.paymentMode?.toLowerCase().includes(paymentSearch.toLowerCase()),
    );
  }, [payments, paymentSearch]);

  /* ===============================
     🔹 PAGINATION
  =============================== */

  const paginate = (data, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  const paginatedOrders = paginate(filteredOrders, currentOrderPage);
  const paginatedPayments = paginate(filteredPayments, currentPaymentPage);

  const totalOrderPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const totalPaymentPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!customerDetails) return <p style={{ padding: 20 }}>Not Found</p>;
  // ===== PIE DATA FUNCTION (BY PRODUCT NAME) =====
  const generateProductPieData = (orders) => {
    const map = {};

    orders.forEach((order) => {
      order.orderProducts?.forEach((product) => {
        const name = product.productName || "Unknown Product";

        map[name] = (map[name] || 0) + 1;
      });
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  };

  const ProductPieChart = ({ orders }) => {
    const data = generateProductPieData(orders);

    const COLORS = ["#9c0101", "#e5383b", "#ff6b6b", "#ff8787", "#ffa8a8"];

    if (!data.length) return <p>No Data Available</p>;

    return (
      <ChartCard>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="left" />
          </PieChart>
        </ResponsiveContainer>
        <h3>Most Bought Products</h3>
      </ChartCard>
    );
  };

  const generateMonthlyOrderData = (orders) => {
    const monthMap = {};

    orders.forEach((order) => {
      if (!order.orderDate) return;

      const date = new Date(order.orderDate);
      if (isNaN(date)) return;

      const year = date.getFullYear();
      const month = date.getMonth();

      const key = `${year}-${month}`;

      if (!monthMap[key]) {
        monthMap[key] = {
          monthLabel: date.toLocaleString("default", { month: "short" }),
          year,
          month,
          orders: 0,
        };
      }

      monthMap[key].orders += 1;
    });

    return Object.values(monthMap)
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      })
      .map((item) => ({
        month: `${item.monthLabel}`,
        orders: item.orders,
      }));
  };

  const OrdersBarChart = ({ orders }) => {
    const data = generateMonthlyOrderData(orders);

    if (!data.length) return <p>No Data Available</p>;

    return (
      <ChartCard>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            <Bar dataKey="orders" fill="#9c0101" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <h3>Orders Per Month</h3>
      </ChartCard>
    );
  };

  return (
    <CustomerPage>
      <ToastContainer />

      {/* CUSTOMER INFO */}
      <CustomerInfoContainer>
        <CustomerInfoBox>
          <CustomerInfoItem>
            <h2>{customerDetails.customerName}</h2>
          </CustomerInfoItem>
          <CustomerInfoItem>
            <p>Phone: {customerDetails.phoneNumber}</p>
            <p>City: {customerDetails.city || "N/A"}</p>
          </CustomerInfoItem>
          <CustomerInfoItem>
            <p>Email: {customerDetails.email || "N/A"}</p>
          </CustomerInfoItem>
        </CustomerInfoBox>
      </CustomerInfoContainer>

      {/* TABLES */}
      <CustomerDataContainer>
        <ChartsContainer>
          <ProductPieChart orders={filteredOrders} />
          <OrdersBarChart orders={filteredOrders} />
        </ChartsContainer>
        <TablesContainer>
          {/* ORDERS TABLE */}
          <TableContainer>
            <TableContainerHeader>
              <h3>Orders</h3>
              <input
                placeholder="Search orders..."
                value={orderSearch}
                onChange={(e) => {
                  setOrderSearch(e.target.value);
                  setCurrentOrderPage(1);
                }}
              />
            </TableContainerHeader>

            <Table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    onClick={() =>
                      window.open(
                        `/order/${order._id}`,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      {(currentOrderPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td>{order.orderId}</td>
                    <td>{order.orderProducts.length}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              currentPage={currentOrderPage}
              totalPages={totalOrderPages}
              setPage={setCurrentOrderPage}
            />
          </TableContainer>

          {/* PAYMENTS TABLE */}
          <TableContainer>
            <TableContainerHeader>
              <h3>Payments</h3>
              <input
                placeholder="Search payments..."
                value={paymentSearch}
                onChange={(e) => {
                  setPaymentSearch(e.target.value);
                  setCurrentPaymentPage(1);
                }}
              />
            </TableContainerHeader>

            <Table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    onClick={() =>
                      window.open(
                        `/payment/${payment._id}`,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      {(currentPaymentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td>{payment.paymentId}</td>
                    <td>₹ {payment.amount}</td>
                    <td>{payment.paymentMode}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination
              currentPage={currentPaymentPage}
              totalPages={totalPaymentPages}
              setPage={setCurrentPaymentPage}
            />
          </TableContainer>
        </TablesContainer>
      </CustomerDataContainer>
    </CustomerPage>
  );
};

/* ===============================
   🔹 PAGINATION COMPONENT
=============================== */

const Pagination = ({ currentPage, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        Prev
      </PaginationButton>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default CustomerDetailView;

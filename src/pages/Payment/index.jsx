import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppContext } from "../../context/AppContext";

import {
  ShipmentsContainer,
  ShipmentsContainerContentContainer,
  ShipmentsContainerHeaderContainer,
  ShipmentsContainerMenuContainer,
  ShipmentsTable,
  ShipmentTableDataCell,
  ShipmentTableHeader,
  ShipmentTableHeadTitle,
  ShipmentTableRow,
} from "../Shipments/styledComponents"; // reuse styles

const Payments = () => {
  const { state } = useAppContext();
  const [allPayments, setAllPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(filteredPayments.length / limit);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("saFruitsToken");

      const res = await axios.get(
        "https://backend-zmoa.onrender.com/payments",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data && Array.isArray(res.data.payments)) {
        const paymentsWithDate = res.data.payments.map((payment) => ({
          ...payment,
          date: new Date(payment.paymentDate),
        }));

        console.log(res.data);
        setAllPayments(paymentsWithDate);
        setFilteredPayments(paymentsWithDate);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const currentPayments = filteredPayments.slice(
    (page - 1) * limit,
    page * limit,
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // Export Excel
  const exportToExcel = () => {
    const wsData = currentPayments.map((payment) => ({
      "Payment ID": payment._id,
      Customer: payment.customerId?.customerName,
      Phone: payment.customerId?.phoneNumber,
      Amount: payment.amount,
      Mode: payment.paymentMode,
      Date: format(payment.date, "yyyy-MM-dd"),
    }));

    const now = new Date();
    const fileName = `payments_${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()}_${now.getHours()}-${now.getMinutes()}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "payments");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <ShipmentsContainer>
      <ShipmentsContainerHeaderContainer>
        <h1>Payments</h1>
      </ShipmentsContainerHeaderContainer>

      <ShipmentsContainerMenuContainer>
        <label>
          Items per page:&nbsp;
          <select
            value={limit}
            style={{ cursor: "pointer" }}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size} style={{ cursor: "pointer" }}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={exportToExcel}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Download Excel
        </button>
        <button
          onClick={fetchPayments}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Refresh
        </button>

        {/* 🔥 Open Create Payment in New Tab */}
        <button
          style={{ padding: "5px 10px", cursor: "pointer" }}
          onClick={() => window.open("/payments/create", "_blank")}
        >
          Add Payment
        </button>
        <button
          style={{ padding: "5px 10px", cursor: "pointer" }}
          onClick={() => window.open("/invoice-create", "_blank")}
        >
          Add Invoice
        </button>
      </ShipmentsContainerMenuContainer>

      <ShipmentsContainerContentContainer>
        <ShipmentsTable>
          <ShipmentTableHeader $bColor={state.colors.primary}>
            <ShipmentTableRow>
              <ShipmentTableHeadTitle>S.No</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Customer</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Phone</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Date</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Mode</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Amount</ShipmentTableHeadTitle>
            </ShipmentTableRow>
          </ShipmentTableHeader>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Loading...
                </td>
              </tr>
            ) : currentPayments.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              currentPayments.map((payment, index) => (
                <Popup
                  key={payment._id}
                  trigger={
                    <ShipmentTableRow
                      $bColor={state.colors.secondary}
                      style={{ cursor: "pointer" }}
                    >
                      <ShipmentTableDataCell>
                        {(page - 1) * limit + index + 1}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {payment.customerId?.customerName}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {payment.customerId?.phoneNumber}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {format(payment.date, "dd-MM-yyyy")}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {payment.paymentMode}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        ₹{payment.amount}
                      </ShipmentTableDataCell>
                    </ShipmentTableRow>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div style={{ padding: "20px" }}>
                      <h3>Payment Details</h3>
                      <p>
                        <strong>Name:</strong> {payment.customerId?.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {payment.customerId?.phone}
                      </p>
                      <p>
                        <strong>Amount:</strong> ₹{payment.amount}
                      </p>
                      <p>
                        <strong>Mode:</strong> {payment.paymentMode}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {format(payment.date, "dd-MM-yyyy HH:mm")}
                      </p>
                      <button onClick={close}>Close</button>
                    </div>
                  )}
                </Popup>
              ))
            )}
          </tbody>
        </ShipmentsTable>
      </ShipmentsContainerContentContainer>

      {/* Pagination */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          width: "95%",
          marginInline: "auto",
        }}
      >
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </ShipmentsContainer>
  );
};

export default Payments;

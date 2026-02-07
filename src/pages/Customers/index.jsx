import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Popup from "reactjs-popup";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import "react-toastify/dist/ReactToastify.css";

import AddCustomerForm from "../../components/AddCustomerForm";
import {
  CustomersContainer,
  CustomersHeader,
  CustomersTable,
  CustomerTableHeader,
  CustomerTableRow,
  CustomerTableHeadTitle,
  CustomerTableDataCell,
} from "./styledComponents";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const { state } = useAppContext();

  const fetchCustomers = async () => {
    try {
      const token = Cookies.get("saFruitsToken");
      const response = await axios.get(
        "https://backend-zmoa.onrender.com/customers/",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <CustomersContainer>
      <ToastContainer position="top-right" autoClose={3000} />

      <CustomersHeader
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <h1>Customers</h1>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "5px", width: "200px" }}
          />

          {/* Add Customer Popup */}
          <Popup
            trigger={
              <button
                style={{
                  padding: "6px 12px",
                  backgroundColor: state.colors.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add Customer
              </button>
            }
            modal
            nested
            closeOnDocumentClick
            closeOnEscape
            contentStyle={{
              background: "transparent",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
              width: "100vw",
              height: "100vh",
            }}
          >
            {(close) => (
              <AddCustomerForm
                onClose={close}
                onCustomerAdded={fetchCustomers}
              />
            )}
          </Popup>
        </div>
      </CustomersHeader>

      <CustomersTable>
        <CustomerTableHeader $bcolor={state.colors.primary}>
          <CustomerTableRow>
            <CustomerTableHeadTitle>S.No</CustomerTableHeadTitle>
            <CustomerTableHeadTitle>Name</CustomerTableHeadTitle>
            <CustomerTableHeadTitle>Email</CustomerTableHeadTitle>
            <CustomerTableHeadTitle>Phone Number</CustomerTableHeadTitle>
            <CustomerTableHeadTitle>Pending Amount</CustomerTableHeadTitle>
            <CustomerTableHeadTitle>Orders</CustomerTableHeadTitle>
            <CustomerTableHeadTitle>City</CustomerTableHeadTitle>
          </CustomerTableRow>
        </CustomerTableHeader>

        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No customers found
              </td>
            </tr>
          ) : (
            filteredCustomers.map((customer, index) => (
              <CustomerTableRow
                key={customer._id || index}
                onClick={() =>
                  window.open(
                    `/customers/view?name=${customer.customerName}&phone=${customer.phoneNumber} `,
                    "_blank",
                  )
                }
              >
                <CustomerTableDataCell>{index + 1}</CustomerTableDataCell>
                <CustomerTableDataCell>
                  {customer.customerName}
                </CustomerTableDataCell>
                <CustomerTableDataCell>
                  {customer.email || "n/a"}
                </CustomerTableDataCell>
                <CustomerTableDataCell>
                  {customer.phoneNumber}
                </CustomerTableDataCell>
                <CustomerTableDataCell>
                  {customer.pendingAmount || 0}
                </CustomerTableDataCell>
                <CustomerTableDataCell>
                  {customer.orders?.length || 0}
                </CustomerTableDataCell>
                <CustomerTableDataCell>
                  {customer.city || "n/a"}
                </CustomerTableDataCell>
              </CustomerTableRow>
            ))
          )}
        </tbody>
      </CustomersTable>
    </CustomersContainer>
  );
};

export default Customers;

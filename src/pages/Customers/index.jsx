import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Popup from "reactjs-popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddCustomerForm from "../../components/AddCustomerForm"; // adjust path
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

  const fetchCustomers = async () => {
    try {
      const token = Cookies.get("saFruitsToken");
      const response = await axios.get(
        "https://backend-zmoa.onrender.com/customers/",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data && Array.isArray(response.data)) {
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

          {/* Popup for adding customer */}
          <Popup
            trigger={
              <button style={{ padding: "5px 10px" }}>Add Customer</button>
            }
            modal
            nested
            closeOnDocumentClick={true} // closes when clicking outside
            closeOnEscape={true} // closes when pressing ESC
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
        <CustomerTableHeader>
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
              <CustomerTableRow key={index}>
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

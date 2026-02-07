import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerDetailView = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const customerName = query.get("name");
  const phoneNumberQuery = query.get("phone"); // optional, from query

  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("saFruitsToken");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        let res;
        if (phoneNumberQuery) {
          // fetch by phone if query param exists
          res = await axios.get(
            `https://backend-zmoa.onrender.com/customers/phone/${phoneNumberQuery}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
        } else if (customerName) {
          // fetch by name if phone not provided
          res = await axios.get(
            `https://backend-zmoa.onrender.com/customers/name/${customerName}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
        } else {
          toast.error("No customer identifier provided");
          setLoading(false);
          return;
        }

        setCustomerDetails(res.data);
      } catch (err) {
        toast.error("Customer not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerName, phoneNumberQuery, token]);

  if (loading)
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <ToastContainer />
        <p>Loading customer...</p>
      </div>
    );

  if (!customerDetails)
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <ToastContainer />
        <p>Customer not found</p>
      </div>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <ToastContainer />
      <h2>Customer Name: {customerDetails.customerName}</h2>
      <p>Phone Number: {customerDetails.phoneNumber || "N/A"}</p>
      {customerDetails.city && <p>City: {customerDetails.city}</p>}
      {customerDetails.pendingAmount !== undefined && (
        <p>Pending Amount: {customerDetails.pendingAmount}</p>
      )}
    </div>
  );
};

export default CustomerDetailView;

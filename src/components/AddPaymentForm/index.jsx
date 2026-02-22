import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import {
  Container,
  Card,
  Title,
  Form,
  Input,
  Button,
  Message,
  CustomerBox,
  PopupOverlay,
  PopupCard,
  PopupButtons,
  ReceiptContainer,
  Loader,
} from "./styledComponents";

const Index = () => {
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [customerId, setCustomerId] = useState("");

  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("saFruitsToken");

  // 🔍 Search Customer
  const handleCustomerSearch = async (value) => {
    setCustomerNumber(value);
    setCustomerData(null);
    setMessage("");
    setError("");

    if (value.length === 10) {
      try {
        const res = await axios.get(
          `https://backend-zmoa.onrender.com/customers/phone/${value}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setCustomerData(res.data);
        setCustomerId(res.data._id);
      } catch (err) {
        setError("Customer not found");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(amount) > customerData.pendingAmount) {
      toast.error("Amount cannot be greater than pending amount");
      return;
    }

    setPaymentDetails({
      name: customerData.customerName,
      phone: customerNumber,
      pendingAmount: customerData.pendingAmount,
      payAmount: amount,
      paymentMode,
      date: new Date(),
    });

    setShowPopup(true);
  };

  const confirmPayment = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://backend-zmoa.onrender.com/payments/create",
        {
          customerId,
          amount: Number(amount),
          paymentMode,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setMessage(
        `Payment successful! Remaining Pending: ₹${res.data.pendingAmount}`,
      );

      setShowPopup(false);
      setAmount("");
      setPaymentMode("");

      handleCustomerSearch(customerNumber);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <Card>
        <Title>Create Payment</Title>

        <Input
          type="text"
          placeholder="Enter Customer Number"
          value={customerNumber}
          maxLength={10}
          onChange={(e) => handleCustomerSearch(e.target.value)}
        />

        {customerData && (
          <CustomerBox>
            <p>
              <strong>Name:</strong> {customerData.customerName}
            </p>
            <p>
              <strong>Pending:</strong> ₹{customerData.pendingAmount}
            </p>
          </CustomerBox>
        )}

        {customerData && customerData.pendingAmount === 0 && (
          <Message success>No amount to be paid</Message>
        )}

        {customerData && customerData.pendingAmount > 0 && (
          <Form onSubmit={handleSubmit}>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Payment Mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Submit Payment"}
            </Button>
          </Form>
        )}

        {message && <Message success>{message}</Message>}
        {error && <Message>{error}</Message>}
      </Card>

      {/* 🔔 Confirmation Popup */}
      {showPopup && (
        <PopupOverlay>
          <PopupCard>
            <h3>Confirm Payment</h3>

            <p>
              <strong>Name:</strong> {paymentDetails.name}
            </p>
            <p>
              <strong>Phone:</strong> {paymentDetails.phone}
            </p>
            <p>
              <strong>Amount:</strong> ₹{paymentDetails.payAmount}
            </p>
            <p>
              <strong>Mode:</strong> {paymentDetails.paymentMode}
            </p>
            <p>
              <strong>Date:</strong> {paymentDetails.date.toLocaleString()}
            </p>

            <PopupButtons>
              <Button onClick={confirmPayment} disabled={loading}>
                {loading ? <Loader /> : "Confirm"}
              </Button>
              <Button
                type="button"
                style={{ background: "gray" }}
                onClick={() => setShowPopup(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                style={{ background: "green" }}
                onClick={handlePrint}
              >
                Print
              </Button>
            </PopupButtons>

            {/* 🧾 Printable Receipt */}
            <ReceiptContainer>
              <h2>Payment Receipt</h2>
              <hr />
              <p>Name: {paymentDetails.name}</p>
              <p>Phone: {paymentDetails.phone}</p>
              <p>Amount Paid: ₹{paymentDetails.payAmount}</p>
              <p>Payment Mode: {paymentDetails.paymentMode}</p>
              <p>Date: {paymentDetails.date.toLocaleString()}</p>
              <hr />
              <p>Thank You 🙏</p>
            </ReceiptContainer>
          </PopupCard>
        </PopupOverlay>
      )}
    </Container>
  );
};

export default Index;

import React, { forwardRef } from "react";

const Invoice = forwardRef(({ order }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        padding: 20,
        fontFamily: "Arial",
        fontSize: 14,
        color: "#000",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 10 }}>
        SA Fruits Invoice
      </h2>

      <p>
        <strong>Customer:</strong> {order.customerName}
      </p>
      <p>
        <strong>Phone:</strong> {order.customerNumber}
      </p>
      <p>
        <strong>City:</strong> {order.city}
      </p>
      <p>
        <strong>Date:</strong> {new Date().toLocaleDateString()}
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            {["Product", "Qty", "CP", "SP", "Amount"].map((h) => (
              <th
                key={h}
                style={{
                  border: "1px solid #000",
                  padding: 8,
                  textAlign: "left",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {p.productName}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {p.quantity}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {p.priceAtShipment}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {p.soldPrice}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {(p.quantity * p.soldPrice).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: 20 }}>
        Total Amount: ₹ {order.totalAmount.toFixed(2)}
      </h3>
    </div>
  );
});

export default Invoice;

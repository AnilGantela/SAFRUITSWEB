import React from "react";

const ShipmentDetailView = ({ shipment }) => {
  if (!shipment) {
    return <div>No shipment data available</div>;
  }

  const {
    orderDate,
    customerName,
    totalAmount,
    city,
    orderProducts = [],
  } = shipment;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Shipment Details</h2>
      <p>
        <strong>Date:</strong> {new Date(orderDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Customer:</strong> {customerName}
      </p>
      <p>
        <strong>Total Amount:</strong> {totalAmount}
      </p>
      <p>
        <strong>City:</strong> {city}
      </p>

      <h3>Products</h3>
      {orderProducts.length > 0 ? (
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
                Price
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Shipment
              </th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map((product, index) => (
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
                  {product.priceAtShipment}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {product.shipmentId ? (
                    <a
                      href={`/shipments/${product.shipmentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      clickme
                    </a>
                  ) : (
                    "N/A"
                  )}
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

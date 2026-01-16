import React from "react";

const ShipmentDetailView = ({ shipment }) => {
  if (!shipment) {
    return <div>No shipment data available</div>;
  }

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
        <strong>Date:</strong> {new Date(shipmentDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Transport Company:</strong> {transportCompany}
      </p>
      <p>
        <strong>Vehicle Number:</strong> {vehicleNumber}
      </p>
      <p>
        <strong>City:</strong> {city}
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

// InvoicePage.jsx
import React, { useState } from "react";
import {
  PageContainer,
  EditorContainer,
  FormSection,
  PreviewSection,
  InvoicePreview,
  Table,
  Th,
  Td,
  Button,
  Input,
  PrintHeader,
  HeaderImageContainer,
  HeaderTitleContainer,
  HeaderTitle,
} from "./styledComponents";

const InvoicePage = () => {
  const logo = "/print-logo.png"; // static logo path

  const [invoiceNo, setInvoiceNo] = useState("");
  const [billTo, setBillTo] = useState("");
  const [products, setProducts] = useState([
    { description: "", quantity: "", rate: "" },
  ]);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addRow = () =>
    setProducts([...products, { description: "", quantity: "", rate: "" }]);
  const removeRow = (index) =>
    setProducts(products.filter((_, i) => i !== index));

  const totalAmount = products.reduce(
    (sum, p) => sum + (Number(p.quantity) * Number(p.rate) || 0),
    0,
  );

  // Print function
  const handlePrint = () => window.print();

  return (
    <PageContainer>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #invoice-preview, #invoice-preview * {
              visibility: visible;
            }
            #invoice-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
          }
        `}
      </style>

      <EditorContainer>
        {/* LEFT FORM - HIDDEN ON PRINT */}
        <FormSection>
          <h2>Invoice Editor</h2>

          <label>Invoice No</label>
          <Input
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />

          <label>Bill To</label>
          <Input value={billTo} onChange={(e) => setBillTo(e.target.value)} />

          <h3>Products</h3>
          {products.map((p, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Input
                placeholder="Description"
                value={p.description}
                onChange={(e) =>
                  handleProductChange(index, "description", e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Qty"
                value={p.quantity}
                onChange={(e) =>
                  handleProductChange(index, "quantity", e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Rate"
                value={p.rate}
                onChange={(e) =>
                  handleProductChange(index, "rate", e.target.value)
                }
              />
              <Button type="button" onClick={() => removeRow(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addRow}>Add Product</Button>

          <Button
            onClick={handlePrint}
            style={{ marginTop: "20px" }}
            disabled={!logoLoaded || products.length === 0}
          >
            Print Invoice
          </Button>
        </FormSection>

        {/* RIGHT PREVIEW */}
        <PreviewSection>
          <InvoicePreview id="invoice-preview">
            <PrintHeader>
              <HeaderImageContainer>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ maxHeight: 60 }}
                  onLoad={() => setLogoLoaded(true)}
                />
              </HeaderImageContainer>
              <HeaderTitleContainer>
                <HeaderTitle>SA FRUITS</HeaderTitle>
              </HeaderTitleContainer>
            </PrintHeader>

            <div style={{ marginTop: 20 }}>
              <p>
                <strong>Invoice No:</strong> {invoiceNo || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <p>
              <strong>Bill To:</strong> {billTo || "N/A"}
            </p>

            <Table>
              <thead>
                <tr>
                  <Th>S.No</Th>
                  <Th>Description</Th>
                  <Th>Qty</Th>
                  <Th>Rate</Th>
                  <Th>Amount</Th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{p.description}</Td>
                    <Td>{p.quantity}</Td>
                    <Td>{p.rate}</Td>
                    <Td>{p.quantity * p.rate || 0}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h3 style={{ textAlign: "right", marginTop: "20px" }}>
              Grand Total: ₹{totalAmount}
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 60,
              }}
            >
              <div>
                <p>Receiver Signature</p>
                <div style={{ borderTop: "1px solid black", width: 200 }}></div>
              </div>
              <div>
                <p>Vendor Signature</p>
                <div style={{ borderTop: "1px solid black", width: 200 }}></div>
              </div>
            </div>
          </InvoicePreview>
        </PreviewSection>
      </EditorContainer>
    </PageContainer>
  );
};

export default InvoicePage;

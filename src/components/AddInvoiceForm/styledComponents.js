import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 20px;
`;

export const EditorContainer = styled.div`
  display: flex;
  gap: 30px;
`;

export const FormSection = styled.div`
  width: 35%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

export const PreviewSection = styled.div`
  width: 65%;
`;
export const InvoicePreview = styled.div`
  width: 794px;
  min-height: 1123px;
  background: white;
  padding: 40px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  border: 1px solid black;
  padding: 8px;
  background: #f2f2f2;
`;

export const Td = styled.td`
  border: 1px solid black;
  padding: 8px;
  text-align: center;
`;

export const Button = styled.button`
  padding: 8px 12px;
  margin-top: 10px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
`;

export const PrintHeader = styled.div`
  border: 2px solid black;
  height: 90px;
  display: flex;
  width: 85%;
`;

export const HeaderTitleContainer = styled.div`
  width: 75%;
  background-color: #4472c4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderImageContainer = styled.div`
  width: 25%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  font-size: 50px;
  text-align: center;
  color: #fff;
  font-family: Roboto;
`;

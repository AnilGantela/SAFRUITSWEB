import styled from "styled-components";

export const CustomerPage = styled.div`
  padding: 10px;
  display: flex;
  height: 100vh;
  gap: 20px;
  background: #f7f7f7;
`;

export const CustomerInfoContainer = styled.div`
  width: 320px;
  border: 2px solid #e5383b;
  margin-left: -10px;
  padding-top: 20px;
`;

export const CustomerInfoBox = styled.div`
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #fff;
  background: linear-gradient(135deg, #9c0101 0%, #e5383b 100%);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
`;

export const CustomerInfoItem = styled.div`
  font-size: 14px;
  display: flex;
  gap: 10px;
  align-items: center;

  h2 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

export const CustomerDataContainer = styled.div`
  flex: 1;
  border: 2px solid #e5383b;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TablesContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  flex-wrap: wrap;
`;

export const ChartsContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  flex-wrap: wrap;
  border: 2px solid #e5383b;
`;

export const ChartCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 20px;
  width: 350px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
  }
  &:hover {
    transform: translateY(-5px);
  }
`;

export const TableContainer = styled.div`
  flex: 1;
  min-width: 400px;
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
`;

export const TableContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
  }

  input {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 13px;

    &:focus {
      border-color: #9c0101;
      outline: none;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  text-align: center;

  th {
    background: #9c0101;
    color: #fff;
    padding: 8px;
  }

  td {
    padding: 8px;
    border-bottom: 1px solid #eee;
  }

  tbody tr {
    cursor: pointer;
    transition: background 0.2s ease;
  }

  tbody tr:hover {
    background: #f9eaea;
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  font-size: 13px;
`;

export const PaginationButton = styled.button`
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #9c0101;
  background: white;
  color: #9c0101;
  cursor: pointer;
  font-size: 12px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #9c0101;
    color: #fff;
  }
`;

export const SummaryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

export const SummaryCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;

  h3 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }

  p {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    color: #9c0101;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #9c0101;
    color: white;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
  }

  th {
    font-weight: 600;
  }

  tbody tr {
    border-bottom: 1px solid #eee;
  }

  tbody tr:hover {
    background: #f5f5f5;
  }
`;

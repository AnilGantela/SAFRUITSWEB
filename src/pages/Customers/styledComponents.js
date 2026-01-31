import styled from "styled-components";

export const CustomersContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const CustomersHeader = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

export const CustomersMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 20px;
  gap: 20px;
`;

export const CustomersTable = styled.table`
  width: 97%;
  border-collapse: collapse;
  margin-top: 10px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const CustomerTableHeader = styled.thead`
  background-color: #4caf50;
  color: white;
`;

export const CustomerTableRow = styled.tr`
  border: 2px solid black;

  &:hover {
    background-color: #81c784;
    color: white;
  }
`;

export const CustomerTableHeadTitle = styled.th`
  padding: 6px;
  border: 1px solid white;
`;

export const CustomerTableDataCell = styled.td`
  border-left: 1px solid black;
  padding: 5px;
`;

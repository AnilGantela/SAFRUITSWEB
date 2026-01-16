import styled from "styled-components";

export const ShipmentsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ShipmentsContainerHeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 30px;
`;

export const ShipmentsContainerMenuContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px;
  gap: 20px;
  padding-left: 20px;
`;

export const ShipmentsContainerContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShipmentsTable = styled.table`
  width: 97%;
  border-collapse: collapse;
  margin-top: 10px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ShipmentTableHeader = styled.thead`
  background-color: ${({ $bColor }) => $bColor};
  color: white;
`;

export const ShipmentTableRow = styled.tr`
  border: 2px solid black;
  &:hover {
    background-color: ${({ $bColor }) => $bColor};
    color: white;
  }
`;

export const ShipmentTableHeadTitle = styled.th`
  padding: 6px;
  border: 1px solid white;
`;

export const ShipmentTableDataCell = styled.td`
  border-left: 1px solid black;
  padding: 5px;
`;

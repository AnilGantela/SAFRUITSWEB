import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Popup from "reactjs-popup";
import AddShipmentForm from "../../components/AddShipmentForm";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  subYears,
} from "date-fns";
import * as XLSX from "xlsx";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ShipmentsContainer,
  ShipmentsContainerContentContainer,
  ShipmentsContainerHeaderContainer,
  ShipmentsContainerMenuContainer,
  ShipmentsTable,
  ShipmentTableDataCell,
  ShipmentTableHeader,
  ShipmentTableHeadTitle,
  ShipmentTableRow,
} from "./styledComponents";
import ShipmentDetailView from "../../components/ShipmentDetailView";

const Shipments = () => {
  const { state } = useAppContext();

  const [allShipments, setAllShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dateFilter, setDateFilter] = useState("all");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(filteredShipments.length / limit);

  // Fetch shipments from API
  const fetchShipments = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("saFruitsToken");
      const response = await axios.get(
        "https://backend-zmoa.onrender.com/shipments/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);

      if (response.data && Array.isArray(response.data)) {
        // Convert shipmentDate to Date object
        const shipmentsWithDate = response.data.map((ship) => ({
          ...ship,
          date: new Date(ship.shipmentDate),
        }));
        setAllShipments(shipmentsWithDate);
      }
    } catch (error) {
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchShipments();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = allShipments;

    // City filter
    if (state.city && state.city !== "none") {
      filtered = filtered.filter(
        (ship) => ship.city?.toLowerCase() === state.city.toLowerCase()
      );
    }

    // Date filter
    const today = new Date();
    switch (dateFilter) {
      case "today":
        filtered = filtered.filter(
          (ship) => ship.date.toDateString() === today.toDateString()
        );
        break;
      case "lastWeek":
        const weekStart = startOfWeek(today);
        const weekEnd = endOfWeek(today);
        filtered = filtered.filter(
          (ship) => ship.date >= weekStart && ship.date <= weekEnd
        );
        break;
      case "fullMonth":
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        filtered = filtered.filter(
          (ship) => ship.date >= monthStart && ship.date <= monthEnd
        );
        break;
      case "pastSixMonths":
        filtered = filtered.filter((ship) => ship.date >= subMonths(today, 6));
        break;
      case "pastYear":
        filtered = filtered.filter((ship) => ship.date >= subYears(today, 1));
        break;
      case "custom":
        if (customRange.from && customRange.to) {
          const fromDate = new Date(customRange.from);
          const toDate = new Date(customRange.to);
          filtered = filtered.filter(
            (ship) => ship.date >= fromDate && ship.date <= toDate
          );
        }
        break;
      default:
        break;
    }

    setFilteredShipments(filtered);
    setPage(1);
  }, [state.city, allShipments, dateFilter, customRange]);

  const currentShipments = filteredShipments.slice(
    (page - 1) * limit,
    page * limit
  );

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // Export current page to Excel
  const exportToExcel = () => {
    const wsData = currentShipments.map((ship) => ({
      "Shipment ID": ship._id,
      City: ship.city,
      Customer: ship.customerName,
      Quantity: ship.quantity,
      Date: format(ship.date, "yyyy-MM-dd"),
      "Orders Count": ship.orders?.length || 0,
      "Products Count": ship.products?.length || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Shipments");
    XLSX.writeFile(workbook, "shipments.xlsx");
  };

  return (
    <ShipmentsContainer>
      <ShipmentsContainerHeaderContainer>
        <h1>Shipments : {state.city !== "none" ? state.city : ""}</h1>
      </ShipmentsContainerHeaderContainer>
      <ShipmentsContainerMenuContainer>
        <label>
          Items per page:&nbsp;
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date Filter:&nbsp;
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="lastWeek">Last Week</option>
            <option value="fullMonth">This Month</option>
            <option value="pastSixMonths">Past 6 Months</option>
            <option value="pastYear">Past Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </label>
        {dateFilter === "custom" && (
          <div>
            <input
              type="date"
              value={customRange.from}
              onChange={(e) =>
                setCustomRange((prev) => ({ ...prev, from: e.target.value }))
              }
            />
            &nbsp;to&nbsp;
            <input
              type="date"
              value={customRange.to}
              onChange={(e) =>
                setCustomRange((prev) => ({ ...prev, to: e.target.value }))
              }
            />
          </div>
        )}
        <button onClick={exportToExcel} style={{ padding: "5px 10px" }}>
          Download Excel
        </button>
        <Popup
          trigger={
            <button style={{ padding: "5px 10px" }}>Add Shipment</button>
          }
          modal
          nested
          contentStyle={{
            background: "transparent",
            border: "none",
            margin: "0px",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {(close) => (
            <AddShipmentForm onClose={close} onShipmentAdded={fetchShipments} />
          )}
        </Popup>
      </ShipmentsContainerMenuContainer>

      <ShipmentsContainerContentContainer>
        <ShipmentsTable>
          <ShipmentTableHeader $bColor={state.colors.primary}>
            <ShipmentTableRow>
              <ShipmentTableHeadTitle>S.No</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>City</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Vel. No.</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Date</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Products</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>T.Q.</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>T.A.</ShipmentTableHeadTitle>
              <ShipmentTableHeadTitle>Orders</ShipmentTableHeadTitle>
            </ShipmentTableRow>
          </ShipmentTableHeader>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  Loading...
                </td>
              </tr>
            ) : currentShipments.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No shipments found.
                </td>
              </tr>
            ) : (
              currentShipments.map((ship, index) => (
                <Popup
                  key={ship._id}
                  trigger={
                    <ShipmentTableRow
                      $bColor={state.colors.secondary}
                      style={{ cursor: "pointer" }}
                    >
                      <ShipmentTableDataCell>{index + 1}</ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {ship.city || "none"}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {ship.vehicleNumber}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {format(ship.date, "dd-MM-yyyy")}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {ship.products?.length || 0}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {ship.products.reduce(
                          (total, product) => total + product.quantity,
                          0
                        )}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {ship.products.reduce(
                          (total, product) =>
                            total + product.quantity * product.priceAtShipment,
                          0
                        )}
                      </ShipmentTableDataCell>
                      <ShipmentTableDataCell>
                        {" "}
                        {ship.orders?.length || 0}
                      </ShipmentTableDataCell>
                    </ShipmentTableRow>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <ShipmentDetailView onClose={close} shipment={ship} />
                  )}
                </Popup>
              ))
            )}
          </tbody>
        </ShipmentsTable>
      </ShipmentsContainerContentContainer>

      {/* Pagination */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          width: "95%",
          marginInline: "auto",
          justifyContent: "flex-end",
        }}
      >
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </ShipmentsContainer>
  );
};

export default Shipments;

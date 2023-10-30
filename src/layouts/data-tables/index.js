import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiSelect from "components/VuiSelect"; // Import the Select component
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "layouts/data-tables/data/dataTableData";
import NewSale from "layouts/data-tables/components/Sale";
import { supabase } from "supabaseClient.js";
import { useAuth } from "hooks/Auth";

function TablesLayout() {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataUpdated, setDataUpdates] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isFilterDisabled, setIsFilterDisabled] = useState(true); // Initialize as disabled

  const { user } = useAuth();
  const userId = user?.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(async () => {
    setOpen(false);
    setDataUpdates(true);
  }, []);

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          <style>
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
          <div class="card-print">${document.querySelector(".card-print").innerHTML}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const getSales = useCallback(async () => {
    const query = selectedMonth
      ? supabase.from("sales").select().eq("user_id", userId).eq("date", selectedMonth)
      : supabase.from("sales").select().eq("user_id", userId);
  
    const { data } = await query;
  
    // Don't change the original dates, only format for display
    const formattedData = data.map((sale) => ({
      ...sale,
      dateFormatted: new Date(sale.date).toLocaleDateString("en-US")
    }));
  
    setSales(formattedData || []);
  }, [userId, selectedMonth]);
  
  useEffect(() => {
    getSales();
    setDataUpdates(false);
  }, [dataUpdated, getSales]);
  

  const handleFilterByMonth = () => {
    setIsFilterDisabled(true);
    getSales();
  };

  // Function to handle month selection
  const handleMonthSelect = (event) => {
    setSelectedMonth(event.target.value);
    setIsFilterDisabled(false); // Enable the filter button
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox pt={6} pb={3}>
        <VuiBox mb={3} position="relative">
          <Card className="card-print">
            <VuiBox p={3} pl={0} lineHeight={1}>
              <VuiTypography variant="h5" fontWeight="medium" color="white">
                Vehicle Sales
              </VuiTypography>
              <VuiTypography variant="button" fontWeight="regular" color="text">
                Every Car Sale is Listed Here
              </VuiTypography>
            </VuiBox>
            <VuiBox position="absolute" top={0} right={0} m={3}>
              <div style={{ marginBottom: "10px", display: "flex", flexDirection: "row" }}>
                <VuiButton
                  variant="contained"
                  color="primary"
                  onClick={handleFilterByMonth}
                  disabled={isFilterDisabled}
                >
                  Filter by Month
                </VuiButton>
                <VuiButton variant="contained" color="primary" onClick={handleClickOpen} style={{ marginLeft: "10px" }}>
                  Add Sale
                </VuiButton>
                <VuiButton variant="contained" color="primary" onClick={handlePrint} style={{ marginLeft: "10px" }}>
                  Print
                </VuiButton>
              </div>
              <div style={{ marginBottom: "10px" }}>
                {/* Select component for month selection */}
                <VuiSelect
                  label="Select Month"
                  value={selectedMonth}
                  onChange={handleMonthSelect}
                  sx={{ minWidth: "150px" }}
                >
                  <option value="">Select Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </VuiSelect>
              </div>
            </VuiBox>
            <NewSale open={open} handleClose={handleClose} setDataUpdates={setDataUpdates} />
            <DataTable
              table={{ columns: dataTableData.columns, rows: [...dataTableData["rows"], ...sales] }}
              canSearch
              setDataUpdates={setDataUpdates}
            />
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TablesLayout;



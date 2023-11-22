import React, { useState, useCallback, useRef } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import EventForm from "layouts/data-tables/components/Sale/EventForm"; // Import your EventForm component
import CloseIcon from "@mui/icons-material/Close"; // Import the CloseIcon from MUI
import Icon from "@mui/material/Icon";
import dayjs from "dayjs";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

function NewSale(props) {
  const { open, handleClose, edit, data, view } = props;

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <Grid container className="tables_dialog">
        <Grid item xs={12}>
          {/* Close button */}
          <div
            style={{
              position: "absolute",
              top: "10px", // Adjust as needed
              right: "10px", // Adjust as needed
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </div>
          {view && (
            <PrintIcon
              style={{ color: "#fff", marginLeft: "10px", marginTop: "10px", cursor: "pointer" }}
              fontSize="large"
              onClick={handlePrint}
            />
          )}
          <VuiBox p={2} ref={componentRef}>
            <VuiBox>
              {/* Render only the EventForm */}
              <EventForm
                onClose={handleClose}
                handleClose={handleClose}
                edit={edit}
                view={view}
                data={data}
              />
            </VuiBox>
          </VuiBox>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default NewSale;

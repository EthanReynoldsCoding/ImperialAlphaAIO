//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\components\Invoices\Components\stubpageview

import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import StubPage from "./stubpage.js";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";

function StubPageView(props) {
  const { open, handleClose, edit, data, setDataUpdated, onClickPDF, selectedPaystub } = props;

  
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <Grid container className="tables_dialog">
        <Grid item xs={12}>
          <Card 
            sx={{
              position: "relative", // Needed for absolute positioning
              backgroundColor: "rgba(16, 13, 34, 0.1)", // Transparent background color
              maxHeight: "100%", // Set "auto" to enable scrolling
            }}
          >
            {/* Close button */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                zIndex: 1,
                color: "#fff",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
            <VuiBox p={-3}> {/* Adjust padding here */}
              <VuiBox>
              <StubPage
                selectedPaystub={props.selectedPaystub} // Pass the selectedPaystub
                handleClose={handleClose}
                edit={edit}
                data={data}
                setDataUpdated={setDataUpdated}
/>
              </VuiBox>
            </VuiBox>
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default StubPageView;

//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\components\Invoices\Components\Event\index.js

import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import PaystubForm from "./PaystubForm/paystubform"; // Import your EventForm component

import CloseIcon from "@mui/icons-material/Close"; // Import the CloseIcon from MUI
import Dialog from "@mui/material/Dialog";

function NewPaystub(props) {
  const { open, handleClose, edit, data, setDataUpdated } = props;

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <Grid container className="tables_dialog">
        <Grid item xs={12}>
          <Card
            sx={{
              position: "relative", // Needed for absolute positioning
              overflow: "visible",
              
            }}
          >
            {/* Close button */}
            <div
              style={{
                position: "absolute",
                top: "10px", // Adjust as needed
                right: "10px", // Adjust as needed
                cursor: "pointer",
                zIndex: 1,
                color: "#fff",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
            <VuiBox p={2}>
              <VuiBox>
                {/* Render only the PaystubForm */}
                <PaystubForm
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

export default NewPaystub;

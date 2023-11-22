import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close"; // Import the CloseIcon from MUI

const ViewTable = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

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
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ViewTable;

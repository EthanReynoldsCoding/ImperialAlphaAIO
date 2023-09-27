import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";

import PresaleForm from "widgets/presold/PresaleForm";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function EditSection(props) {
  const { presale, setDataUpdated } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="edit" size="small" color="success" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      {open && (
        <PresaleForm
          open={open}
          onClose={handleClose}
          edit={true}
          presale={presale}
          setDataUpdated={setDataUpdated}
        />
      )}
    </div>
  );
}

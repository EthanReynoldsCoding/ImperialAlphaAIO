import { useCallback, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import DeletionForm from "components/DeletionForm";

import PresaleForm from "widgets/presold/PresaleForm";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import { supabase } from "supabaseClient";

export default function DeleteSection(props) {
  const { id, setDataUpdated } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePresale = useCallback(async () => {
    const { error } = await supabase.from("presales").delete().eq("id", id);

    if (error) {
      console.error(error);
    } else {
      setOpen(false);
      setDataUpdated(true);
    }
  }, [id, setDataUpdated]);

  return (
    <div>
      <IconButton aria-label="delete" size="small" color="error" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      {open && <DeletionForm open={open} handleClose={handleClose} deletion={deletePresale} />}
    </div>
  );
}

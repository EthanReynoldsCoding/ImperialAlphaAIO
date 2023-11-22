import DeletionForm from "components/DeletionForm";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState, useCallback } from "react";
import { supabase } from "supabaseClient";

const Deletion = ({ id, setDataUpdated }) => {
  const [openDeletion, setOpenDeletion] = useState(false);

  const handleOpenDeletion = () => {
    setOpenDeletion(true);
  };

  const handleClose = () => {
    setOpenDeletion(false);
  };

  const deleteLead = useCallback(
    async (id) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);

      if (error) {
        console.log(error);
      } else {
        setOpenDeletion(false);
        setDataUpdated(true);
      }
    },
    [setDataUpdated]
  );

  return (
    <>
      <IconButton aria-label="delete" size="small" color="error" onClick={handleOpenDeletion}>
        <DeleteIcon />
      </IconButton>
      <DeletionForm open={openDeletion} handleClose={handleClose} deletion={() => deleteLead(id)} />
    </>
  );
};

export default Deletion;

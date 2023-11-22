import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditForm from "layouts/dashboard/daily/components/Projects/EditForm";
import { useState } from "react";

const Editation = ({ lead, setDataUpdated }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <IconButton aria-label="edit" size="small" color="success" onClick={handleOpenEdit}>
        <EditIcon />
      </IconButton>
      <EditForm
        open={openEdit}
        onClose={handleCloseEdit}
        handleCloseEdit={handleCloseEdit}
        setDataUpdated={setDataUpdated}
        data={lead.customers}
        id={lead.id}
      />
    </>
  );
};

export default Editation;

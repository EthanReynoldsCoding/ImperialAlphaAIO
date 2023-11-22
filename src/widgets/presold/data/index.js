import React, { useCallback, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import DeletionForm from "components/DeletionForm";
import EditForm from "layouts/dashboard/daily/components/Projects/EditForm";

import EditSection from "widgets/presold/EditSection";
import DeleteSection from "widgets/presold/DeleteSection";

import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

export default function Data(dataUpdated, setDataUpdated) {
  // Destructure props correctly
  const [presales, setPresales] = useState([]);
  const [openDeletion, setOpenDeletion] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;

  const getPresales = useCallback(async () => {
    const { data, error } = await supabase.from("presales").select().eq("user_id", userId);

    if (error) {
      console.error(error);
    } else {
      setPresales(data);
    }
  }, [userId]);

  const handleOpenDeletion = () => {
    setOpenDeletion(true);
  };

  const handleClose = () => {
    setOpenDeletion(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    getPresales();
    setDataUpdated(false);
  }, [getPresales, dataUpdated]);

  return {
    // Replace curly braces with parentheses for returning JSX
    columns: [
      { name: "customer", align: "left" },
      { name: "vehicles", align: "left" },
      { name: "notes", align: "center" },
      { name: "date", align: "center" },
      { name: "edit", align: "center" },
      { name: "delete", align: "center" },
    ],

    rows: presales.map((presale, idx) => {
      return {
        customer: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography color="white" variant="button" fontWeight="medium">
              {presale.customer}
            </VuiTypography>
          </VuiBox>
        ),
        vehicles: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography color="white" variant="button" fontWeight="medium">
              {presale.vehicle}
            </VuiTypography>
          </VuiBox>
        ),
        notes: (
          <VuiTypography variant="body2" color="white">
            {presale.notes}
          </VuiTypography>
        ),
        date: (
          <VuiTypography variant="body2" color="white">
            {presale.date}
          </VuiTypography>
        ),
        edit: (
          <>
            {/* <IconButton aria-label="edit" size="small" color="success" onClick={handleOpenEdit}>
              <EditIcon />
            </IconButton> */}
            <EditSection presale={presale} setDataUpdated={setDataUpdated} />
          </>
        ),
        delete: (
          <>
            <DeleteSection id={presale.id} setDataUpdated={setDataUpdated} />
          </>
        ),
      };
    }),
    presales,
  };
}

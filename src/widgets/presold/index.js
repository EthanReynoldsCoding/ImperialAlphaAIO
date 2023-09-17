import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import { BsCheckCircleFill } from "react-icons/bs";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import Table from "examples/Tables/Table";
import PresaleForm from "widgets/presold"; // Corrected backslash to forward slash
import Data from "widgets/presold/data/index.js";

function Presale() {
  const [editedRows, setEditedRows] = useState([]);
  const [currentEditRow, setCurrentEditRow] = useState(null);
  let count = 0;
  const [activePresales, setActivePresales] = useState([]);

  const [dataUpdated, setDataUpdated] = useState(false);
  const { columns, rows, presale } = Data(dataUpdated, setDataUpdated);

  const [open, setOpen] = useState(false);

  const openPresaleForm = () => {
    setOpen(true);
  };

  const closePresaleForm = () => {
    setOpen(false);
  };

  function handleEditRow(row) {
    setCurrentEditRow(row);
  }

  function handleSaveRow(row) {
    setEditedRows((prevRows) => {
      const updatedRows = [...prevRows];
      const index = updatedRows.findIndex((r) => r === row);

      if (index !== -1) {
        updatedRows.splice(index, 1, row);
      } else {
        updatedRows.push(row);
      }

      return updatedRows;
    });

    setCurrentEditRow(null);
  }

  const today = new Date();
  const crntMonth = today.getMonth();
  const crntYear = today.getFullYear();

  const calc = (data) => {
    if (data?.length > 0) {
      const filteredArr = presale.filter((d) => {
        const presaleMonth = new Date(d.created_at).getMonth();
        const presaleYear = new Date(d.created_at).getFullYear();

        return presaleMonth === crntMonth && presaleYear === crntYear;
      });

      setActivePresales(filteredArr);
    }
  };

  useEffect(() => {
    if (presale?.length > 0) { // Corrected from `presales` to `presale`
      calc(presale); // Corrected from `presales` to `presale`
    }
  }, [presale]); // Corrected from `presales` to `presale`

  return (
    <Card
      sx={{
        height: "auto",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            New Presales
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>{activePresales.length} done</strong> this month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
          <VuiButton color="primary" onClick={openPresaleForm}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          </VuiButton>
        </VuiBox>
      </VuiBox>
      <VuiBox
        sx={{
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}
      >
        <Table
          columns={columns}
          rows={rows}
          editedRows={editedRows}
          currentEditRow={currentEditRow}
          onEditRow={handleEditRow}
          onSaveRow={handleSaveRow}
        />
      </VuiBox>
      {open && <PresaleForm open={open} onClose={closePresaleForm} setDataUpdated={setDataUpdated} />}
    </Card>
  );
}

export default Presale;

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
import PresaleForm from "widgets/presold/PresaleForm"; // Corrected backslash to forward slash
import Data from "widgets/presold/data";

function Presale() {
  const [activePresales, setActivePresales] = useState([]);

  const [dataUpdated, setDataUpdated] = useState(false);
  const { columns, rows, presales } = Data(dataUpdated, setDataUpdated);

  const [open, setOpen] = useState(false);

  const openPresaleForm = () => {
    setOpen(true);
  };

  const closePresaleForm = () => {
    setOpen(false);
  };

  const today = new Date();
  const crntMonth = today.getMonth();
  const crntYear = today.getFullYear();

  const calc = (data) => {
    if (data?.length > 0) {
      const filteredArr = presales.filter((d) => {
        const presaleMonth = new Date(d.date).getMonth();
        const presaleYear = new Date(d.date).getFullYear();

        return presaleMonth === crntMonth && presaleYear === crntYear;
      });

      setActivePresales(filteredArr);
    }
  };

  useEffect(() => {
    if (presales?.length > 0) {
      // Corrected from `presales` to `presale`
      calc(presales); // Corrected from `presales` to `presale`
    }
  }, [presales]); // Corrected from `presales` to `presale`

  console.log(presales, activePresales);

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
        <Table columns={columns} rows={rows} />
      </VuiBox>
      {open && (
        <PresaleForm open={open} onClose={closePresaleForm} setDataUpdated={setDataUpdated} />
      )}
    </Card>
  );
}

export default Presale;

/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Vision UI Dashboard PRO React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

import NewSale from "layouts/data-tables/components/Sale";
import EditSection from "examples/Tables/DataTable/EditSection";

import { useState } from "react";

import "./index.css";

function DataTableBodyCell({ noBorder, align, id, data, setDataUpdates, children }) {
  const { light, grey } = colors;
  const { size } = typography;
  const { borderWidth } = borders;

  const [viewOpen, setViewOpen] = useState(false);

  const handleViewOpen = () => {
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  return (
    <>
      <VuiBox
        component="td"
        textAlign={align}
        fontSize={size.sm}
        borderBottom={noBorder ? "none" : `${borderWidth[1]} solid ${grey[700]}`}
        py={1.5}
        px={3}
        style={{ cursor: "pointer" }}
        onClick={handleViewOpen}
      >
        <VuiBox
          display="inline-block"
          width="max-content"
          color="text"
          sx={{ verticalAlign: "middle" }}
        >
          {children}
        </VuiBox>
      </VuiBox>
      {viewOpen && (
        <NewSale open={viewOpen} handleClose={handleViewClose} view={true} data={data} />
      )}
      {id === "edit" && <EditSection data={data} setDataUpdates={setDataUpdates} />}
    </>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableBodyCell;

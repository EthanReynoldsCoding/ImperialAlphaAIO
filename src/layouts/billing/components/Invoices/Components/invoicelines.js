//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\components\Invoices\Components\invoicelines.js

import PropTypes from "prop-types";
import React from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import { IoDocumentText } from "react-icons/io5";

function InvoiceLines({ date, id, price, onClickPDF, selectedPaystub }) {
  return (
    <VuiBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="32px"
    >
      <VuiBox lineHeight={1}>
        <VuiTypography display="block" variant="button" fontWeight="medium" color="white">
          {date}
        </VuiTypography>
        <VuiTypography variant="caption" fontWeight="regular" color="text">
          {id}
        </VuiTypography>
      </VuiBox>
      <VuiBox display="flex" alignItems="center">
        <VuiTypography variant="button" fontWeight="regular" color="text">
          {price}
        </VuiTypography>
        <VuiBox display="flex" alignItems="center" lineHeight={0} ml={3} sx={{ cursor: "pointer" }}>
          <a onClick={onClickPDF}>
            <IoDocumentText color="#fff" size="15px" />
            <VuiTypography variant="button" fontWeight="medium" color="text">
              &nbsp;PDF
            </VuiTypography>
          </a>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

// Setting default values for the props of InvoiceLines
InvoiceLines.defaultProps = {
  noGutter: false,
};

// Typechecking props for the InvoiceLines
InvoiceLines.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  onClickPDF: PropTypes.func.isRequired, // Define a prop for the PDF click handler
};

export default InvoiceLines;

//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\components\Invoices\index.js

import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";
import StubPage from "./Components/stubpage.js";
import InvoiceLines from "./Components/invoicelines.js";
import Icon from "@mui/material/Icon";

function Invoices({ openPaystubForm, openStubPage }) {
  const [paystubs, setPaystubs] = useState([]);
  const { user } = useAuth();
  const [selectedPaystub, setSelectedPaystub] = useState(null);

  useEffect(() => {
    async function fetchPaystubs() {
      const { data, error } = await supabase
        .from("paystubs")
        .select("date, id, gross_pay, new_car_sales, used_car_sales, spiffs, other, taxes, period_beginning_date, period_ending_date, take_home")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching paystubs:", error);
      } else {
        setPaystubs(data);
      }
    }

    fetchPaystubs();
  }, []);

  const handleClickOpen = () => {
    openPaystubForm(); // This opens PaystubForm
  };

  const handlePDFClick = (paystub) => {
    setSelectedPaystub(paystub);
    openStubPage(selectedPaystub); // This opens StubPage with the selected paystub
  };

  useEffect(() => {
    // This code will run whenever selectedPaystub changes
    // You can trigger any side effects or updates here
  }, [selectedPaystub]);

  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <VuiBox mb="28px" display="flex" justifyContent="space-between" alignItems="center">
        <VuiBox display="flex" alignItems="center">
          <VuiTypography variant="h6" fontWeight="medium" color="white">
            Paychecks
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" alignItems="flex-end">
          <VuiButton variant="contained" color="info" size="small" onClick={handleClickOpen}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          </VuiButton>
        </VuiBox>
        <VuiButton variant="contained" color="info" size="small">
          VIEW ALL
        </VuiButton>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {paystubs.map((paystub, index) => (
            <InvoiceLines
              key={index}
              date={paystub.date}
              id={`#${paystub.id}`}
              price={paystub.gross_pay}
              onClickPDF={() => handlePDFClick(paystub)} // Open StubPage on PDF click
            />
          ))}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default Invoices;







//const { user } = useAuth();
//const { id: userId } = user;
//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\components\Invoices\Components\Event\PaystubForm\formfield.js
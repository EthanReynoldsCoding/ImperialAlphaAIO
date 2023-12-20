//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2.1\src\layouts\billing\index.js

import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import { supabase } from "supabaseClient";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import CreditBalance from "./components/CreditBalance";
import MasterCard from "examples/Cards/MasterCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Grid } from "@mui/material";
import { useAuth } from "hooks/Auth";
import PaystubForm from "./components/Invoices/Components/Event/PaystubForm/paystubform.js";
import NewPaystub from "./components/Invoices/Components/Event/index.js";
import StubPageView from "./components/Invoices/Components/stubpageview.js";
import StubPage from "./components/Invoices/Components/stubpage.js";

function Billing() {
  const [paystubs, setPaystubs] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [isStubPageVisible, setIsStubPageVisible] = useState(false);
  const [selectedPaystub, setSelectedPaystub] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePDFClick = (paystub) => {
    setSelectedPaystub(paystub);
    setIsStubPageVisible(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const getPaystubs = useCallback(async () => {
    const { data } = await supabase.from("paystubs").select();
    setPaystubs(data);
  }, []);

  useEffect(() => {
    const fetchPaystubs = async () => {
      const { data, error } = await supabase
        .from("paystubs")
        .select("date, id, gross_pay, new_car_sales, used_car_sales, spiffs, other, taxes")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching paystubs:", error);
      } else {
        setPaystubs(data);
      }
    };

    fetchPaystubs();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={7812213908237916} valid="05/24" cvv="09X" />
                </Grid>
                <Grid item xs={12} md={12} xl={6}>
                  <CreditBalance />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} xl={4}>
              <Invoices openPaystubForm={handleClickOpen} openStubPage={handlePDFClick} />
              <StubPageView
                open={isStubPageVisible}
                handleClose={() => setIsStubPageVisible(false)}
                data={selectedPaystub}
                setDataUpdated={setDataUpdated}
                selectedPaystub={selectedPaystub} // Pass the selectedPaystub
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
      <NewPaystub open={open} handleClose={handleClose} setDataUpdated={setDataUpdated} />
      {isStubPageVisible && selectedPaystub && (
        <StubPageView
          open={isStubPageVisible}
          handleClose={() => setIsStubPageVisible(false)}
          data={selectedPaystub}
          setDataUpdated={setDataUpdated}
        />
      )}
    </DashboardLayout>
  );
}

export default Billing;

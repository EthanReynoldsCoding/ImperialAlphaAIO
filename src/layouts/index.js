import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PaymentCalculator from "./components/Payments.js";
import SpendingPowerCalculator from "./components/SpendingPower.js";
import Footer from "examples/Footer";

function Calculator() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <PaymentCalculator />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <SpendingPowerCalculator />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </DashboardLayout>
  );
}

export default Calculator;

/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useCallback, useEffect, useState } from "react";
import { supabase } from "supabaseClient";

// @mui material components
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";

// Dashboard layout components
import Header from "layouts/dashboard/Header/index";
import Projects from "layouts/dashboard/yearly/components/Projects";
import ReferralTracking from "layouts/dashboard/yearly/components/ReferralTracking";
import SatisfactionRate from "layouts/dashboard/yearly/components/SatisfactionRate";
import WelcomeMark from "layouts/dashboard/yearly/components/WelcomeMark";
import ToDoListWidget from "widgets/TDList";

// React icons
import { FaShoppingCart } from "react-icons/fa";
import { IoDocumentText, IoGlobe, IoWallet } from "react-icons/io5";

// Components
import CommissionPerCar from "layouts/dashboard/daily/components/CommissionPerCar";
import MonthlySoldChart from "layouts/dashboard/daily/components/MonthlySoldChart";
import ProfitPerCar from "layouts/dashboard/daily/components/ProfitPerCar";
import SalesOverView from "layouts/dashboard/daily/components/SalesOverView";
import SoldPerMonth from "layouts/dashboard/daily/components/SoldPerMonth";
import TotalSalesPerMonth from "layouts/dashboard/daily/components/TotalSalesPerMonth";

// Utils
import calcCurrentYear from "utils/calcCurrentYear";

function YearlyDashboard() {
  const [salesCount, setSalesCount] = useState(0);
  const [yearlyCars, setYearlyCars] = useState(0);
  const [yearlyCommission, setYearlyCommission] = useState("$0");
  const [yearlyProfit, setYearlyProfit] = useState("$0");
  const [yearlySales, setYearlySales] = useState("$0");

  const { gradients } = colors;
  const { cardContent } = gradients;

  const crntYear = calcCurrentYear();

  const countSum = useCallback(async () => {
    const { data, error } = await supabase.rpc("sum_of_count_from_sales");

    if (!error && data) {
      setSalesCount(data);
    }
  }, []);

  const getYearlyCarsSold = useCallback(async () => {
    const { data, error } = await supabase.rpc("yearly_cars_sold");
    if (!error && data) {
      setYearlyCars(data);
    }
  }, []);

  const getYearlyCommission = useCallback(async () => {
    const { data, error } = await supabase.rpc("yearly_commission");
    if (!error && data) {
      setYearlyCommission(data);
    }
  }, []);

  const getYearlyProfit = useCallback(async () => {
    const { data, error } = await supabase.rpc("yearly_profit");
    if (!error && data) {
      setYearlyProfit(data);
    }
  }, []);

  const getYearlySales = useCallback(async () => {
    const { data, error } = await supabase.rpc("yearly_sales");
    if (!error && data) {
      setYearlySales(data);
    }
  }, []);

  useEffect(() => {
    countSum();
    getYearlyCarsSold();
    getYearlyCommission();
    getYearlyProfit();
    getYearlySales();
  }, [countSum, getYearlyCarsSold, getYearlyCommission, getYearlyProfit, getYearlySales]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Yearly Cars Sold" }}
                count={yearlyCars}
                // percentage={{ color: "success", text: "+100%" }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Yearly Commission", fontWeight: "regular" }}
                count={yearlyCommission}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Yearly Gross Profit" }}
                count={yearlyProfit}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Yearly Sales" }}
                count={yearlySales}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6} xl={6}>
              <Card style={{ height: "100%" }}>
                <SalesOverView crntYear={crntYear} />
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={6}>
              <Card>
                <VuiBox>
                  <MonthlySoldChart cardContent={cardContent} crntYear={crntYear} />
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Analytics
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <SoldPerMonth salesCount={salesCount} />
                    <CommissionPerCar />
                    <ProfitPerCar />
                    <TotalSalesPerMonth />
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ToDoListWidget />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default YearlyDashboard;

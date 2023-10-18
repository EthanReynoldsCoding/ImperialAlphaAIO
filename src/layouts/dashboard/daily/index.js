import { useCallback, useEffect, useState } from "react";
import { supabase } from "supabaseClient";

import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import linearGradient from "assets/theme/functions/linearGradient";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";

// Dashboard layout components
import Header from "layouts/dashboard/Header/index";
import Projects from "layouts/dashboard/daily/components/Projects";
import ReferralTracking from "layouts/dashboard/daily/components/ReferralTracking";
import SatisfactionRate from "layouts/dashboard/daily/components/SatisfactionRate";
import WelcomeMark from "layouts/dashboard/daily/components/WelcomeMark";
import ToDoListWidget from "widgets/TDList";
import Presale from "widgets/presold";

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

function DailyDashboard() {
  const [salesCount, setSalesCount] = useState(0);
  const [dailyCars, setDailyCars] = useState(0);
  const [dailyCommission, setDailyCommission] = useState("$0");
  const [dailyProfit, setDailyProfit] = useState("$0");
  const [dailySales, setDailySales] = useState("$0");

  const cardContent = linearGradient(
    colors.gradients.cardContent.main,
    colors.gradients.cardContent.state,
    colors.gradients.cardContent.deg
  );

  const crntYear = calcCurrentYear();

  const countSum = useCallback(async () => {
    const { data, error } = await supabase.rpc("sum_of_count_from_sales");

    if (!error && data) {
      setSalesCount(data);
    }
  }, []);

  const getDailyCarsSold = useCallback(async () => {
    const { data, error } = await supabase.rpc("daily_cars_sold");
    if (!error && data) {
      setDailyCars(data);
    }
  }, []);

  const getDailyCommission = useCallback(async () => {
    const { data, error } = await supabase.rpc("daily_commission");
    if (!error && data) {
      setDailyCommission(data);
    }
  }, []);

  const getDailyProfit = useCallback(async () => {
    const { data, error } = await supabase.rpc("daily_profit");
    if (!error && data) {
      setDailyProfit(data);
    }
  }, []);

  const getDailySales = useCallback(async () => {
    const { data, error } = await supabase.rpc("daily_sales");
    if (!error && data) {
      setDailySales(data);
    }
  }, []);

  useEffect(() => {
    countSum();
    getDailyCarsSold();
    getDailyCommission();
    getDailyProfit();
    getDailySales();
  }, [countSum, getDailyCarsSold, getDailyCommission, getDailyProfit, getDailySales]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Daily Cars Sold" }}
                count={dailyCars}
                icon={{
                  color: "info",
                  component: <IoGlobe size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Daily Commission", fontWeight: "regular" }}
                count={dailyCommission}
                icon={{
                  color: "info",
                  component: <IoWallet size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Daily Gross Profit" }}
                count={dailyProfit}
                icon={{
                  color: "info",
                  component: <IoDocumentText size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Daily Sales" }}
                count={dailySales}
                icon={{
                  color: "info",
                  component: <FaShoppingCart size="20px" color="white" />,
                }}
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
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          mb={3}
        >
          <Grid item xs={12} md={6} lg={12}>
            <Presale />
          </Grid>
        </Grid>
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

export default DailyDashboard;

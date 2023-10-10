import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/daily/components/WelcomeMark";
import Projects from "layouts/dashboard/daily/components/Projects";
import OrderOverview from "layouts/dashboard/daily/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/daily/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/daily/components/ReferralTracking";
import Header from "layouts/dashboard/Header/index";
import ToDoListWidget from "widgets/TDList";
import Presale from "widgets/presold";
import Calendar from "layouts/calendar/index.js";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartOptionsDashboard } from "layouts/dashboard/daily/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/daily/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/daily/data/barChartOptions";
import { salesTableData } from "layouts/dashboard/daily/data/salesTableData";

// Components
import SoldPerMonth from "layouts/dashboard/daily/components/SoldPerMonth";
import CommissionPerCar from "layouts/dashboard/daily/components/CommissionPerCar";
import ProfitPerCar from "layouts/dashboard/daily/components/ProfitPerCar";
import TotalSalesPerMonth from "layouts/dashboard/daily/components/TotalSalesPerMonth";
import SalesOverView from "layouts/dashboard/daily/components/SalesOverView";
import MonthlySoldChart from "layouts/dashboard/daily/components/MonthlySoldChart";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "supabaseClient";
import dayjs from "dayjs";

function DailyDashboard() {
  const [salesCount, setSalesCount] = useState(0);
  const cardContent = linearGradient(
    colors.gradients.cardContent.main,
    colors.gradients.cardContent.state,
    colors.gradients.cardContent.deg
  );

  const today = new Date();
  const crntYear = dayjs(today).format("YYYY");

  const getSales = useCallback(async () => {
    const { data: sum, sumError } = await supabase.rpc("sum_of_count_from_sales");

    if (!sumError) {
      setSalesCount(sum);
    }
  }, []);

  useEffect(() => {
    getSales();
  }, []);

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
                count="0"
                icon={{
                  color: "info",
                  component: <IoGlobe size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Daily Commission", fontWeight: "regular" }}
                count="$0"
                icon={{
                  color: "info",
                  component: <IoWallet size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Daily Gross Profit" }}
                count="+0"
                icon={{
                  color: "info",
                  component: <IoDocumentText size="22px" color="white" />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Daily Sales" }}
                count="$0"
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
          <Grid item xs={12} md={6} lg={12}>
            <Presale />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DailyDashboard;

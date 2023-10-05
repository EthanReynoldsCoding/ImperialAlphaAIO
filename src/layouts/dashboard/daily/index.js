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

import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "supabaseClient";
import dayjs from "dayjs";

function DailyDashboard() {
  const cardContent = linearGradient(
    colors.gradients.cardContent.main,
    colors.gradients.cardContent.state,
    colors.gradients.cardContent.deg
  );

  const today = new Date();
  const crntYear = dayjs(today).format("YYYY");

  const options = {
    chart: {
      height: 220,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "#fff",
        },
      },
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        },
      },
    },
    title: {
      text: `Monthly Sold cars, ${crntYear}`,
      floating: true,
      offsetY: 200,
      align: "center",
      style: {
        color: "#fff",
      },
    },
  };

  const seriesDemo = [
    {
      name: "Cars Sold",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const [series, setSeries] = useState(seriesDemo);
  const [carsSold, setCarsSold] = useState(0);

  const lineChartDataDashboardDemo = [
    {
      name: "New Cars",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Used Cars",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const [lineChartDataDashboard, setLineChartDataDashboard] = useState(
    lineChartDataDashboardDemo
  );

  const getSales = useCallback(async () => {
    const { data, error } = await supabase
      .from("sales")
      .select("date, condition");

    console.log("data", data);

    if (!error) {
      const avg = String(data.length / 12);
      setCarsSold(avg.slice(0, 5));

      data.map((d) => {
        const condition = d.condition;
        if (condition === "new") {
          const month = Number(d.date.slice(5, 7));
          const oldArr = lineChartDataDashboard[0].data;
          oldArr[month - 1] += 1;
          const placeholder = lineChartDataDashboard;
          const old = placeholder[0];
          old["data"] = oldArr;
          setLineChartDataDashboard((lineChartDataDashboard) => [
            ...placeholder,
          ]);
        } else {
          const month = Number(d.date.slice(5, 7));
          const oldArr = lineChartDataDashboard[1].data;
          oldArr[month - 1] += 1;
          const placeholder = lineChartDataDashboard;
          const old = placeholder[1];
          old["data"] = oldArr;
          setLineChartDataDashboard((lineChartDataDashboard) => [
            ...placeholder,
          ]);
        }
        const month = Number(d.date.slice(5, 7));
        const oldArr = series[0].data;
        oldArr[month - 1] += 1;
        const placeholder = series;
        const old = placeholder[0];
        old["data"] = oldArr;
        setSeries((series) => [...placeholder]);
      });
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSales();
  }, []);

  console.log("lineChartDataDashboard", lineChartDataDashboard);

  const lineSeries = [
    {
      name: "New Cars",
      data: [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 8, 0],
    },
    {
      name: "Used Cars",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
  ];

  const lineOptions = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      // type: "datetime",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: "#56577A",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#0075FF", "#2CD9FF"],
    },
    colors: ["#0075FF", "#2CD9FF"],
  };

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
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Sales Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography
                      variant="button"
                      color="success"
                      fontWeight="bold"
                    >
                      +5% more{" "}
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        in ${crntYear}
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    {/* <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    /> */}
                    {/* <Chart
                      options={lineChartOptionsDashboard}
                      series={lineChartDataDashboard}
                      type="area"
                      width="100%"
                      height="100%"
                    /> */}
                    <Chart
                      options={lineOptions}
                      series={lineChartDataDashboard}
                      type="area"
                      width="100%"
                      height="100%"
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: cardContent,
                      borderRadius: "20px",
                    }}
                  >
                    {/* <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    /> */}
                    <Chart
                      options={options}
                      series={series}
                      type="bar"
                      height={220}
                    />
                  </VuiBox>
                  <VuiTypography
                    variant="lg"
                    color="white"
                    fontWeight="bold"
                    mb="5px"
                  >
                    Active Analytics
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography
                      variant="button"
                      color="success"
                      fontWeight="bold"
                    >
                      (+23){" "}
                      <VuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Average Sold Cars Per Month
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        {carsSold}
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        2,42M
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        2,400$
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            borderRadius: "6px",
                            width: "25px",
                            height: "25px",
                          }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography
                          color="text"
                          variant="button"
                          fontWeight="medium"
                        >
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography
                        color="white"
                        variant="lg"
                        fontWeight="bold"
                        mb="8px"
                      >
                        320
                      </VuiTypography>
                      <VuiProgress
                        value={60}
                        color="info"
                        sx={{ background: "#2D2E5F" }}
                      />
                    </Grid>
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
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
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

// options: {
//   chart: {
//     height: 350,
//     type: 'line',
//     dropShadow: {
//       enabled: true,
//       color: '#000',
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2
//     },
//     toolbar: {
//       show: false
//     }
//   },
//   colors: ['#77B6EA', '#545454'],
//   dataLabels: {
//     enabled: true,
//   },
//   stroke: {
//     curve: 'smooth'
//   },
//   title: {
//     text: 'Average High & Low Temperature',
//     align: 'left'
//   },
//   grid: {
//     borderColor: '#e7e7e7',
//     row: {
//       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//       opacity: 0.5
//     },
//   },
//   markers: {
//     size: 1
//   },
//   xaxis: {
//     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     title: {
//       text: 'Month'
//     }
//   },
//   yaxis: {
//     title: {
//       text: 'Temperature'
//     },
//     min: 5,
//     max: 40
//   },
//   legend: {
//     position: 'top',
//     horizontalAlign: 'right',
//     floating: true,
//     offsetY: -25,
//     offsetX: -5
//   }
// },

// };

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import Chart from "react-apexcharts";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "supabaseClient";

function SalesOverView() {
  const options = {
    chart: {
      height: 340,
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

  const [lineChartDataDashboard, setLineChartDataDashboard] = useState(lineChartDataDashboardDemo);

  const getResult = useCallback(async () => {
    const { data, error } = await supabase.from("sales").select();

    if (!error) {
      data.map((d) => {
        const condition = d.condition;
        if (condition === "new" || condition === "ctp") {
          const month = Number(d.date.slice(5, 7));
          const oldArr = lineChartDataDashboard[0].data;
          oldArr[month - 1] += 1;
          const placeholder = lineChartDataDashboard;
          const old = placeholder[0];
          old["data"] = oldArr;
          setLineChartDataDashboard((lineChartDataDashboard) => [...placeholder]);
        } else if (condition === "used" || condition === "cpo") {
          const month = Number(d.date.slice(5, 7));
          const oldArr = lineChartDataDashboard[1].data;
          oldArr[month - 1] += 1;
          const placeholder = lineChartDataDashboard;
          const old = placeholder[1];
          old["data"] = oldArr;
          setLineChartDataDashboard((lineChartDataDashboard) => [...placeholder]);
        }
      });
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getResult();
  }, [getResult]);

  return (
    <VuiBox>
      <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
        Sales Overview
      </VuiTypography>
      <VuiBox display="flex" alignItems="center" mb="40px">
        {/* <VuiTypography variant="button" color="success" fontWeight="bold">
          +5% more{" "}
          <VuiTypography variant="button" color="text" fontWeight="regular">
            in {crntYear}
          </VuiTypography>
        </VuiTypography> */}
      </VuiBox>
      <VuiBox>
        <Chart options={options} series={lineChartDataDashboard} type="area" height={340} />
      </VuiBox>
    </VuiBox>
  );
}

export default SalesOverView;

import React, { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "supabaseClient";
import VuiTypography from "components/VuiTypography";

function SalesDaysOfWeek({ crntYear }) {
  const options = {
    chart: {
      height: 315,
      type: "bar",
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
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#0075FF", "#2CD9FF"],
    },
    colors: ["#0075FF", "#2CD9FF"],
  };

  const [barChartDataDashboard, setBarChartDataDashboard] = useState({
    name: "Total Sales",
    data: [0, 0, 0, 0, 0, 0],
  });

  const updateChartData = useCallback(async () => {
    const { data, error } = await supabase
      .from("sales")
      .select("date, count")
      .order("date");

    if (!error) {
      const daysOfWeekSales = [0, 0, 0, 0, 0, 0, 0];

      data.forEach((d) => {
        const date = new Date(d.date);
        const dayOfWeek = date.getDay();
        daysOfWeekSales[dayOfWeek] += Number(d.count);
      });

      setBarChartDataDashboard((prevData) => ({
        ...prevData,
        data: daysOfWeekSales,
      }));
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  return (
    <div>
      <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
        Sales By Days of The Week
      </VuiTypography>
      <Chart options={options} series={[barChartDataDashboard]} type="bar" height={315} />
    </div>
  );
}

export default SalesDaysOfWeek;

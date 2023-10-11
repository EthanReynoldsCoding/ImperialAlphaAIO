import VuiBox from "components/VuiBox";
import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "supabaseClient";

function MonthlySoldChart({ cardContent, crntYear }) {
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
        offsetY: -3,
        style: {
          colors: "#fff",
          fontSize: "10px",
        },
      },
      position: "top",
      // axisBorder: {
      //   show: false,
      // },
      // axisTicks: {
      //   show: false,
      // },
      // crosshairs: {
      //   fill: {
      //     type: "gradient",
      //     gradient: {
      //       colorFrom: "#D8E3F0",
      //       colorTo: "#BED1E6",
      //       stops: [0, 100],
      //       opacityFrom: 0.4,
      //       opacityTo: 0.5,
      //     },
      //   },
      // },
      // tooltip: {
      //   enabled: true,
      // },
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
      text: `Monthly Sold Cars, ${crntYear}`,
      floating: true,
      offsetY: 220,
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
  const [loading, setLoading] = useState(true);

  const getResult = useCallback(async () => {
    const { data, error } = await supabase.from("sales").select();

    if (!error) {
      data.map((d) => {
        const count = Number(d.count);
        const month = Number(d.date.slice(5, 7));
        const oldArr = series[0].data;
        oldArr[month - 1] += count;
        const placeholder = series;
        const old = placeholder[0];
        old["data"] = oldArr;
        setSeries((series) => [...placeholder]);
      });
      setLoading(false);
    } else {
      console.log(error);
    }
  }, []);

  console.log("seriesc", series);

  useEffect(() => {
    getResult();
  }, [getResult]);

  return (
    <VuiBox
      mb="24px"
      height="220px"
      sx={{
        background: cardContent,
        borderRadius: "20px",
      }}
    >
      {!loading && <Chart options={options} series={series} type="bar" height={220} />}
    </VuiBox>
  );
}

export default MonthlySoldChart;

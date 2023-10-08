import Chart from "react-apexcharts";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "supabaseClient";
import dayjs from "dayjs";

function MonthlySoldChart() {
  const today = new Date();
  const crntYear = dayjs(today).format("YYYY");

  const seriesDemo = [
    {
      name: "Cars Sold",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const [series, setSeries] = useState(seriesDemo);
  const [loading, setLoading] = useState(true);

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

  const getResult = useCallback(async () => {
    const { data, error } = await supabase.from("sales").select();

    if (!error) {
      const mySet1 = new Set();
      data.map((d) => {
        const date = dayjs(d.date).format("MM-YYYY");
        mySet1.add(date);

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
    setLoading(true);
    getResult();
    setLoading(false);
  }, [getResult]);

  return (
    <div>{!loading && <Chart options={options} series={series} type="bar" height={220} />}</div>
  );
}

export default MonthlySoldChart;

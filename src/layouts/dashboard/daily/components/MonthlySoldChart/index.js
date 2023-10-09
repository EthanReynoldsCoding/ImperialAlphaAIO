import VuiBox from "components/VuiBox";
import { useCallback, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "supabaseClient";

function MonthlySoldChart({ cardContent }) {
  const options = {
    chart: {
      type: "bar",
      height: 220,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
          colors: "#c8cfca",
          fontSize: "10px",
        },
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
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
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

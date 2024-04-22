import React from "react";
import dynamic from "next/dynamic";
import Spinner from "./spinner";

// import Chart from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Spinner />,
});
interface OptionType {
  options: {
    chart: {
      id: string;
    };
    xaxis: {
      categories: number[];
    };
    colors: string[];
  };
}

interface SeriesType {
  series: {
    name: string;
    data: number[];
  }[];
}

export default function BarChart() {
  const options: OptionType = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      },
      colors: ["#0058A9"],
    },
  };
  const series: SeriesType = {
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 23],
      },
    ],
  };

  return (
    <>
      <div className="w-full">
        {typeof window !== undefined && (
          <Chart
            options={options.options}
            series={series.series}
            type="bar"
            height={380}
            width={"100%"}
          />
        )}
      </div>
    </>
  );
}

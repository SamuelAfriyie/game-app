"use client";
import React from 'react';
import dynamic from 'next/dynamic';

import Chart from "react-apexcharts";
// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// const LineChart = () => {
//     const series = [{
//         name: 'Example Series',
//         data: [31, 40, 28, 51, 42, 109, 100]
//     }];

//     const options = {
//         chart: {
//             height: 350,
//             type: 'line',
//             zoom: {
//                 enabled: false
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             curve: 'straight'
//         },
//         title: {
//             text: 'Simple Line Chart',
//             align: 'left'
//         },
//         grid: {
//             row: {
//                 colors: ['#f3f3f3', 'transparent'],
//                 opacity: 0.5
//             },
//         },
//         xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//         }
//     };

//     return <Chart options={options} series={series} type="line" height={350} />;
// };

// export default LineChart;

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
          <Chart
            options={options.options}
            series={series.series}
            type="bar"
            //   width="500"
            height={380}
          />
        </div>
      </>
    );
  }
  
import React from "react";
import ReactApexChart from "react-apexcharts";

var options = {
  chart: {
    height: 350,
    type: "heatmap"
  },
  colors: ["#008FFB"],
  dataLabels: {
    position: 'top',
    style: {
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: undefined
    },
    formatter: function(value, { seriesIndex, dataPointIndex, w }) {
      console.log(`seriesIndex: ${seriesIndex}`);
      console.log(`dataPointIndex: ${dataPointIndex}`);
      return value;
    }
  },
  title: {
    text: "HeatMap Chart Characters"
  }
};

var series = [
  {
    name: "",
    data: formatData([
      0,
      0,
      0,
      0,
      20,
      40,
      45,
      45,
      30,
      20,
      5,
      5,
      15,
      35,
      35,
      20,
      45,
      40,
      25,
      5,
      20,
      25,
      40,
      5
    ])
  },
  {
    name: "",
    data: formatData([
      0,
      0,
      15,
      10,
      40,
      25,
      35,
      25,
      30,
      10,
      5,
      5,
      5,
      20,
      30,
      30,
      10,
      15,
      15,
      5,
      55,
      20,
      20,
      5
    ])
  },
  {
    name: "",
    data: formatData([
      0,
      0,
      5,
      10,
      35,
      25,
      30,
      30,
      5,
      20,
      0,
      0,
      15,
      10,
      20,
      5,
      40,
      25,
      20,
      30,
      45,
      20,
      15,
      5
    ])
  },
  {
    name: "",
    data: formatData([
      0,
      0,
      4,
      0,
      28,
      28,
      12,
      28,
      44,
      28,
      28,
      8,
      0,
      8,
      16,
      32,
      20,
      36,
      36,
      44,
      28,
      32,
      4,
      4
    ])
  },
  {
    name: "",
    data: formatData([
      0,
      4,
      0,
      4,
      4,
      0,
      4,
      12,
      16,
      24,
      16,
      8,
      16,
      4,
      20,
      32,
      48,
      44,
      36,
      36,
      90,
      28,
      8,
      16
    ])
  }
];

function formatData(data) {
  let newData = [];
  let categories = [
    "1",
    "6",
    "11",
    "16",
    "21",
    "26",
    "31",
    "36",
    "41",
    "46",
    "51",
    "56",
    "61",
    "66",
    "71",
    "76",
    "81",
    "86",
    "91",
    "96"
  ];

  for (var i = 0; i < categories.length; i++) {
    newData.push({
      x: categories[i],
      y: data[i]
    });
  }
  console.log(newData);
  return newData;
}

export default function MyHeatmap() {
  return (
    <div className="App">
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height="350"
      />
    </div>
  );
}

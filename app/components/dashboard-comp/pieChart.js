import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const PieChart = ({ calcShares }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
        height: 350,
      },
      labels: [],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#FF5733"],
      legend: {
        position: "bottom",
      },
    },
  });

  useEffect(() => {
    if (calcShares.length > 0) {
      const labels = calcShares.map(
        (entry) => `${entry.firstName} ${entry.lastName}`
      );
      const series = calcShares.map((entry) => parseFloat(entry.percentage));
      setChartData((prev) => ({
        ...prev,
        series,
        options: {
          ...prev.options,
          labels,
        },
      }));
    }
  }, [calcShares]);

  return (
    <div className="max-w-[50%]">
      <h2 className="text-2xl font-bold mb-4">Shares Distribution</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default PieChart;

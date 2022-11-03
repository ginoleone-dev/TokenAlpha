import React from "react";
import { Pie, Chart, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function PieChart({ chartData }) {
  return (
    <div>
      <Doughnut data={chartData} options={chartData.options} />
    </div>
  );
}

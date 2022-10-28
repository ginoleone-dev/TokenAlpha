import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function BarChart({ chartData }) {
  return (
    <div>
      <Line data={chartData} options={chartData.options} />
    </div>
  );
}

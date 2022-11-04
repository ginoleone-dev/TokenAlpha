import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import DaysButtons from "../Components/DaysButtons";

export default function BarChart({ chartData }) {
  return (
    <>
      <Line data={chartData} options={chartData.options} />
      <DaysButtons />
    </>
  );
}

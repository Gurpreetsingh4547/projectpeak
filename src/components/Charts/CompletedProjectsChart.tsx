import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { array } from "prop-types";

ChartJS.register(...registerables);

interface CompletedProjectsChartProps {
  list?: { month: string; complete: number }[];
}

/**
 * Complete projects chart
 * @param {any[]} list
 * @returns Node graph
 */
const CompletedProjectsChart: React.FC<CompletedProjectsChartProps> = ({
  list = [{ month: "2024-1", count: 0 }],
}) => {
  // Prepare chart data
  const labels = list.map((item: any) => item.month);
  const counts = list.map((item: any) => item.Complete);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Completed Projects",
        data: counts,
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)", // Light green
        borderWidth: 2,
        fill: true, // Fill the area under the line
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count of Completed Projects",
        },
        beginAtZero: true, // Start y-axis at zero
      },
    },
  };

  return (
    <div>
      <h2>Monthly Completed Projects</h2>
      <Line data={data} options={options} />
    </div>
  );
};

CompletedProjectsChart.propTypes = {
  list: array,
};

export default CompletedProjectsChart;

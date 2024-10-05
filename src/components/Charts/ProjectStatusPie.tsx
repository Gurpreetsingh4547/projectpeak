// PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { object } from "prop-types";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Project Status Pie Chart
 */
const ProjectStatusPie: React.FC<any> = ({ status = {} }) => {
  const data = {
    labels: ["Pending", "In Progress", "Complete", "Blocked"],
    datasets: [
      {
        data: [
          status?.pending,
          status?.inProgress,
          status?.completed,
          status?.blocked,
        ], // Example data for each status
        backgroundColor: ["#eab308", "#3b82f6", "#22c55e", "#ef4444"], // Colors: yellow, blue, green, red
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

ProjectStatusPie.propTypes = {
  status: object,
};

export default ProjectStatusPie;

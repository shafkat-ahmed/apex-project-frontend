import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

// Register necessary components for Bar Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ chartData }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: darkMode ? "#ffffff" : "#000000",
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: darkMode ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)",
        titleColor: darkMode ? "#fff" : "#000",
        bodyColor: darkMode ? "#fff" : "#000",
        borderColor: darkMode ? "#00FF99" : "#FF5733",
        borderWidth: 1,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 6,
        backgroundColor: darkMode ? "#00FF99" : "#FF5733",
        borderColor: "#fff",
        borderWidth: 2,
        hoverRadius: 8,
        hoverBorderWidth: 3,
      },
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
        },
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
          font: { size: 14 },
        },
      },
      y: {
        grid: {
          color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
        },
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div
      className={`container-fluid ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      } rounded-3`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`btn ${
          darkMode ? "btn-warning" : "btn-secondary"
        } position-absolute top-0 end-0 mt-3 me-3`}
      >
        {darkMode ? <i className="bi bi-sun" /> : <i className="bi bi-moon" />}
      </button>
      <div style={{ height: "450px" }}>
        {isClient ? <Pie data={chartData} options={options} /> : null}
      </div>
    </div>
  );
};

export default PieChart;

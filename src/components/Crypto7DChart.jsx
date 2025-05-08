// src/components/Sparkline.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

const Sparkline = ({ prices }) => {
  const data = {
    labels: prices.map((_, i) => i), // dummy labels
    datasets: [
      {
        data: prices,
        borderColor: "#007bff",
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { line: { borderJoinStyle: "round" } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return <Line data={data} options={options} />;
};

export default Sparkline;

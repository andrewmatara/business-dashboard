import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ["North America", "Europe", "Asia"],
        datasets: [
            {
                label: "Revenue",
                data: [300, 500, 200],
                backgroundColor: ["#4A90E2", "#50E3C2", "#F5A623"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Revenue by Region",
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;

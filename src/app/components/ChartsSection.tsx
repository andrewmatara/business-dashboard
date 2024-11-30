'use client'

import { Box, SimpleGrid } from "@chakra-ui/react";
import { Line, Bar, Pie } from "react-chartjs-2";

const ChartsSection = () => {
    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales",
                data: [3000, 4000, 5000, 4000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000],
                borderColor: "blue",
                fill: false,
            },
            {
                label: "Expenses",
                data: [2000, 3000, 2000, 4000, 3000, 4000, 5000, 4000, 6000, 5000, 7000, 6000],
                borderColor: "red",
                fill: false,
            },
        ],
    };

    const barData = {
        labels: ["North America", "Europe", "Asia"],
        datasets: [
            {
                label: "Revenue",
                data: [50000, 40000, 30000],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };

    const pieData = {
        labels: ["Marketing", "Operations", "HR"],
        datasets: [
            {
                data: [40, 30, 30],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };

    return (
        <SimpleGrid columns={[1, 2, 3]} spacing={5} mb={5}>
            <Box bg="white" p={4} shadow="md" borderRadius="md">
                <Line data={lineData} />
            </Box>
            <Box bg="white" p={4} shadow="md" borderRadius="md">
                <Bar data={barData} />
            </Box>
            <Box bg="white" p={4} shadow="md" borderRadius="md">
                <Pie data={pieData} />
            </Box>
        </SimpleGrid>
    );
};

export default ChartsSection;

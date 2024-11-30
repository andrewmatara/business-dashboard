'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const chartData = {
        labels: ['Marketing', 'Operations', 'HR', 'IT', 'Other'],
        datasets: [
            {
                data: [3000, 4000, 2000, 1000, 500],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Expenses Breakdown by Category',
            },
        },
    };

    return (
        <Box>
            <Pie data={chartData} options={options} />
        </Box>
    );
};

export default PieChart;

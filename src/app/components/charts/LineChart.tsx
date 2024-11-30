'use client'; 
import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { ButtonGroup } from "@chakra-ui/button"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const [viewMode, setViewMode] = useState<'cumulative' | 'monthly'>('monthly');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Simulated data for monthly and cumulative
    const monthlySales = [1000, 1500, 1200, 1800, 2000, 2500, 3000, 2800, 3200, 4000, 3500, 5000];
    const monthlyExpenses = [800, 1200, 900, 1500, 1700, 2000, 2200, 2000, 2400, 3000, 2800, 3500];

    const cumulativeSales = monthlySales.reduce((acc, val, i) => [...acc, (acc[i - 1] || 0) + val], []);
    const cumulativeExpenses = monthlyExpenses.reduce((acc, val, i) => [...acc, (acc[i - 1] || 0) + val], []);

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Sales',
                data: viewMode === 'monthly' ? monthlySales : cumulativeSales,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Expenses',
                data: viewMode === 'monthly' ? monthlyExpenses : cumulativeExpenses,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: viewMode === 'monthly' ? 'Monthly Sales and Expenses Trends' :'Cumulative Sales and Expenses Trends',
            },
        },
    };

    return (
        <Box>
            <ButtonGroup size="sm" mb={4}>
                <Button colorScheme={viewMode === 'monthly' ? 'blue' : 'gray'} onClick={() => setViewMode('monthly')}>
                    Monthly
                </Button>
                <Button
                    colorScheme={viewMode === 'cumulative' ? 'blue' : 'gray'}
                    onClick={() => setViewMode('cumulative')}
                >
                    Cumulative
                </Button>
            </ButtonGroup>
            <Line data={chartData} options={options} />
        </Box>
    );
};

export default LineChart;

'use client'
import { Box, SimpleGrid } from "@chakra-ui/react";
import KPISection from "../components/KPISection";
import TransactionsTable from "../components/TransactionsTable";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";


const Dashboard = () => {
    return (
        <Box p={5}>
            <KPISection />
            <TransactionsTable />
            <SimpleGrid columns={[1, 3]} spacing={10}>
                <Box>
                    <LineChart />
                </Box>
                <Box>
                    <PieChart />
                </Box>
                <Box>
                    <BarChart />
                </Box>
            </SimpleGrid>
          
            
        </Box>
    );
};

export default Dashboard;

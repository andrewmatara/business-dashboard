'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@chakra-ui/select";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { SimpleGrid, Box, Text, HStack, Input, Spinner } from "@chakra-ui/react";
import axios from "axios";
import BASE_URL from '@/config/api'; // Import the base URL



const fetchKpis = async (range: string, startDate?: string, endDate?: string) => {
    const params: Record<string, string> = { range };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const { data } = await axios.get(`${BASE_URL}/kpis`, { params });
    return data;
};

const KPISection = () => {
    const [selectedRange, setSelectedRange] = useState("7"); // Default: Last 7 Days
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");

    // Fetch KPIs using React Query
    const { data: kpis, isLoading, error } = useQuery({
        queryKey: ["kpis", selectedRange, customStartDate, customEndDate],
        queryFn: () => fetchKpis(selectedRange, customStartDate, customEndDate),
        keepPreviousData: true, // Retains old data while fetching new data
    });

    const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRange(e.target.value);
        if (e.target.value !== "custom") {
            setCustomStartDate("");
            setCustomEndDate("");
        }
    };

    if (isLoading) {
        return (
            <Box textAlign="center" py={10}>
                <Spinner size="xl" />
                <Text>Loading KPIs...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={10} color="red.500">
                <Text>Error loading KPIs. Please try again later.</Text>
            </Box>
        );
    }

    // Access the 'data' array inside the first object of the 'kpis' array
    const kpiData = kpis?.[0]?.data || []; // Ensure we have data to render

    return (
        <Box>
            <HStack spacing={4} mb={5}>
                <Select
                    value={selectedRange}
                    onChange={handleRangeChange}
                    width="200px"
                    placeholder="Select Date Range"
                >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                    <option value="custom">Custom Range</option>
                </Select>

                {selectedRange === "custom" && (
                    <>
                        <FormControl>
                            <FormLabel>Start Date</FormLabel>
                            <Input
                                type="date"
                                value={customStartDate}
                                onChange={(e) => setCustomStartDate(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>End Date</FormLabel>
                            <Input
                                type="date"
                                value={customEndDate}
                                onChange={(e) => setCustomEndDate(e.target.value)}
                            />
                        </FormControl>
                    </>
                )}
            </HStack>

            <SimpleGrid columns={[1, 2, 4]} spacing={5} mb={5}>
                {kpiData.map((kpi) => (
                    <Box bg="white" p={4} shadow="md" borderRadius="md" key={kpi.title}>
                        <Text fontSize="lg" fontWeight="bold">
                            {kpi.title}
                        </Text>
                        <Text fontSize="2xl" color="blue.500">
                            {kpi.value}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default KPISection;

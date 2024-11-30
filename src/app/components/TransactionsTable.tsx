'use client';

import { useState } from "react";
import { Box, Input, Button, Spinner, Text } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/table";
import { Select } from '@chakra-ui/select'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CSVLink } from "react-csv"; // For CSV export
import { jsPDF } from "jspdf"; // For PDF export
import BASE_URL from '@/config/api'; // Import the base URL


// Fetch transactions from the API
const fetchTransactions = async () => {
    const { data } = await axios.get(`${BASE_URL}/transactions`);
    return data;
};

type Transaction = {
    date: string;
    transactionId: string;
    amount: string;
    type: string;
    status: string;
};

const TransactionsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // Fetch transactions using React Query
    const { data: transactions, isLoading, error } = useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
    });

    console.log("Fetched Transactions:", transactions); // Debugging line to check the API data

    // Handle errors or loading state
    if (isLoading) {
        return (
            <Box textAlign="center" py={10}>
                <Spinner size="xl" />
                <Text>Loading transactions...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={10} color="red.500">
                <Text>Error loading transactions. Please try again later.</Text>
            </Box>
        );
    }

    // Ensure that transactions is an array before filtering
    const filteredTransactions = Array.isArray(transactions) ? transactions.filter((transaction: Transaction) => {
        // Adding checks to ensure properties are not undefined before calling .includes()
        const typeMatches = filterType ? (transaction.type?.toLowerCase()?.includes(filterType.toLowerCase()) || false) : true;
        const statusMatches = filterStatus ? (transaction.status?.toLowerCase()?.includes(filterStatus.toLowerCase()) || false) : true;
        const searchMatches = (transaction.transactionId?.includes(searchTerm) || transaction.date?.includes(searchTerm)) || false;

        return typeMatches && statusMatches && searchMatches;
    }) : [];

    // CSV Export - Prepare the CSV data
    const csvData = filteredTransactions.map((transaction) => ({
        Date: transaction.date,
        "Transaction ID": transaction.transactionId,
        Amount: transaction.amount,
        Type: transaction.type,
        Status: transaction.status,
    }));

    // PDF Export - Create the PDF document
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Transaction Log", 14, 16);
        let yPosition = 30;
        filteredTransactions.forEach((transaction, index) => {
            doc.text(`Date: ${transaction.date}`, 14, yPosition);
            doc.text(`Transaction ID: ${transaction.transactionId}`, 100, yPosition);
            doc.text(`Amount: ${transaction.amount}`, 180, yPosition);
            doc.text(`Type: ${transaction.type}`, 14, yPosition + 10);
            doc.text(`Status: ${transaction.status}`, 100, yPosition + 10);
            yPosition += 20; // Move to next line
        });
        doc.save("transaction_log.pdf");
    };

    return (
                <Box p={4} borderRadius="md" boxShadow="lg" overflowX="auto">
                    <Box display="flex" justifyContent="space-between" mb={4}>
                {/* Search input */}
                <Input
                    placeholder="Search by transaction ID or date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    w="300px"
                />
                {/* Filter by type */}
                <Select
                    placeholder="Filter by Type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    w="200px"
                >
                    <option value="Sale">Sale</option>
                    <option value="Expense">Expense</option>
                </Select>
                {/* Filter by status */}
                <Select
                    placeholder="Filter by Status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    w="200px"
                >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </Select>
                {/* Export Buttons */}
                <Box display="flex" gap={4}>
                    <Button onClick={generatePDF} colorScheme="green">Export to PDF</Button>
                    <CSVLink data={csvData} filename="transaction_log.csv">
                        <Button colorScheme="blue">Export to CSV</Button>
                    </CSVLink>
                </Box>
            </Box>

            <TableContainer>
              
                    <Table variant="striped" colorScheme="teal" width="100%">
                    <Thead>
                        <Tr>
                            <Th textAlign="left" fontWeight="bold">Date</Th>
                            <Th textAlign="left" fontWeight="bold">Transaction ID</Th>
                            <Th textAlign="left" fontWeight="bold">Amount</Th>
                            <Th textAlign="left" fontWeight="bold">Type</Th>
                            <Th textAlign="left" fontWeight="bold">Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredTransactions.map((transaction: Transaction, index) => (
                            <Tr key={index} _hover={{ bg: "gray.100" }}>
                                <Td>{transaction.date}</Td>
                                <Td>{transaction.transactionId}</Td>
                                <Td>{transaction.amount}</Td>
                                <Td>{transaction.type}</Td>
                                <Td>{transaction.status}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TransactionsTable;

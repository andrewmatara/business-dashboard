'use client'
import { ChakraProvider, Box } from "@chakra-ui/react";

import { Providers } from "./providers";
import Dashboard from "./dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
        <Providers>
            <Box bg="gray.100" minH="100vh">
                <Dashboard />
            </Box>
        </Providers>
        </QueryClientProvider>
    );
};

export default App;

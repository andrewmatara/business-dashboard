# Business Dashboard Project

## Table of Contents
1. [Project Overview](#project-overview)
2. [Thought Process](#thought-process)
3. [Challenges Faced & Solutions](#challenges-faced-solutions)
4. [Future Improvements](#future-improvements)
5. [Project Configuration](#project-configuration)
6. [How to Run the Project](#how-to-run-the-project)

---

## Project Overview

This is a business dashboard project that pulls and displays KPIs (Key Performance Indicators) and transaction data for monitoring business metrics. The dashboard is powered by React and utilizes APIs for data fetching, allowing for dynamic content, including charts, tables, and data filters.

---

## Thought Process

When designing this project, I aimed to create a clean, user-friendly interface for visualizing key business metrics. The main objectives were:

- **Data Fetching:** I used a mock API (JSON Server) to simulate a back-end for KPI and transaction data. The goal was to avoid hardcoding data, enabling dynamic updates based on a date range.
  
- **Responsiveness:** Ensuring that the dashboard works seamlessly across different devices (desktop, tablet, mobile). This was accomplished using Chakra UI, which offers responsive layout utilities.
  
- **Modular Design:** I aimed for a modular and reusable code structure. Components like KPI cards, tables, and charts were created independently to promote reuse.

- **Interactivity:** Implementing interactive elements like filters, date range selectors, and export functionality to make the dashboard more usable.

---

## Challenges Faced & Solutions

1. **Dynamic Data Fetching:**
   - **Challenge:** Initially, I was unsure how to integrate dynamic data fetching using React Query with a mock API.
   - **Solution:** I implemented the `useQuery` hook from React Query to handle data fetching, caching, and automatic re-fetching. The queries were set up to fetch KPI and transaction data, ensuring that the UI is updated automatically when data changes.

2. **Date Range Filtering:**
   - **Challenge:** The user needed to select a date range to filter KPIs and transactions. Implementing custom date ranges was tricky because of the dynamic nature of the data.
   - **Solution:** I used React state to manage the selected date range and applied it to filter the data accordingly. I also implemented custom date selectors for user-defined ranges.

3. **Exporting Data (CSV and PDF):**
   - **Challenge:** I needed to add functionality for exporting the displayed transaction data in both CSV and PDF formats.
   - **Solution:** I used `react-csv` for the CSV export and `jsPDF` for PDF generation. These libraries allowed me to quickly implement the export feature with minimal overhead.

4. **Handling Mock API Responses:**
   - **Challenge:** The mock API was returning data as an array of objects, but I needed to handle the data dynamically based on the selected date range and ensure it was correctly displayed.
   - **Solution:** I used conditional rendering in React based on the data shape and adjusted how I handled the fetched data to correctly map and display it.

---

## Future Improvements

- **Real-Time Data Integration:** Instead of using a mock API, I plan to integrate a real back-end or database to handle real-time data.
  
- **User Authentication & Authorization:** Implementing user authentication to allow users to log in and view personalized data.
  
- **Better Data Visualization:** Expanding the charts and graphs to include more visualizations like line charts, pie charts, and more interactive data components (e.g., drill-downs and tooltips).
  
- **Testing:** Writing comprehensive tests (unit and integration) to ensure the app behaves as expected and is maintainable.

- **Error Handling & UX:** Improving error messages and loading states to enhance user experience in case of API failures or slow responses.

---

## Project Configuration

### Base URL Configuration

To configure the **Base URL** for the API (which can be different depending on the environment you're working in), you can follow these steps:

1. **In the `.env` file**, set your base URL as follows:

2. **In the project code** (`src/api.js` file), you can access this environment variable as follows:

```js
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3002";
```
Business Dashboard Project
==========================

Setting up the Mock API
-----------------------

### 1\. Install JSON Server

To simulate a backend for your project, we use JSON Server to mock the API. You can install JSON Server as a development dependency by running the following command in your project directory:

    npm install json-server --save-dev

### 2\. Create `db.json`

In the root of your project (or in a suitable directory), create a file named `db.json`. This file will contain the mock data that will be served by the mock API. Here’s an example of what the file might look like:

    
    {
        "transactions": [
            {
                "date": "2024-11-01",
                "transactionId": "1234",
                "amount": "$500",
                "type": "Sale",
                "status": "Completed"
            },
            {
                "date": "2024-11-02",
                "transactionId": "1235",
                "amount": "$300",
                "type": "Expense",
                "status": "Pending"
            }
        ],
        "kpis": [
            {
                "range": "7",
                "data": [
                    { "title": "Total Sales", "value": "$10,000" },
                    { "title": "Total Expenses", "value": "$3,000" },
                    { "title": "Net Profit", "value": "$7,000" },
                    { "title": "Active Users", "value": "1,500" }
                ]
            }
        ]
    }
    

### 3\. Add a Start Script for JSON Server

To start the mock API server, add a script in your `package.json` to run JSON Server with the `db.json` file:

    
    "scripts": {
        "start-api": "json-server --watch db.json --port 3001"
    }
    

### 4\. Run the Mock API Server

In your terminal, run the following command to start the mock API server:

    npm run start-api

This will start the JSON Server at `http://localhost:3001`, and it will serve the data defined in the `db.json` file.

### 5\. Accessing the API

Now you can access your mock API through the following endpoints:

*   **Transactions Data**: `http://localhost:3002/transactions`
*   **KPI Data**: `http://localhost:3002/kpis`

### 6\. Use the Mock API in React

You can now fetch data from the mock API in your React components. Here's an example using `axios` to fetch transaction data:

    
    import axios from 'axios';
    
    const fetchTransactions = async () => {
        const response = await axios.get(`${BASE_URL}/transactions`);
        return response.data;
    };
    

How to Run the Project
----------------------

### 1\. Clone the Repository

Start by cloning the repository to your local machine. Run the following command in your terminal:

    git clone https://github.com/your-username/business-dashboard.git
    cd business-dashboard

### 2\. Install Dependencies

Next, install all the required dependencies for the project by running:

    npm install

### 3\. Run the Mock API Server

In a terminal window, start the mock API server by running:

    npm run start-api

### 4\. Run the React Development Server

In a different terminal window, start the React development server by running:

    npm start

This will launch the React app and open it in your default web browser.

### 5\. Access the App

Once the development server is up and running, open your web browser and go to:

    http://localhost:3000

This will display the business dashboard with dynamic KPIs and transaction data fetched from the mock API.


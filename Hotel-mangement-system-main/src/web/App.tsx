import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../web/layout";
import Dashboard from "../web/pages/dashboard";
import Tables from "../web/pages/tables";
import Test from "./pages/Test";
import Menu from "./pages/Menu";
import Orders from "./pages/orders";
import Parcels from "./pages/parcels";
import Expenses from "./pages/expenses";
import SettingsPage from "./pages/settings";
import { useEffect, useState } from "react";

export default function App() {
  const [tablesCount, setTablesCount] = useState(0);
  const [parcelsCount, setParcelsCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      // Retrieve tables and parcels data from local storage
      const tables = JSON.parse(localStorage.getItem("tables") || "[]");
      const parcels = JSON.parse(localStorage.getItem("parcels") || "[]");

      // Calculate the number of orders in process for tables
      const tablesInProcess = tables.filter(
        (table: any) => table.order.length > 0
      ).length;

      // Calculate the number of orders in process for parcels
      const parcelsInProcess = parcels.length;

      // Update the state with the counts
      setTablesCount(tablesInProcess);
      setParcelsCount(parcelsInProcess);
    };

    // Update counts initially
    updateCounts();

    // Set up an interval to update counts every 5 seconds
    const intervalId = setInterval(updateCounts, 4000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Router>
      <Layout tablesCount={tablesCount} parcelsCount={parcelsCount}>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/test" element={<Test />} />
          <Route path="/menu" element={<Menu></Menu>} />
          <Route path="/orders" element={<Orders></Orders>} />
          <Route path="/parcels" element={<Parcels></Parcels>} />
          <Route path="/expenses" element={<Expenses></Expenses>} />
          <Route path="/settings" element={<SettingsPage></SettingsPage>} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

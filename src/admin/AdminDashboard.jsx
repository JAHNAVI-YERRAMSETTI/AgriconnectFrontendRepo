import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalBuyers: 0,
    totalOrders: 0,
    totalProducts: 0
  });
  
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
    fetchOrderAnalytics();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${config.url}/api/admin/dashboard`);
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderAnalytics = async () => {
    try {
      const response = await axios.get(`${config.url}/api/admin/order-analytics/day`);
      
      // Transform object data to array format for the chart
      if (response.data && typeof response.data === 'object') {
        const dataArray = Object.entries(response.data).map(([date, count]) => ({
          date,
          count
        }));
        setOrderData(dataArray);
      } else {
        console.error("Expected an object with date-count pairs, but got:", response.data);
        setOrderData([]);
      }
    } catch (error) {
      console.error("Error fetching order analytics:", error);
      setOrderData([]);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px", color: "#1a3c34" }}>Loading dashboard data...</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#1a3c34" }}>Admin Dashboard</h2>
      
      {error && (
        <p style={{ color: "#721c24", textAlign: "center", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "5px" }}>{error}</p>
      )}
      
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        flexWrap: "wrap", 
        gap: "20px",
        marginBottom: "40px" 
      }}>
        {/* Stats Cards */}
        <StatCard title="Total Farmers" value={stats.totalFarmers} color="#1a3c34" />
        <StatCard title="Total Buyers" value={stats.totalBuyers} color="#1a3c34" />
        <StatCard title="Total Orders" value={stats.totalOrders} color="#1a3c34" />
        <StatCard title="Total Products" value={stats.totalProducts} color="#1a3c34" />
      </div>
      
      {/* Orders Chart */}
      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "8px", 
        padding: "20px",
        boxShadow: "0 2px 4px rgba(26, 60, 52, 0.1)" 
      }}>
        <h3 style={{ marginBottom: "20px", color: "#1a3c34" }}>Order Analytics</h3>
        
        {orderData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={orderData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#1a3c34" />
              <YAxis stroke="#1a3c34" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white",
                  border: "1px solid #1a3c34",
                  borderRadius: "4px"
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                name="Orders" 
                stroke="#B4D335" 
                activeDot={{ r: 8, fill: "#B4D335" }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ textAlign: "center", color: "#1a3c34" }}>No order data available</p>
        )}
      </div>
    </div>
  );
}

// Helper component for dashboard stats
function StatCard({ title, value, color }) {
  return (
    <div style={{ 
      flex: "1", 
      minWidth: "200px",
      backgroundColor: "white", 
      borderRadius: "8px", 
      padding: "20px",
      boxShadow: "0 2px 4px rgba(26, 60, 52, 0.1)",
      borderLeft: `4px solid ${color}`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 4px 8px rgba(26, 60, 52, 0.2)"
      }
    }}>
      <h3 style={{ 
        margin: "0 0 10px 0",
        color: "#1a3c34",
        fontSize: "1.1rem",
        fontWeight: "500"
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: "28px", 
        fontWeight: "bold", 
        margin: 0,
        color: "#B4D335"
      }}>
        {value}
      </p>
    </div>
  );
}
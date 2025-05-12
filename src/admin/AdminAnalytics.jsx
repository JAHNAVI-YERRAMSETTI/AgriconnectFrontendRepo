// src/admin/AdminAnalytics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminAnalytics() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/order-analytics/day")
      .then(res => {
        console.log("Data:", res.data);
        setChartData(res.data);
      })
      .catch(err => {
        console.error("Error fetching order analytics:", err);
      });
  }, []);

  return (
    <div>
      <h2>Order Analytics</h2>
      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    </div>
  );
}

export default AdminAnalytics;

import React, { useEffect, useState } from 'react';
import API from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      const { data } = await API.get('/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded shadow">
          <h3 className="text-sm text-gray-500">Users</h3>
          <p className="text-2xl font-semibold">{stats.totalUsers}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-sm text-gray-500">Products</h3>
          <p className="text-2xl font-semibold">{stats.totalProducts}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-sm text-gray-500">Orders</h3>
          <p className="text-2xl font-semibold">{stats.totalOrders}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h3 className="text-sm text-gray-500">Total Sales</h3>
          <p className="text-2xl font-semibold">₹{stats.totalSales}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <a href="/admin/orders" className="bg-blue-600 text-white px-4 py-2 rounded">Manage Orders</a>
        <a href="/admin/products" className="bg-green-600 text-white px-4 py-2 rounded">Manage Products</a>
        <a href="/admin/users" className="bg-gray-700 text-white px-4 py-2 rounded">Manage Users</a>
      </div>
    </div>
  );
};

export default AdminDashboard;

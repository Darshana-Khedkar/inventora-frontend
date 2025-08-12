import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/orders");
      setOrders(data);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`/orders/${orderId}/status`, { status });
      toast.success("Order status updated");
      fetchOrders(); // Refresh list
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Export orders as CSV
  const exportCSV = async () => {
    try {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;

      const res = await axios.get("/admin/orders/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      toast.error("Failed to export orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📥 Export CSV
        </button>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">
                  {order.userId?.name} <br />
                  <small>{order.userId?.email}</small>
                </td>
                <td className="p-2 border">₹{order.totalAmount}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;

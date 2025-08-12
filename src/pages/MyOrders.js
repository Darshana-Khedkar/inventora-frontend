import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../redux/slices/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();

  // Ensure we handle undefined state safely
  const ordersState = useSelector((state) => state.orders) || {};
  const authState = useSelector((state) => state.auth) || {};

  const { orders = [], loading = false, error = null } = ordersState;
  const { userInfo } = authState;

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(getUserOrders(userInfo._id));
    }
  }, [dispatch, userInfo]);

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded text-white text-xs font-semibold";
    switch (status) {
      case "Pending":
        return <span className={`${base} bg-yellow-500`}>Pending</span>;
      case "Shipped":
        return <span className={`${base} bg-blue-500`}>Shipped</span>;
      case "Delivered":
        return <span className={`${base} bg-green-500`}>Delivered</span>;
      default:
        return <span className={`${base} bg-gray-500`}>{status}</span>;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 && !loading ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="p-2 border break-all">{order._id}</td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-2 border font-semibold">
                    ₹{order.totalAmount}
                  </td>
                  <td className="p-2 border">{getStatusBadge(order.status)}</td>
                  <td className="p-2 border">
                    {order.products.map((p) => (
                      <div key={p._id} className="mb-1">
                        <span className="font-medium">{p.productId?.name}</span>{" "}
                        x {p.quantity} — ₹{p.productId?.price}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

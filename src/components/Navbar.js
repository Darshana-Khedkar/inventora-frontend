import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate import
import { useSelector, useDispatch } from "react-redux"; // ✅ Added useDispatch import
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("cart");
    navigate("/login");
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Left side */}
        <div className="flex items-center gap-6">
          <Link to="/products" className="font-bold">Inventora</Link>
          <Link to="/products">Products</Link>

          {userInfo?.role === "user" && <Link to="/my-orders">My Orders</Link>}
          {userInfo?.role === "admin" && <Link to="/admin/orders">Manage Orders</Link>}
          {userInfo?.role === "admin" && <Link to="/admin/dashboard">Admin</Link>}
          {userInfo && <Link to="/profile">Profile</Link>}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {userInfo?.role === "user" && (
            <Link to="/cart" className="relative">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {!userInfo ? (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import AdminProductList from './pages/AdminProductList';
import EditProduct from './pages/EditProduct';
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import AdminUsers from './pages/AdminUsers';


function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<div className="p-10">Welcome to Dashboard!</div>} />
        <Route path="/products" element={<ProductList />} />

        {/* Admin Routes */}
//        <Route path="/admin/products" element={<AdminProductList />} />
//        <Route path="/admin/products/add" element={<AddProduct />} />

//        <Route path="/admin/products/:id/edit" element={<EditProduct />} />

//        <Route path="/cart" element={<CartPage />} />
//        <Route path="/checkout" element={<CheckoutPage />} />
//        <Route path="/my-orders" element={<MyOrders />} />
//        <Route path="/admin/orders" element={<AdminOrders />} />


        {/* Protected user pages */}
        <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        {/* Admin Routes - require admin */}
        <Route path="/admin/dashboard" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/products" element={<PrivateRoute adminOnly><AdminProductList /></PrivateRoute>} />
        <Route path="/admin/products/add" element={<PrivateRoute adminOnly><AddProduct /></PrivateRoute>} />
        <Route path="/admin/products/:id/edit" element={<PrivateRoute adminOnly><EditProduct /></PrivateRoute>} />
        <Route path="/admin/orders" element={<PrivateRoute adminOnly><AdminOrders /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute adminOnly><AdminUsers /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;

// src/pages/AddProduct.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.products);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProduct(formData));
    navigate("/admin/products");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        submitText="Add Product"
      />
    </div>
  );
};

export default AddProduct;

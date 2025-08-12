// src/pages/EditProduct.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "../redux/slices/productSlice";
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const product = products.find((p) => p._id === id);
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        image: product.image || "",
      });
    }
  }, [id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct({ id, updatedData: formData }));
    navigate("/admin/products");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        submitText="Update Product"
      />
    </div>
  );
};

export default EditProduct;

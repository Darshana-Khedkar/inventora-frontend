import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Always default to [] to avoid .length errors
  const {
    products = [],
    loading,
    error,
    totalPages = 1,
    currentPage = 1,
  } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id)).then(() => {
        // Refresh list after delete
        dispatch(getProducts({ page: currentPage, search }));
      });
    }
  };

  const handlePageChange = (page) => {
    dispatch(getProducts({ page, search }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Loader & Error */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      {!loading && products.length > 0 ? (
        <>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">₹{product.price}</td>
                  <td className="p-2 border">{product.stock}</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/${product._id}/edit`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        !loading && <p>No products found.</p>
      )}
    </div>
  );
};

export default AdminProductList;

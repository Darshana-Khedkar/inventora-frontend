// src/components/ProductForm.js
import React from "react";

const ProductForm = ({ formData, setFormData, handleSubmit, loading, submitText }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded p-2"
      ></textarea>

      <div>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover border rounded"
          />
        )}
      </div>

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={formData.stock}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
};

export default ProductForm;

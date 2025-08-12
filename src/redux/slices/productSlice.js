import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/axiosInstance';

// ✅ Fetch products with pagination & search
export const getProducts = createAsyncThunk(
  'products/getAll',
  async ({ page = 1, search = '' } = {}, thunkAPI) => {
    try {
      const res = await API.get(`/products?page=${page}&search=${search}`);
      return res.data; // { products, totalPages, currentPage }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// ✅ Create product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      const { userInfo } = thunkAPI.getState().auth;
      const res = await API.post('/products', productData, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create product');
    }
  }
);

// ✅ Update product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const { userInfo } = thunkAPI.getState().auth;
      const res = await API.put(`/products/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
    }
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      const { userInfo } = thunkAPI.getState().auth;
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;

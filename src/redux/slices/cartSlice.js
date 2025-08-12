import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartFromStorage,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) =>
        x._id === id ? { ...x, qty } : x
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQty } =
  cartSlice.actions;
export default cartSlice.reducer;

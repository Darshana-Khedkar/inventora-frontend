import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

//  const updateQuantity = (id, qty) => {
//    const updated = cartItems.map((item) =>
//      item.productId === id ? { ...item, quantity: qty } : item
//    );
//    setCartItems(updated);
//    localStorage.setItem("cart", JSON.stringify(updated));
//    window.dispatchEvent(new Event("cartUpdated"));
//  };

  const updateQuantity = (id, qty) => {
    const updated = cartItems.map((item) =>
      item.productId === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

//  const removeItem = (id) => {
//    const updated = cartItems.filter((item) => item.productId !== id);
//    setCartItems(updated);
//    localStorage.setItem("cart", JSON.stringify(updated));
//    window.dispatchEvent(new Event("cartUpdated"));
//  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.productId !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!userInfo) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
//      const payload = {
//        userId: userInfo._id,
//        products: cartItems.map((item) => ({
//          productId: item.productId,
//          quantity: item.quantity,
//        })),
//      };
//
//      await axiosInstance.post("/orders", payload);

      const payload = {
        userId: userInfo._id,
        products: cartItems.map((item) => ({
          productId: item.productId, // ✅ now this will exist
          quantity: item.quantity
        }))
      };
      await axiosInstance.post("/orders", payload);


      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/orders"); // Redirect to orders page
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full border mb-6">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Subtotal</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td className="p-2 border flex items-center gap-2">
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    {item.name}
                  </td>
                  <td className="p-2 border">₹{item.price}</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="w-16 border p-1 rounded"
                      onChange={(e) =>
                        updateQuantity(item.productId, Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="p-2 border">
                    ₹{item.price * item.quantity}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{totalAmount}</h2>
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;




//import React from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { removeFromCart, updateQty, clearCart } from "../redux/slices/cartSlice";
//
//const CartPage = () => {
//  const dispatch = useDispatch();
//  const { cartItems } = useSelector((state) => state.cart);
//
//  const totalPrice = cartItems.reduce(
//    (acc, item) => acc + item.price * item.qty,
//    0
//  );
//
//  return (
//    <div className="p-6 max-w-4xl mx-auto">
//      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
//
//      {cartItems.length === 0 ? (
//        <p>Your cart is empty.</p>
//      ) : (
//        <>
//          <table className="w-full border mb-4">
//            <thead>
//              <tr className="bg-gray-200 text-left">
//                <th className="p-2 border">Product</th>
//                <th className="p-2 border">Price</th>
//                <th className="p-2 border">Quantity</th>
//                <th className="p-2 border">Total</th>
//                <th className="p-2 border">Action</th>
//              </tr>
//            </thead>
//            <tbody>
//              {cartItems.map((item) => (
//                <tr key={item._id}>
//                  <td className="p-2 border">{item.name}</td>
//                  <td className="p-2 border">₹{item.price}</td>
//                  <td className="p-2 border">
//                    <input
//                      type="number"
//                      min="1"
//                      value={item.qty}
//                      onChange={(e) =>
//                        dispatch(updateQty({ id: item._id, qty: Number(e.target.value) }))
//                      }
//                      className="border p-1 w-16"
//                    />
//                  </td>
//                  <td className="p-2 border">₹{item.price * item.qty}</td>
//                  <td className="p-2 border">
//                    <button
//                      onClick={() => dispatch(removeFromCart(item._id))}
//                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                    >
//                      Remove
//                    </button>
//                  </td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//
//          <div className="flex justify-between items-center">
//            <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
//            <div className="flex gap-2">
//              <button
//                onClick={() => dispatch(clearCart())}
//                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//              >
//                Clear Cart
//              </button>
//              <button
//                onClick={() => navigate("/checkout")}
//                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//              >
//                Proceed to Checkout
//              </button>
//            </div>
//          </div>
//        </>
//      )}
//    </div>
//  );
//};
//
//export default CartPage;

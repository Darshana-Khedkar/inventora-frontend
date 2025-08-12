import React from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../utils/axiosInstance";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    try {
      const orderPayload = {
        products: cartItems.map(item => ({
          productId: item._id,
          quantity: item.qty
        })),
        userId: userInfo._id, // from logged-in user
      };

      await API.post("/orders", orderPayload, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      alert("✅ Order placed successfully!");
      dispatch(clearCart());
      navigate("/my-orders");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Price: ₹{totalPrice}</p>

      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;

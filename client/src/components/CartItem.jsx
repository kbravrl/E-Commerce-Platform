import { useState } from "react";
import axios from "axios";
import trashIcon from "../assets/icons/trash.svg";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const CartItem = ({ item, onRemove, handleQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const token = localStorage.getItem("token");

  const updateQuantity = async (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity < 1) return;
    if (newQuantity > item.product.inventory) return;
    try {
      await axios.put(
        `${baseUrl}/cartItems/products/${item.product.id}/cartItems?quantity=${newQuantity}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuantity(newQuantity);
      handleQuantityChange();
    } catch (error) {
      console.error("Quantity update failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
      <img
        src={`http://localhost:9191${item.product.images[0]?.downloadUrl}`}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h6 className="font-medium">{item.product.name}</h6>
        <p className="text-gray-500 text-sm">{item.product.description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(-1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
        >
          −
        </button>
        <span className="w-10 text-center">{quantity}</span>
        <button
          onClick={() => updateQuantity(1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <div className="w-20 text-right font-semibold">${item.product.price}</div>
      <button
        onClick={() => onRemove(item.product.id)}
        className="p-1 hover:bg-red-100 rounded"
        title="Remove item"
      >
        <img src={trashIcon} alt="Remove" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItem;

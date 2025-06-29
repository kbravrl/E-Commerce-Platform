import { useState } from "react";
import axios from "axios";
import trashIcon from "../assets/icons/trash.svg";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  
  const token = localStorage.getItem("token");

  const updateQuantity = async (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity < 1) return;
    try {
      await axios.put(
        `${baseUrl}/cartItems/item/${item.product.id}/update?quantity=${newQuantity}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuantity(newQuantity);
      onQuantityChange();
    } catch (error) {
      console.error("Quantity update failed:", error);
    }
  };

  return (
    <>
      <div className="product-card p-3 shadow-sm">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={`http://localhost:9191${item.product.images[0].downloadUrl}`}
              alt={item.product.name}
              className="product-image"
            />
          </div>
          <div className="col-md-4">
            <h6 className="mb-1">{item.product.name}</h6>
            <p className="text-muted mb-0">{item.product.description}</p>
          </div>
          <div className="col-md-3">
            <div className="col-md-3">
              <div className="d-flex align-items-center gap-2">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(-1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  readOnly
                />
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <span className="fw-bold">{`$${item.product.price}`}</span>
          </div>
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <button
              className="btnbtn p-0 border-0 bg-transparent"
              onClick={() => onRemove(item.product.id)}
              title="Remove item"
            >
              <img
                className="mb-4"
                src={trashIcon}
                alt="Trash Icon"
                width="16"
                height="16"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import CartItem from "../../components/CartItem";
import CartTotalPanel from "../../components/CartTotalPanel";
import "./Cart.css";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const shipping = 20.0;

  const token = localStorage.getItem("token");
  const fetchCart = () => {
    axios
      .get(`${baseUrl}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setTotalAmount(response.data.data.totalAmount);
        setCartItems(response.data.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/cartItems/item/${productId}/remove`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
    } catch (error) {
      alert("Item could not be removed", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-wrapper">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Shopping Cart</h4>
              </div>
              <div className="d-flex flex-column gap-3">
                {cartItems.map((cartItem) => (
                  <CartItem
                    key={cartItem.id}
                    item={cartItem}
                    onRemove={handleRemove}
                    onQuantityChange={fetchCart}
                  />
                ))}
              </div>
            </div>
            <CartTotalPanel shipping={shipping} cartTotalAmount={totalAmount} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

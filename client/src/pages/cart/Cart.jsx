import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import CartItem from "../../components/CartItem";
import CartTotalPanel from "../../components/CartTotalPanel";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shipping, setShipping] = useState(0.0);

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
        const cartData = response.data?.data;
        setCartItems(cartData?.items || []);
        setTotalAmount(cartData?.totalAmount ?? 0);
        setShipping(cartData?.items?.length > 0 ? 20 : 0);
      })
      .catch((error) => {
        console.error("Cart could not be received:", error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/cartItems/products/${productId}/cartItems`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCart();
    } catch (error) {
      alert("Item could not be removed", error);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) {
      return;
    }
    try {
      await axios.delete(`${baseUrl}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchCart();
    } catch (error) {
      console.error("Cart could not be cleared", error);
      alert("Cart could not be cleared");
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.post(`${baseUrl}/orders/create`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert("Order created successfully!");
      fetchCart();
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Order could not be created.");
    }
  };

  const handleQuantityChange = () => {
    axios
      .get(`${baseUrl}/carts/total-price`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setTotalAmount(response.data.data ?? 0);
      })
      .catch((error) => {
        console.error("Total price could not be received:", error);
      }); 
    };

  return (
     <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={handleRemove}
                      handleQuantityChange={handleQuantityChange}
                    />
                  ))}
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-2 mt-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium transform hover:-translate-y-0.5 transition"
                  >
                    Clear Cart
                  </button>
                </>
              ) : (
                <p>Cart is empty</p>
              )}
            </div>
            <CartTotalPanel
              cartTotalAmount={totalAmount}
              shipping={shipping}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

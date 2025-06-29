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
      await axios.delete(`${baseUrl}/carts/clear`, {
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
    });

    alert("Order created successfully!");
    fetchCart();
  } catch (error) {
    console.error("Order creation failed:", error);
    alert("Order could not be created.");
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
                    handleQuantityChange={fetchCart}
                  />
                ))}
              </div>
              <div className="text-start mt-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClearCart}
                >
                  Clean Cart
                </button>
              </div>
            </div>
            <CartTotalPanel shipping={shipping} cartTotalAmount={totalAmount} handleCheckout={handleCheckout}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import CartItem from "../../components/CartItem";
import "./Cart.css";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/carts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
      .then((response) => {
        console.log(response.data.data.items);
        setCartItems(response.data.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

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
                {cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem}/>))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="summary-card p-4 shadow-sm">
                <h5 className="mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Subtotal</span>
                  <span>$479.97</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Shipping</span>
                  <span>$5.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold">$458.97</span>
                </div>
                <br />
                <button className="btn btn-primary checkout-btn w-100 mb-3">
                  Proceed to Checkout
                </button>
                <div className="d-flex justify-content-center gap-2">
                  <i className="bi bi-shield-check text-success"></i>
                  <small className="text-muted">Secure checkout</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

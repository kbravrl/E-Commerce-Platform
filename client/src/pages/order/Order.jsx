import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import OrderDetails from "../../components/OrderDetails";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseUrl}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrderDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Orders could not be received:", error);
      });
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4">
          {orderDetails.map((orderSummary) => (
            <div key={orderSummary.id}>
              <OrderDetails orderSummary={orderSummary} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Order;

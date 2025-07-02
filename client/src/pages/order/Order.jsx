import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import OrderDetails from "../../components/OrderDetails";
import "./Order.css";
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
      .then((res) => {
        console.log(res.data.data);
        setOrderDetails(res.data.data);
      })
      .catch((err) => {
        console.error("Siparişler alınamadı:", err);
      });
  }, [token]);

  return (
    <>
      <Navbar />
      {orderDetails.map((orderSummary) => (
        <div key={orderSummary.id} className="card-body">
          <OrderDetails orderSummary={orderSummary} />
        </div>
      ))}
    </>
  );
};

export default Order;

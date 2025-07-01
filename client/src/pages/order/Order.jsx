import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import OrderSummaryDetails from "../../components/OrderDetails";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Order = () => {
  const [orderSummaryDetails, setOrderSummaryDetails] = useState([]);
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
        setOrderSummaryDetails(res.data.data);
      })
      .catch((err) => {
        console.error("Siparişler alınamadı:", err);
      });
  }, [token]);

  return (
    <>
      <Navbar />
      {orderSummaryDetails.map((orderSummary) => (
        <div key={orderSummary.id} className="card-body">
          <OrderSummaryDetails orderSummary={orderSummary} />
        </div>
      ))}
    </>
  );
};

export default Order;

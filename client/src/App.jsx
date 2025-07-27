import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Products from "./pages/product/Products";
import ProductList from './pages/product/ProductList';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import User from "./pages/user/User";
import ProtectedRoute from './components/ProtectedRoute';

import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const App = () => {
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        client.subscribe("/topic/products", (message) => {
          const notification = JSON.parse(message.body);
          console.log("📢 New Notification:", notification);
        });
      },
    });

    client.activate();

    // Close the connection if the component is unmounted
    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={< Register />} />
        <Route element={<ProtectedRoute redirectPath="/" />}>
          <Route path="/products" element={<Products />} />
          <Route path="/category/:categoryName" element={<ProductList />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;

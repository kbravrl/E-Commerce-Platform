import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RegisterSms from "./pages/register/RegisterSms";
import Products from "./pages/product/Products";
import ProductList from "./pages/product/ProductList";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import User from "./pages/user/User";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-sms" element={<RegisterSms />} />
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

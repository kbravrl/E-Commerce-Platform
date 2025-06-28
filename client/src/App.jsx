import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login/Login";
import Products from "./pages/product/Products";
import ProductList from './pages/product/ProductList';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/products' element={<Products/>} />
          <Route path='/category/:categoryName' element={<ProductList/>} />
          <Route path='/orders' element={<Order/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/ProductCard";
import "./Product.css";

const baseUrl = import.meta.env.VITE_API_BASE_URL

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/all`)
      .then(response => { 
        setProducts(response.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${baseUrl}/cartItems/add?productId=${productId}&quantity=${1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials : true
        }
      )
      .then(() => {
        alert("Product added to cart");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-5">Our Products</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map(product => (<Card key={product.id} product={product} handleAddToCart={handleAddToCart}/>))}
        </div>
      </div>
    </>
  );
};

export default Product;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "..//../components/Navbar";
import ProductCard from "../../components/ProductCard";
import "./Product.css";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductList = () => {
  const { categoryName } = useParams();
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/by-category/${categoryName}`)
      .then((response) => {
        setProductsByCategory(response.data.data);
      })
      .catch((error) => console.error(error));
  }, [categoryName]);

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${baseUrl}/cartItems?productId=${productId}&quantity=${1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        alert("Product added to cart");
      })
      .catch((error) => {
        console.error("Error adding Product:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-5">{categoryName}</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productsByCategory.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `/api/v1/cartItems?productId=${productId}&quantity=${1}`,
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
        console.error("Error adding product:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

const ProductList = () => {
  const { categoryName } = useParams();
  const [productsByCategory, setProductsByCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/products/by-category/${categoryName}`)
      .then((response) => {
        setProductsByCategory(response.data.data);
      })
      .catch((error) => console.error(error));
  }, [categoryName]);

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
        console.error("Error adding Product:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            {categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsByCategory.map((product) => (
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

export default ProductList;

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
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

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-5">Our Products</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map(product => (<Card key={product.id} product={product}/>))}
        </div>
      </div>
    </>
  );
};

export default Product;

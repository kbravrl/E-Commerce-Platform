import { useReducer, useState } from "react";
import axios from "axios";
import { initialState , productReducer } from "../hooks/productAddReducer";
import ProductForm from "./ProductForm";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductAdd = () => {
  const [product, dispatch] = useReducer(productReducer, initialState);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      payload: { field: e.target.id, value: e.target.value },
    });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const productResponse = await axios.post(
        `${baseUrl}/products`,
        {
          name: product.name,
          brand: product.brand,
          price: parseFloat(product.price),
          inventory: parseInt(product.inventory),
          description: product.description,
          category: { name: product.category },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const productId = productResponse.data.data.id;

      if (images.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append("files", images[i]);
        }
        formData.append("productId", productId);

        await axios.post(`${baseUrl}/images`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      alert("Product added successfully!");
      dispatch({ type: "RESET" });
      setImages([]);
    } catch (err) {
      console.error("Error adding product or uploading images:", err);
      alert("Failed to add product.")
    }
  };

  return (
    <form onSubmit={addProduct}>
      <legend className="text-xl font-semibold text-gray-800">Add Product</legend>
      <ProductForm handleChange={handleChange} handleFileChange={handleFileChange} />
      <button type="submit" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium px-7 py-2 mb-3 rounded-md transition">
        Submit
      </button>
    </form>
  );
};

export default ProductAdd;

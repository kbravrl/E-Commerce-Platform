import { useReducer, useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import { initialState, productReducer } from "../hooks/productEditReducer";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductEdit = () => {
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

  const editProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${baseUrl}/products/${product.id}`,
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

      if (images.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append("files", images[i]);
        }
        formData.append("productId", product.id);

        await axios.put(`${baseUrl}/images`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Product uploaded successfully!");
      }
      dispatch({ type: "RESET" });
      setImages([]);
    } catch (err) {
      console.error("Error updating product or uploading images:", err);
      alert("Failed to edit product.")
    }
  };

  return (
    <form onSubmit={editProduct}>
      <legend className="text-xl font-semibold text-gray-800">Edit Product</legend>
      <InputField
        id="id"
        label="Product ID"
        type="number"
        onChange={handleChange}
      />
      <InputField id="name" label="Name" type="text" onChange={handleChange} />
      <InputField
        id="brand"
        label="Brand"
        type="text"
        onChange={handleChange}
      />
      <div className="mb-3">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          className="form-control"
          onChange={handleChange}
          min="0"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inventory">Inventory</label>
        <input
          type="number"
          id="inventory"
          className="form-control"
          onChange={handleChange}
          min="0"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control"
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <InputField
        id="category"
        label="Category"
        type="text"
        onChange={handleChange}
      />
      <div className="mb-3">
        <label htmlFor="images">Images (optional)</label>
        <input
          type="file"
          id="images"
          className="form-control"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium px-7 py-2 mb-3 rounded transition">
        Submit
      </button>
    </form>
  );
};

export default ProductEdit;

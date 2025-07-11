import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductEdit = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    inventory: "",
    description: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
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

      setProduct({
        id: "",
        name: "",
        brand: "",
        price: "",
        inventory: "",
        description: "",
        category: "",
      });
      setImages([]);
    } catch (err) {
      console.error("Error updating product or uploading images:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Edit Product</legend>
      <div className="mb-3">
        <InputField
          id="id"
          label="Product ID"
          type="number"
          placeholder="Product ID to update"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          id="name"
          label="Name"
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          id="brand"
          label="Brand"
          type="text"
          placeholder="Product Brand"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          className="form-control"
          placeholder="Product Price"
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
          placeholder="Product Inventory"
          onChange={handleChange}
          min="0"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control"
          placeholder="Product Description"
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <InputField
          id="category"
          label="Category"
          type="text"
          placeholder="Category Name"
          onChange={handleChange}
        />
      </div>
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
      <button type="submit" className="btn btn-dark">
        Update
      </button>
    </form>
  );
};

export default ProductEdit;

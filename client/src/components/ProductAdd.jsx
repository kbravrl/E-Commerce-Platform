import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductAdd = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    inventory: "",
    description: "",
    category: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseUrl}/products/add`,
        {
          id: product.id,
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
      )
      .then(() => {
        alert("Product added successfully!");
        setProduct({
          id: "",
          name: "",
          brand: "",
          price: "",
          inventory: "",
          description: "",
          category: "",
        });
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        alert("Failed to add product. " + (err.response?.data?.message || ""));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Add Product</legend>
      <div className="mb-3">
        <InputField
          id="id"
          label="Id"
          type="number"
          placeholder="Product ID"
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
        <div className="mb-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Product Description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
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

      <button type="submit" className="btn btn-dark">
        Submit
      </button>
    </form>
  );
};

export default ProductAdd;

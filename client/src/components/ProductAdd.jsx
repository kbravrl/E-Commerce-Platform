import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductAdd = () => {
  const [product, setProduct] = useState({
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

        alert("Product added successfully!");
      }

      setProduct({
        name: "",
        brand: "",
        price: "",
        inventory: "",
        description: "",
        category: "",
      });
      setImages([]);

    } catch (err) {
      console.error("Error adding product or uploading images:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>Add Product</legend>
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
        <label htmlFor="images">Images</label>
        <input
          type="file"
          id="images"
          className="form-control"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="btn btn-dark">
        Submit
      </button>
    </form>
  );
};

export default ProductAdd;

import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DeleteProduct = () => {
  const [productId, setProductId] = useState("");

  const productDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product deleted successfully!");
      setProductId("");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <form onSubmit={productDelete}>
      <legend>Delete Product</legend>
      <InputField
        id={"productId"}
        label={"Product ID"}
        type={"text"}
        onChange={(e) => setProductId(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-dark">
        Submit
      </button>
    </form>
  );
};
export default DeleteProduct;

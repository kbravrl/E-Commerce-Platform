import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const ProductDelete = () => {
  const [productId, setProductId] = useState("");

  const deleteProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/products/${productId}`, {
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
    <form onSubmit={deleteProduct}>
     <legend className="text-xl font-semibold text-gray-800">Delete Product</legend>
      <InputField
        id={"productId"}
        label={"Product ID"}
        type={"text"}
        onChange={(e) => setProductId(e.target.value)}
        required
      />
      <button type="submit" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium px-7 py-2 rounded-md transition">
        Submit
      </button>
    </form>
  );
};
export default ProductDelete;

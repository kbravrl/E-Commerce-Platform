import React from "react";

const ProductCard = ({ product, handleAddToCart }) => {
  const imageUrl = `http://localhost:9191${product.images[0].downloadUrl}`;

   return (
    <div className="h-full">
      <div className="
          flex flex-col h-full 
          bg-gray-800 text-white 
          rounded-lg overflow-hidden 
          transform hover:scale-105 transition duration-300 ease-in-out
        ">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover bg-white"
        />
        <div className="p-6 flex flex-col flex-grow">
          <h5 className="text-xl font-semibold">{product.name}</h5>
          <p className="text-sm mt-2 flex-grow">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg">{product.price}$</span>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="
                px-3 py-1 border border-white 
                bg-gray-800 hover:bg-white hover:text-gray-800 
                text-white rounded-3xl transition
              "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
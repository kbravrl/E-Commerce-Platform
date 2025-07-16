const CartTotalPanel = ({ cartTotalAmount, shipping, handleCheckout }) => {
  return (
    <div className="mt-8 lg:mt-0 lg:sticky lg:top-20">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h5 className="text-lg font-semibold">Order Summary</h5>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${cartTotalAmount}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-gray-800">
          <span>Total</span>
          <span>${cartTotalAmount + shipping}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="
            w-full py-2 rounded text-white font-medium
            bg-indigo-600 hover:bg-indigo-700
            transform hover:-translate-y-0.5 transition
          "
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotalPanel;

const OrderItemDetail = ({ orderItem }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded shadow">
      <img
        src={`http://localhost:9191${orderItem.productImages[0].downloadUrl}`}
        alt={orderItem.productName}
        className="w-20 h-20 object-cover border mb-3 rounded"
      />
      <div className="text-center">
        <p className="mb-1 font-semibold">{orderItem.productName}</p>
        <p className="mb-1 text-gray-600">{orderItem.productBrand}</p>
        <p className="mb-1 text-gray-500">${orderItem.price}</p>
        <p className="mb-1">Quantity: {orderItem.quantity}</p>
      </div>
    </div>
  );
};

export default OrderItemDetail;

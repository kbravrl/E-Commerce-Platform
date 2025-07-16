const OrderSummaryDetail = ({ orderSummary }) => {
  return (
    <div className="mb-6 bg-white rounded shadow">
      <div className="flex flex-wrap text-center p-4">
        <div className="w-full sm:w-1/2 md:w-1/4 mb-2 px-2">
          <span className="font-semibold block">ORDER DATE</span>
          {orderSummary.orderDate}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 mb-2 px-2">
          <span className="font-semibold block">STATUS</span>
          {orderSummary.statusDisplayName}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 mb-2 px-2">
          <span className="font-semibold block">ESTİMATED DELIVERY</span>
          {orderSummary.estimatedDeliveryDate}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 mb-2 px-2">
          <span className="font-semibold block">TOTAL AMOUNT</span>
          ${orderSummary.totalAmount}
        </div>
      </div>
      <hr className="border-gray-200" />
    </div>
  );
};

export default OrderSummaryDetail;

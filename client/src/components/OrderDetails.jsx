import OrderSummaryDetail from "./OrderSummaryDetail";
import OrderItemDetail from "./OrderItemDetails";

const OrderDetails = ({ orderSummary }) => {
  const items = orderSummary.items;

  return (
    <div className="container mx-auto my-5">
      <div className="bg-white shadow rounded overflow-hidden">
        <div className="h-2 bg-gray-800" />
        <div className="p-6">
          <OrderSummaryDetail orderSummary={orderSummary} />
          <div className="flex flex-wrap -mx-3">
            {items.map((item) => (
              <div key={item.productId} className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6 transform hover:-translate-y-0.5 transition">
                <OrderItemDetail orderItem={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="h-2 bg-yellow-400" />
      </div>
    </div>
  );
};

export default OrderDetails;


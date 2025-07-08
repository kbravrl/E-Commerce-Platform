import OrderSummaryDetail from "./OrderSummaryDetail";
import OrderItemDetail from "./OrderItemDetails";

const OrderDetails = ({ orderSummary }) => {
  const OrderItems = orderSummary.items;

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header bg-dark" />
        <OrderSummaryDetail orderSummary={orderSummary} />
        <div className="row">
          {OrderItems.map((orderItem) => (
            <div className="col-md-4 mb-3" key={orderItem.productId}>
              <OrderItemDetail orderItem={orderItem} />
            </div>
          ))}
        </div>
        <div className="card-header bg-warning" />
      </div>
    </div>
  );
};

export default OrderDetails;

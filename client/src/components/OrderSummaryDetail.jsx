const OrderSummary = ({ orderSummary }) => {
  return (
    <div className="card mb-4">
      <div className="card-body row text-center">
        <div className="col-md-3 mb-2">
          <strong>Order Date:</strong>
          <br />
          {orderSummary.orderDate}
        </div>
        <div className="col-md-3 mb-2">
          <strong>Status:</strong>
          <br />
          {orderSummary.status}
        </div>
        <div className="col-md-3 mb-2">
          <strong>Estimated Delivery:</strong>
          <br />
          {orderSummary.orderDate}
        </div>
        <div className="col-md-3 mb-2">
          <strong>Total Amount</strong>
          <br />
          {`$${orderSummary.totalAmount}`}
        </div>
      </div>
      <hr />
    </div>
  );
};
export default OrderSummary;

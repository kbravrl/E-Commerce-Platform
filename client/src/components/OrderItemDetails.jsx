const OrderItemDetail = ({ orderItem }) => {
  return (
    <div className="d-flex flex-column align-items-center mb-4">
      <img
        src={`http://localhost:9191${orderItem.productImages[0].downloadUrl}`}
        className="img-fluid border mb-2"
        style={{ width: "80px", height: "50px" }}
        alt={orderItem.productName}
      />
      <div className="text-center">
        <p className="mb-1">
          <strong>{orderItem.productName}</strong>
        </p>
        <p className="mb-1">{orderItem.productBrand}</p>
        <small className="text-muted">{`$${orderItem.price}`}</small>
        <p className="mb-1">{`Quantity: ${orderItem.quantity}`}</p>
      </div>
    </div>
  );
};

export default OrderItemDetail;

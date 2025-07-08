const OrderLists = ({ orders }) => {
  return (
    <div className="mt-4">
      <h5>Orders</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Status</th>
            <th>Estimated Delivery</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderDate}</td>
              <td>{order.statusDisplayName}</td>
              <td>{order.estimatedDeliveryDate}</td>
              <td>{`$${order.totalAmount}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderLists;

const OrderLists = ({ orders }) => {
  return (
    <div className="mt-4">
      <h5 className="text-lg font-semibold mb-2 ml-4 text-gray-800">Orders</h5>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Order Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Estimated Delivery
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 text-sm text-gray-800">
                  {order.orderDate}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {order.statusDisplayName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {order.estimatedDeliveryDate}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  ${order.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderLists;

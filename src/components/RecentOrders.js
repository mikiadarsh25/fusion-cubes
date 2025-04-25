// Recent Orders Component
const RecentOrders = ({ completedOrders, formatCurrency }) => {
  return (
    <div className="mt-8">
      <h3 className="font-bold mb-2">Recent Completed Orders</h3>
      <div className="space-y-2">
        {completedOrders
          .slice(-3)
          .reverse()
          .map((order) => (
            <div key={order.id} className="bg-gray-100 p-3 rounded">
              <div className="flex justify-between">
                <span>{order.tableName}</span>
                <span className="font-medium">
                  {formatCurrency(order.total)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(order.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentOrders;

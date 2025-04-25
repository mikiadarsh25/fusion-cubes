import CurrentOrder from "./CurrentOrder";
import RecentOrders from "./RecentOrders";
// Order Panel Component
const OrderPanel = ({
  activeTable,
  handleRemoveFromOrder,
  calculateTotal,
  calculateTax,
  formatCurrency,
  handleCompleteOrder,
  printBill,
  completedOrders
}) => {
  return (
    <div className="w-96 bg-white p-4 border-l overflow-y-auto">
      {activeTable ? (
        <CurrentOrder
          activeTable={activeTable}
          handleRemoveFromOrder={handleRemoveFromOrder}
          formatCurrency={formatCurrency}
          calculateTotal={calculateTotal}
          calculateTax={calculateTax}
          handleCompleteOrder={handleCompleteOrder}
          printBill={printBill}
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          Select a table to manage orders
        </div>
      )}

      {/* Recent Completed Orders */}
      {completedOrders.length > 0 && (
        <RecentOrders
          completedOrders={completedOrders}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
};

export default OrderPanel;

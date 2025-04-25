import OrderItem from "./OrderItem";
import BillSummary from "./BillSummary";
import PrintableBill from "./PrintableBill";
// Current Order Component
const CurrentOrder = ({
  activeTable,
  handleRemoveFromOrder,
  formatCurrency,
  calculateTotal,
  calculateTax,
  handleCompleteOrder,
  printBill
}) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        {activeTable.name} - Current Order
      </h2>

      {/* Hidden printable bill section */}
      <PrintableBill
        activeTable={activeTable}
        formatCurrency={formatCurrency}
        calculateTotal={calculateTotal}
        calculateTax={calculateTax}
      />

      {activeTable.orders.length > 0 ? (
        <div>
          <div className="mb-4">
            {activeTable.orders.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                formatCurrency={formatCurrency}
                handleRemoveFromOrder={handleRemoveFromOrder}
              />
            ))}
          </div>

          <BillSummary
            calculateTotal={calculateTotal}
            calculateTax={calculateTax}
            formatCurrency={formatCurrency}
            activeTable={activeTable}
            handleCompleteOrder={handleCompleteOrder}
            printBill={printBill}
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No items in this order. Add items from the menu.
        </div>
      )}
    </>
  );
};

export default CurrentOrder;

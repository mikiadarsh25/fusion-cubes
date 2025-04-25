// Bill Summary Component
const BillSummary = ({
  calculateTotal,
  calculateTax,
  formatCurrency,
  activeTable,
  handleCompleteOrder,
  printBill
}) => {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>{formatCurrency(calculateTotal(activeTable.orders))}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax (8%):</span>
        <span>
          {formatCurrency(calculateTax(calculateTotal(activeTable.orders)))}
        </span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>
          {formatCurrency(
            calculateTotal(activeTable.orders) +
              calculateTax(calculateTotal(activeTable.orders))
          )}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleCompleteOrder}
        >
          Complete Order
        </button>
        <button
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
          onClick={printBill}
        >
          Print Bill
        </button>
      </div>
    </div>
  );
};

export default BillSummary;

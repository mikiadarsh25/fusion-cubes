import { Move3D } from "lucide-react";

const TableList = ({
  tables,
  activeTable,
  handleSelectTable,
  dailySales,
  completedOrders,
  formatCurrency
}) => {
  return (
    <div className="w-48 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="font-bold mb-4">Tables</h2>
      <div className="space-y-2">
        {tables.map((table) => (
          <button
            key={table.id}
            className={`w-full p-2 text-left rounded ${
              activeTable && activeTable.id === table.id
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
            onClick={() => handleSelectTable(table.id)}
          >
            {table.name}
            {table.orders.length > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {table.orders.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="font-bold mb-2">Daily Summary</h2>
        <div className="bg-white p-2 rounded">
          <p>Total Sales: {formatCurrency(dailySales)}</p>
          <p>Orders: {completedOrders.length}</p>
        </div>
      </div>
    </div>
  );
};

export default TableList;

// Order Item Component
const OrderItem = ({ item, formatCurrency, handleRemoveFromOrder }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-gray-600 text-sm">
          {formatCurrency(item.price)} × {item.quantity}
        </div>
      </div>
      <div className="flex items-center">
        <span className="mx-2 font-medium">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
          onClick={() => handleRemoveFromOrder(item.id)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default OrderItem;

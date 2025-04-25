// Menu Item Component
const MenuItem = ({ item, onAddToOrder }) => {
  return (
    <div
      className="bg-white p-3 rounded shadow-sm cursor-pointer hover:bg-blue-50"
      onClick={() => onAddToOrder(item)}
    >
      <div className="font-medium">{item.name}</div>
      <div className="flex justify-between">
        <span className="text-gray-600">₹{item.price.toFixed(2)}</span>
        <button className="text-blue-500 hover:text-blue-700">Add</button>
      </div>
    </div>
  );
};

export default MenuItem;

import MenuItem from "./MenuItem";
// Menu Category Component
const MenuCategory = ({ category, items, onAddToOrder }) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-gray-700">{category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {items
          .filter((item) => item.category === category)
          .map((item) => (
            <MenuItem key={item.id} item={item} onAddToOrder={onAddToOrder} />
          ))}
      </div>
    </div>
  );
};

export default MenuCategory;

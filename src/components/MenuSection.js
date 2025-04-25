import MenuCategory from "./MenuCategory";
import NewMenuItemForm from "./NewMenuItemForm";
// Menu Section Component
const MenuSection = ({
  categories,
  menuItems,
  handleAddToOrder,
  newMenuItem,
  setNewMenuItem,
  handleAddMenuItem
}) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Menu Items</h2>

        {/* Menu Categories */}
        <div className="mb-4">
          {categories.map((category) => (
            <MenuCategory
              key={category}
              category={category}
              items={menuItems}
              onAddToOrder={handleAddToOrder}
            />
          ))}
        </div>

        {/* Add New Menu Item Form */}
        <NewMenuItemForm
          newMenuItem={newMenuItem}
          setNewMenuItem={setNewMenuItem}
          categories={categories}
          handleAddMenuItem={handleAddMenuItem}
        />
      </div>
    </div>
  );
};

export default MenuSection;

// New Menu Item Form Component
const NewMenuItemForm = ({
  newMenuItem,
  setNewMenuItem,
  categories,
  handleAddMenuItem
}) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="font-bold mb-2">Add New Menu Item</h3>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Item Name"
          className="border p-2 rounded flex-1"
          value={newMenuItem.name}
          onChange={(e) =>
            setNewMenuItem({ ...newMenuItem, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded w-24"
          value={newMenuItem.price}
          onChange={(e) =>
            setNewMenuItem({ ...newMenuItem, price: e.target.value })
          }
        />
        <select
          className="border p-2 rounded"
          value={newMenuItem.category}
          onChange={(e) =>
            setNewMenuItem({ ...newMenuItem, category: e.target.value })
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleAddMenuItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default NewMenuItemForm;

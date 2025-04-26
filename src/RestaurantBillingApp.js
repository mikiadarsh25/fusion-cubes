import React, { useState, useEffect, useRef } from "react";
import { menuArray, tableArray, categoriesArray } from "./utils/data"; // Assuming you have a menu.json file with your menu items
import Header from "./components/Header";
import TableList from "./components/TableList";
import MenuSection from "./components/MenuSection";
import OrderPanel from "./components/OrderPanel";

// Main App Component
const RestaurantBillingApp = () => {
  // Reference for printable bill area
  const printBillRef = useRef(null);

  // State for menu items
  const [menuItems, setMenuItems] = useState(menuArray);

  // State for tables
  const [tables, setTables] = useState(tableArray);

  // State for active table
  const [activeTable, setActiveTable] = useState(null);

  // State for new menu item form
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    category: "Main Course"
  });

  // State for categories
  const [categories, setCategories] = useState(categoriesArray);

  // State to track completed orders
  const [completedOrders, setCompletedOrders] = useState([]);

  // State to track daily sales
  const [dailySales, setDailySales] = useState(0);

  // Add new menu item
  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      const newItem = {
        id: menuItems.length + 1,
        name: newMenuItem.name,
        price: parseFloat(newMenuItem.price),
        category: newMenuItem.category
      };

      setMenuItems([...menuItems, newItem]);
      setNewMenuItem({ name: "", price: "", category: "Main Course" });
    }
  };

  // Select a table
  const handleSelectTable = (tableId) => {
    const selected = tables.find((table) => table.id === tableId);
    setActiveTable(selected);
  };

  // Add item to table order
  const handleAddToOrder = (menuItem) => {
    if (activeTable) {
      const updatedTables = tables.map((table) => {
        if (table.id === activeTable.id) {
          // Check if item already exists in the order
          const existingItem = table.orders.find(
            (item) => item.id === menuItem.id
          );

          if (existingItem) {
            // Increase quantity if item exists
            return {
              ...table,
              orders: table.orders.map((item) =>
                item.id === menuItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          } else {
            // Add new item with quantity 1
            return {
              ...table,
              orders: [...table.orders, { ...menuItem, quantity: 1 }]
            };
          }
        }
        return table;
      });

      setTables(updatedTables);
      setActiveTable(
        updatedTables.find((table) => table.id === activeTable.id)
      );
    }
  };

  // Remove item from order
  const handleRemoveFromOrder = (menuItemId) => {
    if (activeTable) {
      const updatedTables = tables.map((table) => {
        if (table.id === activeTable.id) {
          const existingItem = table.orders.find(
            (item) => item.id === menuItemId
          );

          if (existingItem && existingItem.quantity > 1) {
            // Decrease quantity if more than 1
            return {
              ...table,
              orders: table.orders.map((item) =>
                item.id === menuItemId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            };
          } else {
            // Remove item if quantity is 1
            return {
              ...table,
              orders: table.orders.filter((item) => item.id !== menuItemId)
            };
          }
        }
        return table;
      });

      setTables(updatedTables);
      setActiveTable(
        updatedTables.find((table) => table.id === activeTable.id)
      );
    }
  };

  // Calculate total for a table
  const calculateTotal = (orders) => {
    return orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Complete order and generate bill
  const handleCompleteOrder = () => {
    if (activeTable && activeTable.orders.length > 0) {
      const orderTotal = calculateTotal(activeTable.orders);

      // Add to completed orders
      const completedOrder = {
        id: completedOrders.length + 1,
        tableId: activeTable.id,
        tableName: activeTable.name,
        items: [...activeTable.orders],
        total: orderTotal,
        timestamp: new Date()
      };

      setCompletedOrders([...completedOrders, completedOrder]);

      // Update daily sales
      setDailySales(dailySales + orderTotal);

      // Clear table orders
      const updatedTables = tables.map((table) =>
        table.id === activeTable.id ? { ...table, orders: [] } : table
      );

      setTables(updatedTables);
      setActiveTable({ ...activeTable, orders: [] });
    }
  };

  // Calculate tax amount (assuming 8% tax rate)
  const calculateTax = (subtotal) => {
    return subtotal * 0.08;
  };

  // Format currency with Rupee symbol
  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  // Print bill function

  const printBill = () => {
    if (activeTable && activeTable.orders.length > 0) {
      try {
        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });

        // Generate a random check number and server name
        const checkNumber = Math.floor(1000 + Math.random() * 9000);
        const serverNames = ["Rahul T.", "Priya M.", "Amit K.", "Neha G."];
        const server =
          serverNames[Math.floor(Math.random() * serverNames.length)];

        // Calculate subtotal, tax, and total
        const subtotal = calculateTotal(activeTable.orders);
        const tax = calculateTax(subtotal);
        const total = subtotal + tax;

        // Calculate gratuity suggestions
        const gratuity18 = subtotal * 0.18;
        const gratuity20 = subtotal * 0.2;
        const gratuity22 = subtotal * 0.22;

        // Generate order items HTML
        let orderItemsHtml = "";
        activeTable.orders.forEach((item) => {
          orderItemsHtml += `
            <div class="order-item">
              <div class="qty-column">${item.quantity}</div>
              <div class="item-column">${item.name}</div>
              <div class="amount-column">${formatCurrency(
                item.price * item.quantity
              )}</div>
            </div>
          `;
        });

        // HTML template for the bill
        const billHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>The Fusion Cubes - Bill</title>
          <style>
            /* General Styles */
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 20px;
              display: flex;
              justify-content: center;
            }
            
            .bill-container {
              width: 80mm;
              background-color: white;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              overflow: hidden;
              padding-bottom: 20px;
            }
            
            /* Restaurant Header */
            .restaurant-header {
              text-align: center;
              padding: 15px;
              border-bottom: 1px solid #ddd;
            }
            
            .restaurant-name {
              font-family: Georgia, serif;
              font-size: 24px;
              font-weight: bold;
              margin: 0 0 5px 0;
              color: #333;
            }
            
            .restaurant-address, .restaurant-phone {
              font-size: 10px;
              color: #666;
              margin: 2px 0;
            }
            
            /* Bill Info */
            .bill-info {
              padding: 10px 15px;
              border-bottom: 1px solid #ddd;
            }
            
            .info-row {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              color: #666;
              margin-bottom: 3px;
            }
            
            /* Order Header */
            .order-header {
              display: flex;
              justify-content: space-between;
              padding: 10px 15px 5px;
              font-weight: bold;
              font-size: 12px;
              color: #333;
            }
            
            .qty-column {
              width: 30px;
            }
            
            .item-column {
              flex: 1;
            }
            
            .amount-column {
              width: 70px;
              text-align: right;
            }
            
            .separator {
              height: 1px;
              background-color: #ddd;
              margin: 0 15px;
            }
            
            /* Order Items */
            .order-items {
              padding: 10px 15px;
            }
            
            .order-item {
              display: flex;
              justify-content: space-between;
              font-size: 11px;
              color: #333;
              margin-bottom: 8px;
            }
            
            /* Totals */
            .totals {
              padding: 10px 15px;
              border-top: 1px solid #ddd;
            }
            
            .total-row {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin-bottom: 5px;
            }
            
            .final-total {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              font-size: 14px;
              margin-top: 10px;
              padding-top: 5px;
              border-top: 1px solid #ddd;
            }
            
            /* Gratuity */
            .gratuity {
              padding: 10px 15px;
              border-top: 1px solid #ddd;
            }
            
            .gratuity-header {
              font-size: 11px;
              color: #666;
              margin-bottom: 5px;
            }
            
            .gratuity-options {
              display: flex;
              justify-content: space-between;
              font-size: 11px;
              color: #666;
            }
            
            /* Thank You */
            .thank-you {
              text-align: center;
              padding: 15px;
              font-family: Georgia, serif;
              font-size: 14px;
              color: #333;
            }
            
            .decorative-wave {
              text-align: center;
              color: #3b82f6;
              margin-top: 5px;
            }
            
            /* Print Controls */
            .print-controls {
              margin-top: 20px;
              text-align: center;
            }
            
            .print-controls button {
              padding: 8px 16px;
              margin: 0 5px;
              background-color: #3b82f6;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
            }
            
            .print-controls button:hover {
              background-color: #2563eb;
            }
            
            .print-controls button.close-btn {
              background-color: #6b7280;
            }
            
            .print-controls button.close-btn:hover {
              background-color: #4b5563;
            }
            
            @media print {
              body {
                background-color: white;
                padding: 0;
              }
              
              .bill-container {
                box-shadow: none;
                width: 100%;
              }
              
              .print-controls {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="bill-container">
            <!-- Restaurant Header -->
            <div class="restaurant-header">
              <div class="restaurant-name">The Fusion Cubes</div>
              <div class="restaurant-address">Panorama Square building 2nd floor, Zila School Road, Navratan Hatta, Purnia, Bihar 854301</div>
              <div class="restaurant-phone">Tel: 8655030782</div>
            </div>
            
            <!-- Bill Info -->
            <div class="bill-info">
              <div class="info-row">
                <span>Server: ${server}</span>
                <span>Table: ${activeTable.name.replace("Table ", "")}</span>
              </div>
              <div class="info-row">
                <span>Date: ${formattedDate}</span>
                <span>Time: ${formattedTime}</span>
              </div>
              <div class="info-row">
                <span>Check #: ${checkNumber}</span>
              </div>
            </div>
            
            <!-- Order Header -->
            <div class="order-header">
              <div class="qty-column">QTY</div>
              <div class="item-column">ITEM</div>
              <div class="amount-column">AMOUNT</div>
            </div>
            <div class="separator"></div>
            
            <!-- Order Items -->
            <div class="order-items">
              ${orderItemsHtml}
            </div>
            
            <!-- Totals -->
            <div class="totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
              </div>
              <div class="total-row">
                <span>Tax (8%):</span>
                <span>${formatCurrency(tax)}</span>
              </div>
              <div class="final-total">
                <span>Total:</span>
                <span>${formatCurrency(total)}</span>
              </div>
            </div>
            
            <!-- Gratuity -->
            <div class="gratuity">
              <div class="gratuity-header">Gratuity Suggestions:</div>
              <div class="gratuity-options">
                <span>18% - ${formatCurrency(gratuity18)}</span>
                <span>20% - ${formatCurrency(gratuity20)}</span>
                <span>22% - ${formatCurrency(gratuity22)}</span>
              </div>
            </div>
            
            <!-- Thank You -->
            <div class="thank-you">
              <div>Thank you for dining with us!</div>
              <div class="decorative-wave">~~~~~~~~~~~~~</div>
            </div>
          </div>
          
          <!-- Print Controls -->
          <div class="print-controls">
            <button onclick="window.print()">Print Bill</button>
            <button class="close-btn" onclick="window.close()">Close</button>
          </div>
        </body>
        </html>
        `;

        // Open a new window and write the bill HTML to it
        const printWindow = window.open("", "_blank", "width=800,height=800");
        printWindow.document.write(billHtml);
        printWindow.document.close();

        // Return focus to the main window
        window.focus();
      } catch (error) {
        console.error("Print error:", error);
        alert("There was an error generating the bill. Please try again.");
      }
    } else {
      alert("No items in order to print.");
    }
  };
  // Usage example:
  // Call this function when the "Print Bill" button is clicked

  // Export daily summary to CSV
  const exportDailySummary = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    csvContent += "Order ID,Table,Items,Quantity,Total,Timestamp\n";

    // Add data rows
    completedOrders.forEach((order) => {
      order.items.forEach((item) => {
        csvContent += `${order.id},${order.tableName},"${item.name}",${
          item.quantity
        },${item.price * item.quantity},${order.timestamp}\n`;
      });
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `The_Fusion_Cubes_Summary_${new Date()
        .toLocaleDateString()
        .replace(/\//g, "-")}.csv`
    );
    document.body.appendChild(link);

    // Trigger download
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header exportDailySummary={exportDailySummary} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tables */}
        <TableList
          tables={tables}
          activeTable={activeTable}
          handleSelectTable={handleSelectTable}
          dailySales={dailySales}
          completedOrders={completedOrders}
          formatCurrency={formatCurrency}
        />

        {/* Middle Section - Menu */}
        <MenuSection
          categories={categories}
          menuItems={menuItems}
          handleAddToOrder={handleAddToOrder}
          newMenuItem={newMenuItem}
          setNewMenuItem={setNewMenuItem}
          handleAddMenuItem={handleAddMenuItem}
        />

        {/* Right Section - Current Order */}
        <OrderPanel
          activeTable={activeTable}
          handleRemoveFromOrder={handleRemoveFromOrder}
          calculateTotal={calculateTotal}
          calculateTax={calculateTax}
          formatCurrency={formatCurrency}
          handleCompleteOrder={handleCompleteOrder}
          printBill={printBill}
          completedOrders={completedOrders}
        />
      </div>
    </div>
  );
};

export default RestaurantBillingApp;

// Printable Bill Component

const PrintableBill = ({
  activeTable,
  formatCurrency,
  calculateTotal,
  calculateTax
}) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  const checkNumber = Math.floor(1000 + Math.random() * 9000);
  const serverNames = ["Rahul T.", "Priya M.", "Amit K.", "Neha G."];
  const server = serverNames[Math.floor(Math.random() * serverNames.length)];

  // Calculate subtotal
  const subtotal = calculateTotal(activeTable.orders);
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  // Calculate gratuity suggestions
  const gratuity18 = subtotal * 0.18;
  const gratuity20 = subtotal * 0.2;
  const gratuity22 = subtotal * 0.22;

  return (
    <div id="printable-bill" className="hidden">
      <div className="bill-paper">
        {/* Restaurant logo/header */}
        <h1 className="restaurant-name">FUSION BITES</h1>
        <p className="restaurant-address">
          123 Culinary Avenue, Mumbai, MH 400001
        </p>
        <p className="restaurant-phone">Tel: (022) 2345-6789</p>

        {/* Separator line */}
        <div className="separator-line"></div>

        {/* Bill info */}
        <div className="bill-info">
          <div className="bill-info-row">
            <span className="bill-info-label">Server: {server}</span>
            <span className="bill-info-value">
              Table: {activeTable.name.replace("Table ", "")}
            </span>
          </div>
          <div className="bill-info-row">
            <span className="bill-info-label">Date: {formattedDate}</span>
            <span className="bill-info-value">Time: {formattedTime}</span>
          </div>
          <div className="bill-info-row">
            <span className="bill-info-label">Check #: {checkNumber}</span>
          </div>
        </div>

        {/* Order header */}
        <div className="order-header">
          <span className="qty-header">QTY</span>
          <span className="item-header">ITEM</span>
          <span className="amount-header">AMOUNT</span>
        </div>

        {/* Line under headers */}
        <div className="header-underline"></div>

        {/* Order items */}
        <div className="order-items">
          {activeTable.orders.map((item) => (
            <div key={item.id} className="order-row">
              <span className="qty-value">{item.quantity}</span>
              <span className="item-value">{item.name}</span>
              <span className="amount-value">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div className="total-separator-line"></div>

        {/* Totals */}
        <div className="totals-section">
          <div className="total-row">
            <span className="total-label">Subtotal:</span>
            <span className="total-value">{formatCurrency(subtotal)}</span>
          </div>
          <div className="total-row">
            <span className="total-label">Tax (8%):</span>
            <span className="total-value">{formatCurrency(tax)}</span>
          </div>
          <div className="total-row final">
            <span className="total-label">Total:</span>
            <span className="total-value">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Gratuity suggestions */}
        <div className="gratuity-section">
          <p className="gratuity-header">Gratuity Suggestions:</p>
          <div className="gratuity-options">
            <span className="gratuity-option">
              18% - {formatCurrency(gratuity18)}
            </span>
            <span className="gratuity-option">
              20% - {formatCurrency(gratuity20)}
            </span>
            <span className="gratuity-option">
              22% - {formatCurrency(gratuity22)}
            </span>
          </div>
        </div>

        {/* Thank you message */}
        <p className="thank-you">Thank you for dining with us!</p>

        {/* Decorative wave - this will be styled with CSS */}
        <div className="decorative-wave"></div>
      </div>
    </div>
  );
};
export default PrintableBill;

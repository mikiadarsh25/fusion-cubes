import React from "react";
import ReactDOM from "react-dom/client";
import RestaurantBillingApp from "./RestaurantBillingApp";

const AppLayout = () => {
  return <RestaurantBillingApp />
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);

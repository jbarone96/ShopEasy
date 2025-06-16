import { AuthProvider } from "./Utils/AuthContext.jsx";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./Utils/CartContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);

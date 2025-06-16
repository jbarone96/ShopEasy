import React from "react";
import { useCart } from "../Utils/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const itemMap = {};
  // moved below after cartItems are processed
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  cartItems.forEach((item) => {
    if (itemMap[item.id]) {
      itemMap[item.id].quantity += 1;
    } else {
      itemMap[item.id] = { ...item, quantity: 1 };
    }
  });

  const groupedItems = Object.values(itemMap);

  const total = cartItems
    .reduce((sum, item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("$", ""))
          : parseFloat(item.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0)
    .toFixed(2);

  return (
    <div className="text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-zinc-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {groupedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-zinc-800 rounded-lg p-4 shadow-md justify-between"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-yellow-400 font-medium">{item.price}</p>
                  <p className="text-sm text-zinc-300">
                    Item Total: $
                    {(
                      parseFloat(item.price.replace("$", "")) * item.quantity
                    ).toFixed(2)}
                  </p>
                  <p className="text-sm text-zinc-300">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="text-red-400 hover:text-red-300 font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center border-t border-zinc-700 pt-6">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to clear the entire cart?"
                  )
                ) {
                  clearCart();
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-yellow-400 text-xl font-bold">${total}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

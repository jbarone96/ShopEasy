import React, { useState, useRef } from "react";
import { useCart } from "../Utils/CartContext";
import { useAuth } from "../Utils/AuthContext";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import visaLogo from "../Assets/visa.svg";
import mastercardLogo from "../Assets/mastercard.svg";
import amexLogo from "../Assets/amex.png";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [cardNumber, setCardNumber] = useState("");
  const [cardBrand, setCardBrand] = useState(null);
  const [expiry, setExpiry] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvc, setCvc] = useState("");

  const expiryRef = useRef();
  const cvcRef = useRef();

  const detectCardBrand = (number) => {
    const cleanNumber = number.replace(/\s+/g, "");
    if (/^4/.test(cleanNumber)) return "visa";
    if (/^5[1-5]/.test(cleanNumber)) return "mastercard";
    if (/^3[47]/.test(cleanNumber)) return "amex";
    return null;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    const brand = detectCardBrand(value);
    setCardBrand(brand);

    if (brand === "amex") {
      value = value.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
    } else {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    setCardNumber(value.trim());

    if (value.replace(/\s/g, "").length >= (brand === "amex" ? 15 : 16)) {
      expiryRef.current?.focus();
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length >= 3) {
      value = value.slice(0, 4);
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    setExpiry(value);

    const [mm, yy] = value.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (mm && (parseInt(mm) < 1 || parseInt(mm) > 12)) {
      setExpiryError("Invalid month");
    } else if (mm && yy) {
      const mmNum = parseInt(mm);
      const yyNum = parseInt(yy);
      if (
        yyNum < currentYear ||
        (yyNum === currentYear && mmNum < currentMonth)
      ) {
        setExpiryError("Card expired");
      } else {
        setExpiryError("");
        if (value.length === 5) {
          cvcRef.current?.focus();
        }
      }
    } else {
      setExpiryError("");
    }
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setCvc(value);
  };

  const isFormValid =
    cardNumber.replace(/\s/g, "").length === (cardBrand === "amex" ? 15 : 16) &&
    expiry.length === 5 &&
    !expiryError &&
    (cardBrand === "amex" ? cvc.length === 4 : cvc.length === 3);

  const total = cartItems
    .reduce((sum, item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("$", ""))
          : parseFloat(item.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0)
    .toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        items: cartItems,
        total,
        createdAt: serverTimestamp(),
      });
      clearCart();
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-zinc-600">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-zinc-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-yellow-400">{item.price}</p>
              </div>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
            </div>
          ))}

          <div className="border-t border-zinc-700 pt-6 flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span className="text-yellow-400">${total}</span>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Payment Info (Mock)</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full px-4 py-2 pr-12 rounded bg-zinc-900 text-white border border-zinc-700"
                />
                {cardBrand && (
                  <img
                    src={
                      cardBrand === "visa"
                        ? visaLogo
                        : cardBrand === "mastercard"
                        ? mastercardLogo
                        : amexLogo
                    }
                    alt={cardBrand}
                    className="absolute top-2 right-3 h-6"
                  />
                )}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    maxLength={5}
                    ref={expiryRef}
                    className="w-full px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
                  />
                  {expiryError && (
                    <p className="text-red-400 text-sm mt-1">{expiryError}</p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={handleCvcChange}
                  ref={cvcRef}
                  className="w-1/2 px-4 py-2 rounded bg-zinc-900 text-white border border-zinc-700"
                />
              </div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full font-semibold py-3 rounded transition ${
                  isFormValid
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "bg-yellow-500/50 text-black cursor-not-allowed"
                }`}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

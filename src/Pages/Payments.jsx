import React from "react";

const Payments = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-zinc-600">Payment Options</h1>
      <p className="text-zinc-400 mb-6">
        Manage your saved payment methods and add new ones. This page is
        currently a placeholder.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Add New Card
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Edit Saved Cards
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Set Default Payment
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Remove Payment Method
        </button>
      </div>
    </div>
  );
};

export default Payments;

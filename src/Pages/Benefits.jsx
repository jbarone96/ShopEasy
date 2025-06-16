import React from "react";

const Benefits = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-zinc-600">
        Your Prime Benefits
      </h1>
      <p className="text-zinc-400 mb-6">
        As a Prime member, you have access to a number of exclusive features and
        deals. Select a benefit below to learn more. (Coming soon!)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Free Two-Day Shipping
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Prime Video Access
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Early Access to Deals
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Unlimited Photo Storage
        </button>
      </div>

      <div className="flex justify-center">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg shadow-md transition">
          Get Prime
        </button>
      </div>
    </div>
  );
};

export default Benefits;

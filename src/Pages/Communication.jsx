import React from "react";

const CommunicationPreferences = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-zinc-600">
        Communication Preferences
      </h1>
      <p className="text-zinc-400 mb-6">
        Choose how you’d like to hear from us. This is a placeholder and doesn't
        save any selections (yet).
      </p>

      <div className="space-y-4">
        <label className="flex items-center gap-3 text-zinc-500">
          <input type="checkbox" className="accent-yellow-500 w-5 h-5" />
          <span>Email Notifications</span>
        </label>

        <label className="flex items-center gap-3 text-zinc-500">
          <input type="checkbox" className="accent-yellow-500 w-5 h-5" />
          <span>Text Messages</span>
        </label>

        <label className="flex items-center gap-3 text-zinc-500">
          <input type="checkbox" className="accent-yellow-500 w-5 h-5" />
          <span>Promotional Offers</span>
        </label>

        <label className="flex items-center gap-3 text-zinc-500">
          <input type="checkbox" className="accent-yellow-500 w-5 h-5" />
          <span>Product Recommendations</span>
        </label>

        <div className="flex justify-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg shadow-md transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPreferences;

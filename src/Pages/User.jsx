import React from "react";
import { useAuth } from "../Utils/AuthContext"; // Make sure this path is correct based on your project
import { useNavigate } from "react-router-dom";

const User = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-zinc-600">
          Welcome {currentUser?.displayName || "User"}
        </h1>
        <button
          onClick={handleSignOut}
          className="bg-red-900 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
        >
          Sign Out
        </button>
      </div>
      <p className="mb-6 text-zinc-400">Your Account</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 cursor-pointer transition"
          onClick={() => navigate("/orders")}
        >
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-sm text-zinc-300">
            Track, return, or buy things again
          </p>
        </div>

        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 cursor-pointer transition"
          onClick={() => navigate("/security")}
        >
          <h2 className="text-xl font-semibold mb-2">Login & Security</h2>
          <p className="text-sm text-zinc-300">
            Change your email, password, or phone number
          </p>
        </div>

        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 cursor-pointer transition"
          onClick={() => navigate("/prime")}
        >
          <h2 className="text-xl font-semibold mb-2">Prime</h2>
          <p className="text-sm text-zinc-300">
            View benefits and payment settings
          </p>
        </div>

        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 cursor-pointer transition"
          onClick={() => navigate("/payments")}
        >
          <h2 className="text-xl font-semibold mb-2">Payment Options</h2>
          <p className="text-sm text-zinc-300">Edit or add payment methods</p>
        </div>

        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 cursor-pointer transition"
          onClick={() => navigate("/addresses")}
        >
          <h2 className="text-xl font-semibold mb-2">Addresses</h2>
          <p className="text-sm text-zinc-300">
            Update or add shipping addresses
          </p>
        </div>

        <div
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 cursor-pointer transition"
          onClick={() => navigate("/communication")}
        >
          <h2 className="text-xl font-semibold mb-2">
            Communication Preferences
          </h2>
          <p className="text-sm text-zinc-300">
            Manage emails and notifications
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;

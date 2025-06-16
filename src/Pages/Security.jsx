import React from "react";

const LoginAndSecurity = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-zinc-600">
        Login & Security
      </h1>
      <p className="text-zinc-400 mb-6">
        Manage your account login credentials and security preferences. This is
        just a placeholder for now.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Change Email
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Update Password
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Update Phone Number
        </button>
        <button className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-4 rounded-lg shadow-md transition">
          Enable 2FA (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default LoginAndSecurity;

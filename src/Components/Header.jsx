import { ShoppingCart, MapPin, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";
import { useCart } from "../Utils/CartContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/search") {
      const params = new URLSearchParams(location.search);
      const query = params.get("q");
      if (query) setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-zinc-900 text-white px-4 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo + Location */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="text-2xl font-bold tracking-tight transition duration-300 hover:text-yellow-400">
              ShopEasy
            </h1>
          </Link>
          <div className="hidden sm:flex items-center text-sm text-zinc-300 hover:text-white cursor-pointer">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {currentUser
                ? `Deliver to ${currentUser.displayName || "User"}`
                : "Nationwide Delivery"}
            </span>
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          className="sm:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          {currentUser ? (
            <Link to="/user" className="hover:text-yellow-400 transition">
              Account
            </Link>
          ) : (
            <Link to="/login" className="hover:text-yellow-400 transition">
              Sign In
            </Link>
          )}

          <Link to="/orders" className="hover:text-yellow-400 transition">
            Orders
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 sm:hidden text-sm">
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-l-md px-4 py-2 text-black outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-r-md"
            >
              Search
            </button>
          </form>

          {currentUser ? (
            <Link to="/user" className="hover:text-yellow-400 transition">
              Account
            </Link>
          ) : (
            <Link to="/login" className="hover:text-yellow-400 transition">
              Sign In
            </Link>
          )}

          <Link to="/orders" className="hover:text-yellow-400 transition">
            Orders
          </Link>

          <Link to="/cart" className="hover:text-yellow-400 transition">
            View Cart ({cartItems.length})
          </Link>
        </div>
      )}

      {/* Desktop Search Bar */}
      <form
        onSubmit={handleSearch}
        className="hidden sm:flex flex-grow mt-4 mx-auto max-w-6xl w-full"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-l-md px-4 py-2 text-black outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-r-md"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;

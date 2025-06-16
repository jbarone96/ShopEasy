import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../Utils/CartContext";

const fakeProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  description: `This is product number ${i + 1}. It's a great item.`,
  price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0 stars
  image: `https://picsum.photos/seed/product${i + 1}/400/300`,
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("q")?.toLowerCase() || "";
  const { addToCart } = useCart();
  const [priceFilter, setPriceFilter] = useState("all");
  const [sort, setSort] = useState("default");

  let filtered = fakeProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );

  if (priceFilter === "under50") {
    filtered = filtered.filter((p) => p.price < 50);
  } else if (priceFilter === "50to100") {
    filtered = filtered.filter((p) => p.price >= 50 && p.price <= 100);
  } else if (priceFilter === "over100") {
    filtered = filtered.filter((p) => p.price > 100);
  }

  if (sort === "lowToHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "highToLow") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="text-white p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search Results for "{query}"
      </h1>

      {filtered.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row justify-start gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-zinc-400 mb-1">
              Filter by Price
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-600"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 to $100</option>
              <option value="over100">Over $100</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-zinc-400 mb-1">Sort by</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-600"
            >
              <option value="default">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="rating">Customer Review</option>
            </select>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-700 transition-all duration-300 animate-fadeIn opacity-0 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-sm text-zinc-300 mb-2">
                {product.description}
              </p>
              <p className="text-yellow-400 font-bold mb-1">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs text-zinc-400 mb-4">
                Rating: {product.rating} ★
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default SearchResults;

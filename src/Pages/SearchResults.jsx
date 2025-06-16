import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../Utils/CartContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("q")?.toLowerCase() || "";
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "browseProducts"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products from Firestore:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  let filtered = products.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const searchableWords = `${title} ${description} ${category}`.split(/\W+/);
    return query ? searchableWords.some((word) => word === query) : true;
  });

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="text-white p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-zinc-600">
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
              className="bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-700 transition-all duration-300 animate-fadeIn opacity-0 flex flex-col justify-between h-full"
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
                $
                {(typeof product.price === "string"
                  ? parseFloat(product.price)
                  : product.price
                ).toFixed(2)}
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

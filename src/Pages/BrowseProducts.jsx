import React, { useState, useEffect } from "react";
import { useCart } from "../Utils/CartContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const categories = ["All", "Electronics", "Clothing", "Home", "Books"];

const ITEMS_PER_PAGE = 12;

const Spinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const BrowseProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem("browsePage");
    return saved ? parseInt(saved, 10) : 1;
  });
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

  let filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("browsePage", page);
    setTimeout(() => {
      const scrollTarget = document.getElementById("browse-top");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  if (loading) return <Spinner />;

  return (
    <div
      id="browse-top"
      className="text-white px-8 pt-4 pb-8 max-w-6xl mx-auto scroll-mt-24"
    >
      <h1 className="text-3xl font-bold mb-4 text-center text-zinc-600">
        Browse Products
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              selectedCategory === cat
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-zinc-800 text-white border-zinc-600 hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-start gap-4">
        <div className="flex flex-col">
          <label className="text-xs text-zinc-400 mb-1">Filter by Price</label>
          <select
            value={priceFilter}
            onChange={(e) => {
              setPriceFilter(e.target.value);
              setCurrentPage(1);
            }}
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
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-600"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating">Customer Review</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((product, index) => (
          <div
            key={product.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-700 transition-all duration-300 animate-fadeIn opacity-0 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mx-auto p-2"
            />
            <div>
              <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
              <p className="text-xs text-zinc-400 mb-1">
                Category: {product.category}
              </p>
              <p className="text-sm text-zinc-300 mb-2">
                {product.description}
              </p>
              <p className="text-yellow-400 font-bold">
                ${Number(product.price).toFixed(2)}
              </p>
              <p className="text-xs text-zinc-400 mb-4">
                Rating: {Number(product.rating).toFixed(1)} ★
              </p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded border text-sm font-medium transition bg-zinc-800 text-white border-zinc-600 hover:bg-zinc-700 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded border text-sm font-medium transition ${
              currentPage === i + 1
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-zinc-800 text-white border-zinc-600 hover:bg-zinc-700"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded border text-sm font-medium transition bg-zinc-800 text-white border-zinc-600 hover:bg-zinc-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

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

export default BrowseProducts;

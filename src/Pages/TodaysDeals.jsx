import React, { useEffect, useState } from "react";
import { useCart } from "../Utils/CartContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Spinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const TodaysDeals = () => {
  const { addToCart } = useCart();
  const [deals, setDeals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const snapshot = await getDocs(collection(db, "todaysDeals"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDeals(data);
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch today's deals:", error);
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  let filteredDeals = deals.filter((deal) => {
    const priceMatch =
      filter === "under50"
        ? deal.price < 50
        : filter === "50to100"
        ? deal.price >= 50 && deal.price <= 100
        : filter === "over100"
        ? deal.price > 100
        : true;
    const categoryMatch =
      selectedCategory === "all" || deal.category === selectedCategory;
    return priceMatch && categoryMatch;
  });

  if (sort === "lowToHigh") {
    filteredDeals.sort((a, b) => a.price - b.price);
  } else if (sort === "highToLow") {
    filteredDeals.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filteredDeals.sort((a, b) => b.rating - a.rating);
  }

  if (loading) return <Spinner />;

  return (
    <div className="text-white pt-4 px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-zinc-600">
        Today's Deals
      </h1>

      <div className="mb-4 flex flex-col sm:flex-row justify-start gap-4">
        <div className="flex flex-col">
          <label className="text-xs text-zinc-400 mb-1">Filter by Price</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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

        <div className="flex flex-col">
          <label className="text-xs text-zinc-400 mb-1">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-600"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {filteredDeals.map((deal, index) => (
          <div
            key={deal.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-700 transition-all duration-300 animate-fadeIn opacity-0 flex flex-col justify-between h-full"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">{deal.title}</h2>
                <p className="text-xs text-zinc-400 mb-1">
                  Category: {deal.category}
                </p>
                <p className="text-sm text-zinc-300 mb-2">{deal.description}</p>
              </div>
              <div>
                <p className="text-yellow-400 font-bold">
                  $
                  {(typeof deal.price === "string"
                    ? parseFloat(deal.price)
                    : deal.price
                  ).toFixed(2)}
                </p>
                <p className="text-xs text-zinc-400 mb-4">
                  Rating: {deal.rating} ★
                </p>
              </div>
            </div>
            <button
              onClick={() => addToCart(deal)}
              className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
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

export default TodaysDeals;

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Utils/CartContext";

const Home = () => {
  const { addToCart } = useCart();
  const recommended = [
    {
      id: 0,
      title: "Wireless Headphones",
      description: "Premium sound and all-day comfort.",
      price: 79.99,
      rating: 4.5,
      image:
        "https://res.cloudinary.com/dkasrpjfk/image/upload/v1750107095/35054231_mo2s8e.jpg",
    },
    {
      id: 1,
      title: "Smart LED Lamp",
      description: "Modern lighting you control from your phone.",
      price: 49.99,
      rating: 4.7,
      image:
        "https://res.cloudinary.com/dkasrpjfk/image/upload/v1750107095/683251_732719_02_package_comping_r6enyx.jpg",
    },
    {
      id: 2,
      title: "Portable Blender",
      description: "Make smoothies on the go — anytime, anywhere.",
      price: 34.99,
      rating: 4.3,
      image:
        "https://res.cloudinary.com/dkasrpjfk/image/upload/v1750107095/images_yr8noo.jpg",
    },
  ];

  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-zinc-600">
        Welcome to ShopEasy
      </h1>
      <p className="text-center text-zinc-400 mb-6 max-w-2xl mx-auto">
        Your one-stop shop for everything you love. Discover new products, track
        orders, and manage your account seamlessly.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <Link
          to="/browse"
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 transition w-[340px]"
        >
          <h2 className="text-xl font-semibold mb-2">Browse Products</h2>
          <p className="text-sm text-zinc-300">
            Explore our huge range of items and find your next favorite.
          </p>
        </Link>

        <Link
          to="/deals"
          className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-700 transition w-[340px]"
        >
          <h2 className="text-xl font-semibold mb-2">Today's Deals</h2>
          <p className="text-sm text-zinc-300">
            Snag hot items at unbeatable prices while they last.
          </p>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-zinc-500 mb-2">
          Recommended For You
        </h2>
        <p className="text-base text-zinc-400">
          Hand-picked just for you based on popular items!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {recommended.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-700 transition-all flex flex-col w-[300px]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-zinc-300 mb-1">{item.description}</p>
            <p className="text-yellow-400 font-bold">
              ${item.price.toFixed(2)}
            </p>
            <p className="text-xs text-zinc-400 mb-4">
              Rating: {item.rating} ★
            </p>
            <button
              onClick={() => addToCart(item)}
              className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

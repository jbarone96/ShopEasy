import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../Utils/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const formatted = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => {
            const aTime = a.createdAt?.seconds || 0;
            const bTime = b.createdAt?.seconds || 0;
            return bTime - aTime;
          });
        setOrders(formatted);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-zinc-600">Your Orders</h1>

      {loading ? (
        <p className="text-zinc-400">You don't have any orders.</p>
      ) : orders.length === 0 ? (
        <p className="text-zinc-400">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-800 rounded-lg shadow-md p-6 hover:bg-zinc-700 transition"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm text-zinc-400">Order ID: {order.id}</p>
                  <p className="text-sm text-zinc-400">
                    Date:{" "}
                    {order.createdAt?.toDate().toLocaleDateString() ||
                      "Unknown"}
                  </p>
                </div>
                <p className="font-semibold text-lg">${order.total}</p>
              </div>
              <ul className="list-disc list-inside text-zinc-300">
                {order.items.map((item, index) => (
                  <li key={index}>{item.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

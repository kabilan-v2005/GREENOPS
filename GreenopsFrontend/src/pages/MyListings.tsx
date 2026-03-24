import React, { useEffect, useState } from "react";
import { getUserProducts } from "../services/resaleService";

const MyListings = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getUserProducts(2); // 🔥 userId
    setItems(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Listings</h1>

      {items.length === 0 ? (
        <p>No products listed</p>
      ) : (
        items.map((item) => (
          <div key={item.productId} className="border p-3 mb-2 rounded">
            <p>{item.productName}</p>
            <p>₹{item.productPrice}</p>
            <p>Status: {item.productStatus}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyListings;
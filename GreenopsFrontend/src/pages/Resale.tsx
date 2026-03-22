import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import type { Item } from '../types';
import { getResaleItems, addResaleItem } from '../services/resaleService';
import { buyProduct } from '../services/orderService';

const Resale: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [usageYears, setUsageYears] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // 🔥 FETCH ITEMS
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getResaleItems();

      const formatted = data.map((item: any) => ({
        id: item.productId,
        userId: item.userId,
        title: item.productName,
        description: item.productDetails,
        price: item.productPrice,
        imageUrl: item.productImage
          ? `https://localhost:7024/uploads/${item.productImage}`
          : "",
        isSold: item.productStatus !== "Available",
        createdAt: item.postedDate,
      }));

      setItems(formatted);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // 🔥 SELL PRODUCT FUNCTION
  const handleSell = async () => {
    try {
      console.log("BUTTON CLICKED 🔥");

      const data = {
        userId: 2,
        productName,
        productDetails,
        usageYears: Number(usageYears),
        productPrice: Number(productPrice),
        productImage: "",
      };

      console.log("Sending:", data);

      const res = await addResaleItem(data);

      console.log("Response:", res);

      alert("Product added successfully ✅");

      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      console.error("FULL ERROR:", err);
      console.error("Response:", err?.response);
      alert("Failed ❌");
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resale Marketplace</h1>
          <p className="mt-1 text-sm text-gray-500">Buy and sell upcycled or pre-loved items</p>
        </div>

        {/* 🔥 BUTTON UPDATED */}
        <Button className="shrink-0" onClick={() => setShowForm(true)}>
          <Plus className="w-5 h-5 mr-2" />
          List an Item
        </Button>
      </div>

      {/* 🔥 SELL FORM */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Sell Your Product</h2>

          <div className="grid gap-3">
            <input placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
            <input placeholder="Description" onChange={(e) => setProductDetails(e.target.value)} />
            <input type="number" placeholder="Price" onChange={(e) => setProductPrice(e.target.value)} />
            <input type="number" placeholder="Usage Years" onChange={(e) => setUsageYears(e.target.value)} />
            <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

            <div className="flex gap-3">
              <button
                type="button"   // 🔥 IMPORTANT
                onClick={handleSell}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col group overflow-hidden">
            <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`w-full h-full object-cover ${item.isSold ? 'opacity-50 grayscale' : ''}`}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image
                </div>
              )}

              {item.isSold && (
                <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 text-xs rounded">
                  SOLD
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between">
                <h3>{item.title}</h3>
                <span>₹{item.price}</span>
              </div>
              <p className="text-sm">{item.description}</p>
            </CardContent>

            <CardFooter className="p-4">
              <Button
                className="w-full"
                disabled={item.isSold}
                onClick={async () => {
                  try {
                    console.log("BUY CLICKED 🔥");

                    const payload = {
                      productId: item.id,
                      buyerId: 2,        // 🔥 current user
                      sellerId: item.userId,
                      productPrice: item.price,
                    };

                    console.log("Sending:", payload);

                    await buyProduct(payload);

                    alert("Order placed successfully ✅");

                    fetchItems(); // refresh UI
                  } catch (err: any) {
                    console.error("ERROR:", err);
                    console.error("SERVER:", err?.response);
                    alert("Order failed ❌");
                  }
                }}
              >
                {item.isSold ? "Unavailable" : "Buy Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resale;
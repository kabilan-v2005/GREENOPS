import React, { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";

const MyOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const data = await getUserOrders(2); // 🔥 userId
        setOrders(data);
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">My Orders</h1>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} className="border p-3 mb-2 rounded">
                        <p>Product ID: {order.productId}</p>
                        <p>Price: ₹{order.productPrice}</p>
                        <p>Status: {order.orderStatus}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;
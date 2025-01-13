import OrderCard from "./OrderCard";
import NewOrderPopup from "./NewOrderPopup";
import { useState, useEffect } from "react";
import axios from "axios";  // Import axios

const BASE_URL = "http://localhost:7005";

// Axios based API call to fetch orders
export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders`);
        return response.data; // Axios directly gives the response data
    } catch (error) {
        console.log("Fetch failed:", error);
        throw error;
    }
};

// Axios based API call to create new order
export const createOrder = async (order) => {
    try {
        const response = await axios.post(`${BASE_URL}/orders`, order, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // Return response data (created order)
    } catch (error) {
        console.log("Failed to create order:", error);
        throw error;
    }
};

const OrderListWithPopup = () => {
    const [orders, setOrders] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            try {
                const fetchedOrders = await fetchOrders();
                setOrders(fetchedOrders);
                setError(null); // clear any previous errors
            } catch (err) {
                setError("Failed to fetch orders. Please try again.");
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders(); // Load orders only once
    }, []); // Empty dependency array ensures this effect runs once

    const handleCreateOrder = async (newOrder) => {
        try {
            const createdOrder = await createOrder(newOrder);
            setOrders((prevOrders) => [...prevOrders, createdOrder]);
            setShowPopup(false);
        } catch (err) {
            alert("Failed to create order.");
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={() => setShowPopup(true)} aria-label="Create new order">
                New Order
            </button>
            {error && <div className="error">{error}</div>}
            {loading ? (
                <div>Loading orders...</div>
            ) : (
                <div className="order-list">
                    {orders.map((order, index) => (
                        <OrderCard
                            key={order.id || index}
                            orderNo={order.id}
                            price={order.total_after_tax}
                            date={order.created_at}
                        />
                    ))}
                </div>
            )}
            {showPopup && (
                <NewOrderPopup
                    onClose={() => setShowPopup(false)}
                    onCreate={handleCreateOrder}
                />
            )}
        </div>
    );
};

export default OrderListWithPopup;

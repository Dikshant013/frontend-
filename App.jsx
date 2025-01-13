import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import OrderCard from './components/OrderCard';
import NewOrderPopup from './components/NewOrderPopup';
import ProductsPage from './components/ProductsPage';
import { useState } from 'react';

const App = () => {
    const [orders, setOrders] = useState([
        { orderNo: '12345', price: '79.99', date: '2025-01-10' },
        { orderNo: '12346', price: '39.99', date: '2025-01-09' },
    ]);
    const [showPopup, setShowPopup] = useState(false);

    const handleCreateOrder = (newOrder) => {
        setOrders([...orders, newOrder]);
    };

    return (
        <div>
            <Navbar />
            <section id="products">
            <ProductsPage />
                <h1>Product List</h1>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <ProductCard 
                        image="https://via.placeholder.com/150"
                        name="Sample Product"
                        price="29.99"
                    />
                    <ProductCard 
                        image="https://via.placeholder.com/150"
                        name="product1"
                        price="74.33"
                    />
                      <ProductCard 
                        image="https://via.placeholder.com/150"
                        name="product"
                        price="142.2"
                    />
                      <ProductCard 
                        image="https://via.placeholder.com/150"
                        name="cloth"
                        price="25.33"
                    />
                      <ProductCard 
                        image="https://via.placeholder.com/150"
                        name="Name"
                        price="41.20"
                    />
                </div>
            </section>
            <section id="orders">
                <h1>Order List</h1>
                <button onClick={() => setShowPopup(true)}>Create New Order</button>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {orders.map((order, index) => (
                        <OrderCard 
                            key={index}
                            orderNo={order.orderNo}
                            price={order.price}
                            date={order.date}
                        />
                    ))}
                </div>
            </section>
            {showPopup && (
                <NewOrderPopup 
                    onClose={() => setShowPopup(false)} 
                    onCreate={handleCreateOrder} 
                />
            )}
        </div>
    );
};

export default App;

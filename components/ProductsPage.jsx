import  { useState, useEffect } from 'react';


const ProductsPage = () => {
    const [, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/product');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Product List</h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        image={product.image} 
                        name={product.name} 
                        price={product.price} 
                    />
                ))} */}
            </div>
        </div>
    );
};

export default ProductsPage;

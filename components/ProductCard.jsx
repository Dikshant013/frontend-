import PropTypes from "prop-types";
import './ProductCard.css'; // For styling

const ProductCard = ({ image, name, price }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <h3 className="product-name">{name}</h3>
            <p className="product-price">${price}</p>
        </div>
    );
};

// Define PropTypes for validation
ProductCard.propTypes = {
    image: PropTypes.string.isRequired, // 'image' must be a string and is required
    name: PropTypes.string.isRequired,  // 'name' must be a string and is required
    price: PropTypes.oneOfType([        // 'price' must be a number or a string
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
};

export default ProductCard;


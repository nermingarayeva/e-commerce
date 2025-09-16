import React from 'react';
import { useParams } from 'react-router-dom';  // Assuming we are using React Router
import './ProductDetailPage.scss';  // Importing the SCSS file for styling

const ProductDetailPage = () => {
  const { productId } = useParams(); // Getting the product ID from the URL
  const product = {
    id: 1,
    name: 'T-Shirt with Tape Details',
    price: 120,
    oldPrice: 150,
    rating: 4.5,
    category: 'New Arrivals',
    description: 'A trendy T-shirt with tape detailing on the sides. Perfect for casual wear.',
    image: 'product-image-url.jpg',  // Replace with actual image URL
  }; // This data would come from an API or state in a real application

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <div className="price-section">
            <p className="current-price">${product.price}</p>
            <p className="old-price">${product.oldPrice}</p>
          </div>
          <div className="rating">
            <span>Rating: {product.rating} / 5</span>
          </div>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

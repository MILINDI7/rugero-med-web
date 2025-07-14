import React from 'react';
import './Neurosurgery.css';
import { useLocation } from 'react-router-dom';
const Neurosurgery = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  if (!products.length) {
    return <p className="no-product-message">No products available in this category.</p>;
  }
  return (
    <div className="neurosurgery-container">
      {/* Header section with title */}
      <div className="neurosurgery-header">
        <div className="neurosurgery-header-content">
          <h1 className="neurosurgery-title">
            Neurosurgery Products
          </h1>
        </div>
      </div>

      {/* Products section */}
      <div className="neurosurgery-products-section">
        <div className="neurosurgery-products-container">
          <div className="neurosurgery-products-grid">
            
            {products.map((product, index) => (
              <div key={index} className="neurosurgery-product-card">
                <div className="neurosurgery-product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="neurosurgery-product-image"
                  />
                </div>
                <h3 className="neurosurgery-product-title">
                  {product.title}
                </h3>
                <p className="neurosurgery-product-description">
                  {product.description}
                </p>
                <button className="neurosurgery-contact-button">
                  Contact Us
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Neurosurgery;
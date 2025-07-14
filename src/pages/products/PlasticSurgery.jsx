import React from 'react';
import './PlasticSurgery.css';
import { useLocation } from 'react-router-dom';
const PlasticSurgery = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  if (!products.length) {
    return <p className="no-product-message">No products available in this category.</p>;
  }
  return (
    <div className="plastic-surgery-container">
      {/* Header section with title */}
      <div className="plastic-surgery-header">
        <div className="plastic-surgery-header-content">
          <h1 className="plastic-surgery-title">
            Plastic Surgery Products
          </h1>
        </div>
      </div>

      {/* Products section */}
      <div className="plastic-surgery-products-section">
        <div className="plastic-surgery-products-container">
          <div className="plastic-surgery-products-grid">
            
            {products.map((product, index) => (
              <div key={index} className="plastic-surgery-product-card">
                <div className="plastic-surgery-product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="plastic-surgery-product-image"
                  />
                </div>
                <h3 className="plastic-surgery-product-title">
                  {product.title}
                </h3>
                <p className="plastic-surgery-product-description">
                  {product.description}
                </p>
                <button className="plastic-surgery-contact-button">
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

export default PlasticSurgery;
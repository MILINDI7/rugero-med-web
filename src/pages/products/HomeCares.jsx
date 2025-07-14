import React from 'react';
import './HomeCares.css';
import { useLocation } from 'react-router-dom';
const HomeCares = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  if (!products.length) {
    return <p className="no-product-message">No products available in this category.</p>;
  }
  return (
    <div className="home-cares-container">
      {/* Header section with title */}
      <div className="home-cares-header">
        <div className="home-cares-header-content">
          <h1 className="home-cares-title">
            Home Care Products
          </h1>
        </div>
      </div>

      {/* Products section */}
      <div className="home-cares-products-section">
        <div className="home-cares-products-container">
          <div className="home-cares-products-grid">

            {products.map((product, index) => (
              <div key={index} className="home-cares-product-card">
                <div className="home-cares-product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="home-cares-product-image"
                  />
                </div>
                <h3 className="home-cares-product-title">
                  {product.title}
                </h3>
                <p className="home-cares-product-description">
                  {product.description}
                </p>
                <button className="home-cares-contact-button">
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

export default HomeCares;
import React from 'react';
import './Theatre.css';
import { useLocation } from 'react-router-dom';
const Theatre = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  if (!products.length) {
    return <p className='no-product-message'>No products available in this category.</p>;
  }
  return (
    <div className="theatre-container">
      {/* Header section with title */}
      <div className="theatre-header">
        <div className="theatre-header-content">
          <h1 className="theatre-title">
            Theatre Products
          </h1>
        </div>
      </div>

      {/* Products section */}
      <div className="theatre-products-section">
        <div className="theatre-products-container">
          <div className="theatre-products-grid">
            
            {products.map((product, index) => (
              <div key={index} className="theatre-product-card">
                <div className="theatre-product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="theatre-product-image"
                  />
                </div>
                <h3 className="theatre-product-title">
                  {product.title}
                </h3>
                <p className="theatre-product-description">
                  {product.description}
                </p>
                <button className="theatre-contact-button">
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

export default Theatre;
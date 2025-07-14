import React from 'react';
import './HospitalDesign.css';
import { useLocation } from 'react-router-dom';
const HospitalDesign = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  if (!products.length) {
    return <p className="no-product-message">No products available in this category.</p>;
  }
  return (
    <div className="hospital-design-container">
      {/* Header section with title */}
      <div className="hospital-design-header">
        <div className="hospital-design-header-content">
          <h1 className="hospital-design-title">
            Hospital Design Products
          </h1>
        </div>
      </div>

      {/* Products section */}
      <div className="hospital-design-products-section">
        <div className="hospital-design-products-container">
          <div className="hospital-design-products-grid">
            
            {products.map((product, index) => (
              <div key={index} className="hospital-design-product-card">
                <div className="hospital-design-product-image-container">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="hospital-design-product-image"
                  />
                </div>
                <h3 className="hospital-design-product-title">
                  {product.title}
                </h3>
                <p className="hospital-design-product-description">
                  {product.description}
                </p>
                <button className="hospital-design-contact-button">
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

export default HospitalDesign;
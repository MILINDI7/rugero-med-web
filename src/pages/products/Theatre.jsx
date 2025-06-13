import React from 'react';
import './Theatre.css';

const Theatre = () => {
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
            
            {/* Operating Tables */}
            <div className="theatre-product-card">
              <div className="theatre-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Operating Tables - Surgical positioning equipment" 
                  className="theatre-product-image"
                />
              </div>
              <h3 className="theatre-product-title">
                Operating Tables
              </h3>
              <p className="theatre-product-description">
                Advanced surgical tables with<br />
                precision positioning and<br />
                patient safety features
              </p>
              <button className="theatre-contact-button">
                Contact Us
              </button>
            </div>

            {/* Surgical Lighting */}
            <div className="theatre-product-card">
              <div className="theatre-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Surgical Lighting - Operating theater illumination" 
                  className="theatre-product-image"
                />
              </div>
              <h3 className="theatre-product-title">
                Surgical Lighting Systems
              </h3>
              <p className="theatre-product-description">
                High-intensity LED surgical<br />
                lights with shadow-free<br />
                illumination technology
              </p>
              <button className="theatre-contact-button">
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Theatre;
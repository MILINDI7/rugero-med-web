import React from 'react';
import './CSSD.css';

const CSSD = () => {
  return (
    <div className="cssd-container">
      {/* Header section with title */}
      <div className="cssd-header">
        <div className="cssd-header-content">
          <h1 className="cssd-title">
            CSSD Products
          </h1>
        </div>
      </div>

      {/* Products section */}
      <div className="cssd-products-section">
        <div className="cssd-products-container">
          <div className="cssd-products-grid">
            
            {/* Catheter Extension Tubing */}
            <div className="cssd-product-card">
              <div className="cssd-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Catheter Extension Tubing - Medical procedure illustration" 
                  className="cssd-product-image"
                />
              </div>
              <h3 className="cssd-product-title">
                Catheter Extension Tubing
              </h3>
              <p className="cssd-product-description">
                18" tubing with graduated<br />
                connector
              </p>
              <button className="cssd-contact-button">
                Contact Us
              </button>
            </div>

            {/* Thoracic Chest Drainage */}
            <div className="cssd-product-card">
              <div className="cssd-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Thoracic Chest Drainage - Medical equipment illustration" 
                  className="cssd-product-image"
                />
              </div>
              <h3 className="cssd-product-title">
                Thoracic Chest Drainage
              </h3>
              <p className="cssd-product-description">
                It Provides Reliable Suction for<br />
                Surgical Cases with Larger<br />
                Amounts of Drainage
              </p>
              <button className="cssd-contact-button">
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSD;
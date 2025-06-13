import React from 'react';
import './PlasticSurgery.css';

const PlasticSurgery = () => {
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
            
            {/* Surgical Instruments */}
            <div className="plastic-surgery-product-card">
              <div className="plastic-surgery-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Plastic Surgery Instruments - Precision surgical tools" 
                  className="plastic-surgery-product-image"
                />
              </div>
              <h3 className="plastic-surgery-product-title">
                Precision Surgical Instruments
              </h3>
              <p className="plastic-surgery-product-description">
                High-quality instruments for<br />
                cosmetic and reconstructive<br />
                surgical procedures
              </p>
              <button className="plastic-surgery-contact-button">
                Contact Us
              </button>
            </div>

            {/* Implants & Materials */}
            <div className="plastic-surgery-product-card">
              <div className="plastic-surgery-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Plastic Surgery Implants - Medical grade materials" 
                  className="plastic-surgery-product-image"
                />
              </div>
              <h3 className="plastic-surgery-product-title">
                Implants & Biomaterials
              </h3>
              <p className="plastic-surgery-product-description">
                Medical-grade implants and<br />
                biomaterials for aesthetic<br />
                and reconstructive procedures
              </p>
              <button className="plastic-surgery-contact-button">
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlasticSurgery;
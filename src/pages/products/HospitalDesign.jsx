import React from 'react';
import './HospitalDesign.css';

const HospitalDesign = () => {
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
            
            {/* Medical Facility Planning */}
            <div className="hospital-design-product-card">
              <div className="hospital-design-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Medical Facility Planning - Hospital layout design" 
                  className="hospital-design-product-image"
                />
              </div>
              <h3 className="hospital-design-product-title">
                Medical Facility Planning
              </h3>
              <p className="hospital-design-product-description">
                Comprehensive hospital layout<br />
                and infrastructure design<br />
                solutions
              </p>
              <button className="hospital-design-contact-button">
                Contact Us
              </button>
            </div>

            {/* Operating Theater Design */}
            <div className="hospital-design-product-card">
              <div className="hospital-design-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Operating Theater Design - Surgical suite layout" 
                  className="hospital-design-product-image"
                />
              </div>
              <h3 className="hospital-design-product-title">
                Operating Theater Design
              </h3>
              <p className="hospital-design-product-description">
                State-of-the-art surgical suite<br />
                design with optimal workflow<br />
                and safety standards
              </p>
              <button className="hospital-design-contact-button">
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDesign;
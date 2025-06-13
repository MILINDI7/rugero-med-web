import React from 'react';
import './HomeCares.css';

const HomeCares = () => {
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
            
            {/* Medical Equipment */}
            <div className="home-cares-product-card">
              <div className="home-cares-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Home Medical Equipment - Patient care devices" 
                  className="home-cares-product-image"
                />
              </div>
              <h3 className="home-cares-product-title">
                Home Medical Equipment
              </h3>
              <p className="home-cares-product-description">
                Essential medical devices for<br />
                safe and effective home<br />
                patient care
              </p>
              <button className="home-cares-contact-button">
                Contact Us
              </button>
            </div>

            {/* Patient Monitoring */}
            <div className="home-cares-product-card">
              <div className="home-cares-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Patient Monitoring - Home health monitoring systems" 
                  className="home-cares-product-image"
                />
              </div>
              <h3 className="home-cares-product-title">
                Patient Monitoring Systems
              </h3>
              <p className="home-cares-product-description">
                Remote monitoring solutions<br />
                for continuous patient health<br />
                tracking at home
              </p>
              <button className="home-cares-contact-button">
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCares;
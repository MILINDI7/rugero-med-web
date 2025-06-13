import React from 'react';
import './Neurosurgery.css';

const Neurosurgery = () => {
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
            
            {/* Microsurgical Instruments */}
            <div className="neurosurgery-product-card">
              <div className="neurosurgery-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Microsurgical Instruments - Precision neurosurgery tools" 
                  className="neurosurgery-product-image"
                />
              </div>
              <h3 className="neurosurgery-product-title">
                Microsurgical Instruments
              </h3>
              <p className="neurosurgery-product-description">
                Ultra-precise instruments for<br />
                delicate brain and spine<br />
                surgical procedures
              </p>
              <button className="neurosurgery-contact-button">
                Contact Us
              </button>
            </div>

            {/* Neuro Monitoring Systems */}
            <div className="neurosurgery-product-card">
              <div className="neurosurgery-product-image-container">
                <img 
                  src="/api/placeholder/300/250" 
                  alt="Neuro Monitoring Systems - Brain monitoring equipment" 
                  className="neurosurgery-product-image"
                />
              </div>
              <h3 className="neurosurgery-product-title">
                Neuro Monitoring Systems
              </h3>
              <p className="neurosurgery-product-description">
                Advanced monitoring equipment<br />
                for real-time neurological<br />
                function assessment
              </p>
              <button className="neurosurgery-contact-button">
                Contact Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Neurosurgery;

import './CSSD.css';
import {useLocation} from 'react-router-dom';
const CSSD = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };
  if (!products.length) {
    return <div className="error-message">No products available in this category.</div>;
  }
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
            
            {products.map((product, index) => (
        <div key={index} className="cssd-product-card">
          <div className="cssd-product-image-container">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="cssd-product-image"
            />
          </div>
          <h3 className="cssd-product-title">
            {product.title}
          </h3>
          <p className="cssd-product-description">
            {product.description}
          </p>
          <button className="cssd-contact-button">
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

export default CSSD;
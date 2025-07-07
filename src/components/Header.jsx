import { useState } from "react";
import { Link } from "react-router-dom";
import { Person } from '@mui/icons-material';
import "./Header.css";

const Header = () => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProductsMouseEnter = () => {
    if (window.innerWidth > 768) {
      setIsProductsDropdownOpen(true);
    }
  };

  const handleProductsMouseLeave = () => {
    if (window.innerWidth > 768) {
      setIsProductsDropdownOpen(false);
    }
  };

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProductsDropdownOpen(false);
  };

  const closeAllMenus = () => {
    setIsProductsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-title">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="RugeroMed Logo"
            className="header-logo"
          />
        </div>

        {/* Hamburger Button */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="header-link" onClick={closeAllMenus}>
            Home
          </Link>
          <Link to="/projects" className="header-link" onClick={closeAllMenus}>
            Projects
          </Link>
          
          {/* Products dropdown */}
          <div 
            className="header-dropdown"
            onMouseEnter={handleProductsMouseEnter}
            onMouseLeave={handleProductsMouseLeave}
          >
            <Link 
              to="/products" 
              className="header-link dropdown-trigger"
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault();
                  toggleProductsDropdown();
                }
              }}
            >
              Products
              <span className={`dropdown-arrow ${isProductsDropdownOpen ? 'open' : ''}`}>▼</span>
            </Link>
            
            {isProductsDropdownOpen && (
              <div className="dropdown-menu">
                <Link 
                  to="/products/cssd" 
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  CSSD
                </Link>
                <Link 
                  to="/products/hospital-design" 
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Hospital Design
                </Link>
                <Link 
                  to="/products/plastic-surgery" 
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Plastic Surgery
                </Link>
                <Link 
                  to="/products/neurosurgery" 
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Neurosurgery
                </Link>
                <Link 
                  to="/products/theatre" 
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Theatre
                </Link>
                <Link 
                  to="/products/home-cares" 
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Home Cares
                </Link>
                <Link 
                  to="/products" 
                  className="dropdown-item all-products"
                  onClick={closeAllMenus}
                >
                  All Products
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/our-team" className="header-link" onClick={closeAllMenus}>
            Our Team
          </Link>
          <Link to="/news" className="header-link" onClick={closeAllMenus}>
            News
          </Link>
          <Link to="/contact" className="header-link" onClick={closeAllMenus}>
            Contact
          </Link>

          <Link 
            to="/admin-dashboard" 
            className="header-link admin-link" 
            onClick={closeAllMenus}
            title="Admin Dashboard"
          >
            <Person className="admin-icon" />
          </Link>
          
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeAllMenus}></div>
        )}
      </div>
    </header>
  );
};

export default Header;
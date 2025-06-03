import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="header-container">
      <div className="header-logo-title">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="RugeroMed Logo"
          className="header-logo"
        />
      </div>
      <nav className="header-nav">
        <Link to="/" className="header-link">Home</Link>
        <Link to="/projects" className="header-link">Projects</Link>
        <Link to="/products" className="header-link">Products</Link>
        <Link to="/our-team" className="header-link">Our Team</Link>
        <Link to="/news" className="header-link">News</Link>
        <Link to="/contact" className="header-link">Contact</Link>
      </nav>
    </div>
  </header>
);

export default Header;

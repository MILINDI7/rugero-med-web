// Make sure to import React and Link if needed
import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

// Define the products array
const products = [
  // CSSD Products
  { name: "Catheter Extension Tubing", image: "/images/catheter-tubing.jpg", price: "Contact Us", category: "CSSD" },
  { name: "Thoracic Chest Drainage", image: "/images/thoracic-drainage.jpg", price: "Contact Us", category: "CSSD" },
  
  // Hospital Design Products
  { name: "Medical Facility Planning", image: "/images/facility-planning.jpg", price: "Contact Us", category: "Hospital Design" },
  { name: "Operating Theater Design", image: "/images/theater-design.jpg", price: "Contact Us", category: "Hospital Design" },
  
  // Plastic Surgery Products
  { name: "Precision Surgical Instruments", image: "/images/plastic-surgery-instruments.jpg", price: "Contact Us", category: "Plastic Surgery" },
  { name: "Implants & Biomaterials", image: "/images/implants-biomaterials.jpg", price: "Contact Us", category: "Plastic Surgery" },
  
  // Neurosurgery Products
  { name: "Microsurgical Instruments", image: "/images/microsurgical-instruments.jpg", price: "Contact Us", category: "Neurosurgery" },
  { name: "Neuro Monitoring Systems", image: "/images/neuro-monitoring.jpg", price: "Contact Us", category: "Neurosurgery" },
  
  // Theatre Products
  { name: "Operating Tables", image: "/images/operating-tables.jpg", price: "Contact Us", category: "Theatre" },
  { name: "Surgical Lighting Systems", image: "/images/surgical-lighting.jpg", price: "Contact Us", category: "Theatre" },
  
  // Home Care Products
  { name: "Home Medical Equipment", image: "/images/home-medical-equipment.jpg", price: "Contact Us", category: "Home Care" },
  { name: "Patient Monitoring Systems", image: "/images/patient-monitoring.jpg", price: "Contact Us", category: "Home Care" },
];

const Products = () => (
  <section className="products-section">
    <div className="products-container">
      <h2 className="products-title">All Products</h2>
      
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
            />
            <div className="product-category">
              <span className="category-badge">
                {product.category}
              </span>
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <button className="learn-more-btn">
              Learn More
            </button>
          </div>
        ))}
      </div>
      
      <div className="category-navigation">
        <h3 className="category-nav-title">Explore by Category</h3>
        <div className="category-links">
          <Link to="/products/cssd" className="category-link">CSSD</Link>
          <Link to="/products/hospital-design" className="category-link">Hospital Design</Link>
          <Link to="/products/plastic-surgery" className="category-link">Plastic Surgery</Link>
          <Link to="/products/neurosurgery" className="category-link">Neurosurgery</Link>
          <Link to="/products/theatre" className="category-link">Theatre</Link>
          <Link to="/products/home-cares" className="category-link">Home Care</Link>
        </div>
      </div>
    </div>
  </section>
);

export default Products;
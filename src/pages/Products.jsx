
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Products.css';
import { fetchProducts } from '../redux/actions';
import LoadingSpinner from '../components/LoadingSpinner';

const Products = () => {
  const dispatch = useDispatch();
  const {data, pending, error} = useSelector((state) => state.products);
  const plasticSurgeryProducts = data?.products?.filter(product => product.category === 'Plastic Surgery');
  const cssdProducts = data?.products?.filter(product => product.category === 'CSSD');
  const hospitalDesignProducts = data?.products?.filter(product => product.category === 'Hospital Design');
  const neurosurgeryProducts = data?.products?.filter(product => product.category === 'Neurosurgery');
  const theatreProducts = data?.products?.filter(product => product.category === 'Theatre');
  const homeCaresProducts = data?.products?.filter(product => product.category === 'Home Care');
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if(pending) return <LoadingSpinner />;
  if(error) return <div className="error-message">{error}</div>;
  return (
    <section className="products-section">
      <div className="products-container">
        <h2 className="products-title">All Products</h2>

        <div className="products-grid">
        {data?.products?.map((product, index) => (
          <div key={index} className="product-card">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="product-image" 
            />
            <div className="product-category">
              <span className="category-badge">
                {product.category}
              </span>
            </div>
            <h3 className="product-name">{product.title}</h3>
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
          <Link state={{ products: cssdProducts }} to="/products/cssd" className="category-link">CSSD</Link>
          <Link state={{ products: hospitalDesignProducts }} to="/products/hospital-design" className="category-link">Hospital Design</Link>
          <Link state={{ products: plasticSurgeryProducts }} to="/products/plastic-surgery" className="category-link">Plastic Surgery</Link>
          <Link state={{ products: neurosurgeryProducts }} to="/products/neurosurgery" className="category-link">Neurosurgery</Link>
          <Link state={{ products: theatreProducts }} to="/products/theatre" className="category-link">Theatre</Link>
          <Link state={{ products: homeCaresProducts }} to="/products/home-cares" className="category-link">Home Care</Link>
        </div>
      </div>
    </div>
  </section>)
};

export default Products;
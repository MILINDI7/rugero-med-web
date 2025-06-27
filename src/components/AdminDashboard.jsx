import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsDashboard from './ProductsDashboard';
import { 
  Users, 
  ShoppingBag, 
  Newspaper, // Changed icon for News
  LogOut 
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <img 
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="Logo" 
            className="sidebar-logo"
          />
          <h3>Admin Panel</h3>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Users /> Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <ShoppingBag /> Products
          </button>
          <button 
            className={`nav-item ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <Newspaper /> News
          </button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="admin-profile">
            <span>Admin User</span>
            <img 
              src={`${process.env.PUBLIC_URL}/images/admin-avatar.png`}
              alt="Admin" 
              className="admin-avatar"
            />
          </div>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <div className="stat-card">
                <h3>Total Products</h3>
                <p>150</p>
              </div>
              <div className="stat-card">
                <h3>Total News</h3>
                <p>24</p>
              </div>
              <div className="stat-card">
                <h3>New Orders</h3>
                <p>12</p>
              </div>
              <div className="stat-card">
                <h3>Visitors</h3>
                <p>1,234</p>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-section">
              <h3>Product Management</h3>
              <ProductsDashboard />
            </div>
          )}

          {activeTab === 'news' && (
            <div className="news-section">
              <h3>News Management</h3>
              {/* Add your news management content here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
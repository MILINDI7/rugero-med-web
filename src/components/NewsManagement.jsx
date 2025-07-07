// NewsManagement.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search, Plus, Edit, Trash2, Eye, Newspaper } from 'lucide-react';
import './NewsManagement.css';

// Initial news data
const initialNews = [
  {
    _id: '1',
    title: "RugeroMed Introduces Advanced Hospital Bed Equipment",
    image: "/images/hospital-bed.jpg",
    description: "RugeroMed, a leading medical equipment store, has launched a new range of advanced hospital beds...",
    link: "/news/hospital-beds",
    category: "Product Launch",
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: "RugeroMed Advances Inventory Management",
    image: "/images/inventory.jpg",
    description: "Improved logistics and distribution systems for better facility support.",
    link: "/news/inventory",
    category: "Company News",
    createdAt: new Date('2024-01-20')
  }
];

// Initial impact stories data
const initialImpactStories = [
  {
    _id: '1',
    title: "RugeroMed Pioneers Green Healthcare Solutions",
    icon: "♻️",
    link: "/impact/green-solutions",
    category: "Environmental",
    createdAt: new Date('2024-02-01')
  },
  {
    _id: '2',
    title: "RugeroMed Expands Access to Advanced Diagnostic Devices",
    icon: "🩺",
    link: "/impact/diagnostic-access",
    category: "Healthcare Access",
    createdAt: new Date('2024-02-05')
  }
];

const categories = ['All', 'Product Launch', 'Company News', 'Environmental', 'Healthcare Access', 'Technology'];

// Helper functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const isNewsItem = (item) => {
  return 'description' in item;
};

const handleImageError = (e) => {
  e.target.onerror = null; // Prevent infinite loop
  e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`;
};

const NewsManagement = ({ onStatsUpdate }) => {
  // State management
  const [news, setNews] = useState(() => {
    const savedNews = localStorage.getItem('news');
    return savedNews ? JSON.parse(savedNews) : initialNews;
  });
  
  const [impactStories, setImpactStories] = useState(() => {
    const savedStories = localStorage.getItem('impactStories');
    return savedStories ? JSON.parse(savedStories) : initialImpactStories;
  });

  const [filteredItems, setFilteredItems] = useState([...news, ...impactStories]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState('news');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newItem, setNewItem] = useState({
    title: '',
    image: '',
    description: '',
    link: '',
    category: 'Product Launch',
    icon: '',
    createdAt: new Date()
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('impactStories', JSON.stringify(impactStories));
  }, [impactStories]);

  // Update parent component with stats
  useEffect(() => {
    const totalItems = news.length + impactStories.length;
    onStatsUpdate?.(totalItems);
    
    return () => {
      // Cleanup if needed
    };
  }, [news, impactStories, onStatsUpdate]);

  // Filter items based on search and category
  useEffect(() => {
    try {
      setIsLoading(true);
      let filtered = [...news, ...impactStories];
      
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(item => item.category === selectedCategory);
      }
      
      if (searchTerm) {
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      setFilteredItems(filtered);
    } catch (err) {
      setError('Error filtering items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [news, impactStories, searchTerm, selectedCategory]);
    // Form validation and CRUD operations
  const validateForm = (item) => {
    const errors = [];
    if (!item.title.trim()) errors.push('Title is required');
    if (!item.category) errors.push('Category is required');
    if (!item.link.trim()) errors.push('Link is required');
    
    if (itemType === 'news') {
      if (!item.image.trim()) errors.push('Image URL is required');
      if (!item.description.trim()) errors.push('Description is required');
    }
    
    if (itemType === 'impact' && !item.icon.trim()) {
      errors.push('Icon is required');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleAddItem = () => {
    try {
      if (!validateForm(newItem)) return;

      const item = {
        _id: Date.now().toString(),
        ...newItem,
        createdAt: new Date()
      };

      if (itemType === 'news') {
        setNews(prev => [...prev, item]);
      } else {
        setImpactStories(prev => [...prev, item]);
      }

      setNewItem({
        title: '',
        image: '',
        description: '',
        link: '',
        category: 'Product Launch',
        icon: '',
        createdAt: new Date()
      });
      setShowAddModal(false);
    } catch (err) {
      setError('Error adding item');
      console.error(err);
    }
  };

  const handleEditItem = () => {
    try {
      if (!validateForm(selectedItem)) return;

      if (isNewsItem(selectedItem)) {
        setNews(prev => prev.map(item => 
          item._id === selectedItem._id ? { ...selectedItem, updatedAt: new Date() } : item
        ));
      } else {
        setImpactStories(prev => prev.map(item => 
          item._id === selectedItem._id ? { ...selectedItem, updatedAt: new Date() } : item
        ));
      }
      setShowEditModal(false);
      setSelectedItem(null);
    } catch (err) {
      setError('Error updating item');
      console.error(err);
    }
  };

  const handleDeleteItem = (itemId) => {
    try {
      if (window.confirm('Are you sure you want to delete this item?')) {
        setNews(prev => prev.filter(item => item._id !== itemId));
        setImpactStories(prev => prev.filter(item => item._id !== itemId));
      }
    } catch (err) {
      setError('Error deleting item');
      console.error(err);
    }
  };

  // Component for displaying news/impact story cards
  const NewsCard = ({ item }) => (
    <div className="news-card">
      <div className="news-card-image-container">
        {item.image ? (
          <img 
            src={`${process.env.PUBLIC_URL}${item.image}`}
            alt={item.title}
            className="news-card-image"
            onError={handleImageError}
          />
        ) : item.icon ? (
          <div className="news-card-icon">
            {item.icon}
          </div>
        ) : null}
        <div className="news-card-category">
          <span className="category-badge">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="news-card-content">
        <h3 className="news-card-title">{item.title}</h3>
        {item.description && (
          <p className="news-card-description">{item.description}</p>
        )}
        
        <div className="news-card-footer">
          <span className="news-card-date">
            {formatDate(item.createdAt)}
          </span>
          <div className="news-card-actions">
            <button
              onClick={() => {
                setSelectedItem(item);
                setShowViewModal(true);
              }}
              className="action-button view-button"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => {
                setSelectedItem(item);
                setShowEditModal(true);
              }}
              className="action-button edit-button"
              title="Edit Item"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteItem(item._id)}
              className="action-button delete-button"
              title="Delete Item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button
              onClick={onClose}
              className="modal-close-button"
            >
              ×
            </button>
          </div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  };
    // Main render
  return (
    <div className="news-management">
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Header */}
      <div className="news-management-header">
        <div className="header-content">
          <div className="header-title">
            <h1>News Management</h1>
            <p>Manage your news and impact stories</p>
          </div>
          <div className="header-actions">
            <button
              onClick={() => {
                setItemType('news');
                setShowAddModal(true);
              }}
              className="add-button news-button"
            >
              <Plus size={20} />
              <span>Add News</span>
            </button>
            <button
              onClick={() => {
                setItemType('impact');
                setShowAddModal(true);
              }}
              className="add-button impact-button"
            >
              <Plus size={20} />
              <span>Add Impact Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : filteredItems.length > 0 ? (
          <div className="items-grid">
            {filteredItems.map(item => (
              <NewsCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Newspaper size={64} />
            <h3>No items found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={`Add ${itemType === 'news' ? 'News' : 'Impact Story'}`}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddItem();
        }} className="item-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              placeholder="Enter title"
            />
          </div>

          {itemType === 'news' && (
            <>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  rows={3}
                  placeholder="Enter description"
                />
              </div>
            </>
          )}

          {itemType === 'impact' && (
            <div className="form-group">
              <label>Icon</label>
              <input
                type="text"
                value={newItem.icon}
                onChange={(e) => setNewItem({...newItem, icon: e.target.value})}
                placeholder="Enter emoji icon"
              />
            </div>
          )}

          <div className="form-group">
            <label>Link</label>
            <input
              type="text"
              value={newItem.link}
              onChange={(e) => setNewItem({...newItem, link: e.target.value})}
              placeholder="Enter link"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            >
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              Add Item
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Item"
      >
        {selectedItem && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleEditItem();
          }} className="item-form">
            {/* Same form fields as Add Modal */}
            {/* ... */}
          </form>
        )}
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Item Details"
      >
        {selectedItem && (
          <div className="item-details">
            {selectedItem.image && (
              <img 
                src={`${process.env.PUBLIC_URL}${selectedItem.image}`}
                alt={selectedItem.title}
                onError={handleImageError}
              />
            )}
            {selectedItem.icon && (
              <div className="item-icon">
                {selectedItem.icon}
              </div>
            )}
            <h3>{selectedItem.title}</h3>
            <span className="item-category">{selectedItem.category}</span>
            {selectedItem.description && (
              <p className="item-description">{selectedItem.description}</p>
            )}
            <a href={selectedItem.link} target="_blank" rel="noopener noreferrer">
              View Link
            </a>
            <p className="item-date">
              Created: {formatDate(selectedItem.createdAt)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

NewsManagement.propTypes = {
  onStatsUpdate: PropTypes.func
};

export default NewsManagement;
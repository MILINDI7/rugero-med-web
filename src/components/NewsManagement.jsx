// NewsManagement.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search, Plus, Edit, Trash2, Eye, Newspaper } from 'lucide-react';
import './NewsManagement.css';
import { backendUrl } from '../config';
import Modal from './Modal';
import axios from 'axios';

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
  const [news, setNews] = useState([]);
  const [impactStories, setImpactStories] = useState([
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
  ]);
  const [filteredItems, setFilteredItems] = useState([]);
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
    image: null,
    description: '',
    category: 'Product Launch',
    icon: '',
    createdAt: new Date()
  });

  // Fetch news from backend on mount
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${backendUrl}/news/`);
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        // Backend returns { news: [...] }
        setNews(data.news || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Update parent component with stats
  useEffect(() => {
    const totalItems = news.length + impactStories.length;
    onStatsUpdate?.(totalItems);
  }, [news, impactStories, onStatsUpdate]);

  // Filter items based on search and category
  useEffect(() => {
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
  }, [news, impactStories, searchTerm, selectedCategory]);

  // Form validation and CRUD operations
  const validateForm = (item) => {
    const errors = [];
    if (!item.title.trim()) errors.push('Title is required');
    if (!item.category) errors.push('Category is required');
    if (itemType === 'news') {
      if (!item.image) errors.push('Image is required');
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

  // Add News (POST to backend)
  const handleAddItem = async () => {
    const authToken = localStorage.getItem('authToken');
    if (itemType === 'news') {
      if (!validateForm(newItem)) return;
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('title', newItem.title);
        formData.append('category', newItem.category);
        formData.append('description', newItem.description);
        formData.append('image', newItem.image);
        const res = await axios.post(`${backendUrl}/news/`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${authToken}`,
					},
				})
        if (!res.ok) throw new Error('Failed to add news');
        const added = await res.json();
        setNews(prev => [...prev, added]);
        setShowAddModal(false);
        setNewItem({
          title: '',
          image: null,
          description: '',
          category: 'Product Launch',
          icon: '',
          createdAt: new Date()
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Impact stories remain local
      if (!validateForm(newItem)) return;
      setImpactStories(prev => [...prev, { ...newItem, _id: Date.now().toString(), createdAt: new Date() }]);
      setShowAddModal(false);
      setNewItem({
        title: '',
        image: null,
        description: '',
        category: 'Product Launch',
        icon: '',
        createdAt: new Date()
      });
    }
  };

  // Edit News (PATCH to backend)
  const handleEditItem = async () => {
    if (isNewsItem(selectedItem)) {
      if (!validateForm(selectedItem)) return;
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('title', selectedItem.title);
        formData.append('category', selectedItem.category);
        formData.append('description', selectedItem.description);
        if (selectedItem.image instanceof File) {
          formData.append('image', selectedItem.image);
        }
        const res = await fetch(`${backendUrl}/news/${selectedItem._id}`, {
          method: 'PATCH',
          body: formData
        });
        if (!res.ok) throw new Error('Failed to update news');
        const updated = await res.json();
        setNews(prev => prev.map(item => item._id === updated._id ? updated : item));
        setShowEditModal(false);
        setSelectedItem(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Impact stories remain local
      if (!validateForm(selectedItem)) return;
      setImpactStories(prev => prev.map(item => item._id === selectedItem._id ? { ...selectedItem, updatedAt: new Date() } : item));
      setShowEditModal(false);
      setSelectedItem(null);
    }
  };

  // Delete News (DELETE to backend)
  const handleDeleteItem = async (itemId) => {
    if (news.some(item => item._id === itemId)) {
      if (!window.confirm('Are you sure you want to delete this news item?')) return;
      setIsLoading(true);
      try {
        const res = await fetch(`${backendUrl}/news/${itemId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete news');
        setNews(prev => prev.filter(item => item._id !== itemId));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Impact stories remain local
      setImpactStories(prev => prev.filter(item => item._id !== itemId));
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
          {['All', 'Product Launch', 'Company News', 'Environmental', 'Healthcare Access', 'Technology'].map(category => (
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
        className="mt-16"
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
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewItem({...newItem, image: e.target.files[0]})}
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
            <label>Category</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            >
              {['Product Launch', 'Company News', 'Environmental', 'Healthcare Access', 'Technology'].map(category => (
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
        className="mt-16"
      >
        {selectedItem && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleEditItem();
          }} className="item-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={selectedItem.title}
                onChange={(e) => setSelectedItem({...selectedItem, title: e.target.value})}
                placeholder="Enter title"
              />
            </div>

            {isNewsItem(selectedItem) && (
              <>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedItem({...selectedItem, image: e.target.files[0]})}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={selectedItem.description}
                    onChange={(e) => setSelectedItem({...selectedItem, description: e.target.value})}
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
                  value={selectedItem.icon}
                  onChange={(e) => setSelectedItem({...selectedItem, icon: e.target.value})}
                  placeholder="Enter emoji icon"
                />
              </div>
            )}

            <div className="form-group">
              <label>Category</label>
              <select
                value={selectedItem.category}
                onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})}
              >
                {['Product Launch', 'Company News', 'Environmental', 'Healthcare Access', 'Technology'].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
              >
                Save Changes
              </button>
            </div>
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
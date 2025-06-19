import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter, BarChart3, Package, TrendingUp } from 'lucide-react';

// Mock data based on your existing products with added descriptions
const initialProducts = [
  {
    _id: '1',
    name: "Catheter Extension Tubing",
    image: "/images/catheter-tubing.jpg",
    category: "CSSD",
    description: "High-quality extension tubing for catheter systems, ensuring secure connections and optimal fluid flow.",
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    name: "Thoracic Chest Drainage",
    image: "/images/thoracic-drainage.jpg",
    category: "CSSD",
    description: "Advanced chest drainage systems for thoracic procedures, featuring reliable suction and monitoring capabilities.",
    createdAt: new Date('2024-01-20')
  },
  {
    _id: '3',
    name: "Medical Facility Planning",
    image: "/images/facility-planning.jpg",
    category: "Hospital Design",
    description: "Comprehensive planning services for medical facilities, optimizing workflow and patient care environments.",
    createdAt: new Date('2024-02-05')
  },
  {
    _id: '4',
    name: "Operating Theater Design",
    image: "/images/theater-design.jpg",
    category: "Hospital Design",
    description: "Specialized design services for operating theaters, ensuring sterile environments and efficient layouts.",
    createdAt: new Date('2024-02-10')
  },
  {
    _id: '5',
    name: "Precision Surgical Instruments",
    image: "/images/plastic-surgery-instruments.jpg",
    category: "Plastic Surgery",
    description: "High-precision surgical instruments designed for plastic and reconstructive surgery procedures.",
    createdAt: new Date('2024-02-15')
  },
  {
    _id: '6',
    name: "Implants & Biomaterials",
    image: "/images/implants-biomaterials.jpg",
    category: "Plastic Surgery",
    description: "Premium implants and biomaterials for reconstructive and aesthetic surgical procedures.",
    createdAt: new Date('2024-02-20')
  },
  {
    _id: '7',
    name: "Microsurgical Instruments",
    image: "/images/microsurgical-instruments.jpg",
    category: "Neurosurgery",
    description: "Ultra-precise microsurgical instruments for delicate neurosurgical procedures and brain surgery.",
    createdAt: new Date('2024-03-01')
  },
  {
    _id: '8',
    name: "Neuro Monitoring Systems",
    image: "/images/neuro-monitoring.jpg",
    category: "Neurosurgery",
    description: "Advanced neurological monitoring systems for real-time patient assessment during surgery.",
    createdAt: new Date('2024-03-05')
  },
  {
    _id: '9',
    name: "Operating Tables",
    image: "/images/operating-tables.jpg",
    category: "Theatre",
    description: "Versatile operating tables with advanced positioning capabilities for various surgical procedures.",
    createdAt: new Date('2024-03-10')
  },
  {
    _id: '10',
    name: "Surgical Lighting Systems",
    image: "/images/surgical-lighting.jpg",
    category: "Theatre",
    description: "LED surgical lighting systems providing optimal illumination for precise surgical work.",
    createdAt: new Date('2024-03-15')
  },
  {
    _id: '11',
    name: "Home Medical Equipment",
    image: "/images/home-medical-equipment.jpg",
    category: "Home Care",
    description: "Comprehensive home medical equipment for patient care and rehabilitation in domestic settings.",
    createdAt: new Date('2024-03-20')
  },
  {
    _id: '12',
    name: "Patient Monitoring Systems",
    image: "/images/patient-monitoring.jpg",
    category: "Home Care",
    description: "Remote patient monitoring systems for continuous health tracking and telemedicine applications.",
    createdAt: new Date('2024-03-25')
  }
];

const categories = ['All', 'CSSD', 'Hospital Design', 'Plastic Surgery', 'Neurosurgery', 'Theatre', 'Home Care'];

const ProductsDashboard = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'analytics'
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    category: 'CSSD',
    description: ''
  });

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Calculate analytics data
  const analytics = {
    totalProducts: products.length,
    categoryCounts: categories.slice(1).map(category => ({
      category,
      count: products.filter(p => p.category === category).length
    })),
    recentProducts: products.slice(-5).reverse()
  };

  const handleAddProduct = () => {
    const product = {
      _id: Date.now().toString(),
      ...newProduct,
      createdAt: new Date()
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', image: '', category: 'CSSD', description: '' });
    setShowAddModal(false);
  };

  const handleEditProduct = () => {
    setProducts(products.map(p => 
      p._id === selectedProduct._id ? { ...selectedProduct } : p
    ));
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p._id !== productId));
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(product.createdAt).toLocaleDateString()}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedProduct(product);
                setShowViewModal(true);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => {
                setSelectedProduct(product);
                setShowEditModal(true);
              }}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
              title="Edit Product"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Product"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medical Products Dashboard</h1>
              <p className="text-gray-600">Manage your medical equipment and supplies</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView(currentView === 'grid' ? 'analytics' : 'grid')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentView === 'grid' ? <BarChart3 size={20} /> : <Package size={20} />}
                <span>{currentView === 'grid' ? 'Analytics' : 'Products'}</span>
              </button>
              {currentView === 'grid' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics View */}
      {currentView === 'analytics' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalProducts}</p>
                </div>
                <Package className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-3xl font-bold text-gray-900">{categories.length - 1}</p>
                </div>
                <Filter className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Additions</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.recentProducts.length}</p>
                </div>
                <TrendingUp className="text-purple-600" size={32} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Category</p>
                  <p className="text-lg font-bold text-gray-900">
                    {analytics.categoryCounts.reduce((a, b) => a.count > b.count ? a : b).category}
                  </p>
                </div>
                <BarChart3 className="text-orange-600" size={32} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Products by Category</h3>
              <div className="space-y-3">
                {analytics.categoryCounts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.count / analytics.totalProducts) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
              <div className="space-y-3">
                {analytics.recentProducts.map((product, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23f0f0f0"/%3E%3Ctext x="24" y="24" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle" dy=".3em"%3EImg%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid View */}
      {currentView === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Product"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={selectedProduct.image}
                onChange={(e) => setSelectedProduct({...selectedProduct, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedProduct.category}
                onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={selectedProduct.description}
                onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Product
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* View Product Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Product Details"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-64 h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"%3E%3Crect width="256" height="256" fill="%23f0f0f0"/%3E%3Ctext x="128" y="128" font-family="Arial" font-size="24" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h3>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                {selectedProduct.category}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Created Date</h4>
              <p className="text-gray-600">{new Date(selectedProduct.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductsDashboard;
import React, { useState, useEffect } from 'react';
import {
	Search,
	Plus,
	Edit,
	Trash2,
	Eye,
	BarChart3,
	Package,
} from 'lucide-react';
import '../pages/Products.css';
import axios from 'axios';
import { backendUrl } from '../config';
import Modal from './Modal';

const categories = [
	'All',
	'CSSD',
	'Hospital Design',
	'Plastic Surgery',
	'Neurosurgery',
	'Theatre',
	'Home Care',
];

const ProductsDashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [currentView, setCurrentView] = useState('grid');
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({
		name: '',
		image: '',
		category: 'CSSD',
		description: '',
	});

	const getProducts = async () => {
		try {
			const response = await axios.get(`${backendUrl}/products`);
			return response.data.products.map((p) => ({
				_id: p._id,
				name: p.title,
				image: p.imageUrl,
				category: p.category,
				description: p.description,
				createdAt: p.createdAt,
			}));
		} catch (error) {
			console.error('Error fetching products:', error);
			return [];
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const productsData = await getProducts();
			setProducts(productsData);
		};
		fetchData();
	}, []);

	useEffect(() => {
		let filtered = products;
		if (selectedCategory !== 'All') {
			filtered = filtered.filter(
				(p) => p.category === selectedCategory
			);
		}
		if (searchTerm.trim()) {
			const search = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(search) ||
					p.description.toLowerCase().includes(search)
			);
		}
		setFilteredProducts(filtered);
	}, [products, selectedCategory, searchTerm]);

	const handleAddProduct = async () => {
		const formData = new FormData();
		formData.append('title', newProduct.name);
		formData.append('image', newProduct.image);
		formData.append('category', newProduct.category);
		formData.append('description', newProduct.description);
		formData.append('createdAt', new Date().toISOString());

		const authToken = localStorage.getItem('authToken');
		try {
			const response = await axios.post(
				`${backendUrl}/products`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			const added = response.data;
			const normalized = {
				_id: added._id,
				name: added.title,
				image: added.imageUrl,
				category: added.category,
				description: added.description,
				createdAt: added.createdAt,
			};
			setProducts([...products, normalized]);
			setNewProduct({
				name: '',
				image: '',
				category: 'CSSD',
				description: '',
			});
			setShowAddModal(false);
		} catch (err) {
			console.error(err.response?.data || err.message);
		}
	};

	const handleEditProduct = async () => {
		try {
			const authToken = localStorage.getItem('authToken');
			await axios.put(
				`${backendUrl}/products/${selectedProduct._id}`,
				selectedProduct,
				{
					headers: { Authorization: `Bearer ${authToken}` },
				}
			);
			setProducts(
				products.map((p) =>
					p._id === selectedProduct._id ? selectedProduct : p
				)
			);
			setShowEditModal(false);
			setSelectedProduct(null);
		} catch (err) {
			console.error(err.response?.data || err.message);
		}
	};

	const handleDeleteProduct = async (productId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this product?'
		);
		if (!confirmDelete) return;
		try {
			const authToken = localStorage.getItem('authToken');
			await axios.delete(`${backendUrl}/products/${productId}`, {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			setProducts(products.filter((p) => p._id !== productId));
		} catch (err) {
			console.error(err.response?.data || err.message);
		}
	};

	const ProductCard = ({ product }) => (
		<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
			<div className="relative">
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-48 object-cover"
					onError={(e) =>
						(e.target.src =
							'https://via.placeholder.com/300x200?text=No+Image')
					}
				/>
				<div className="absolute top-2 right-2">
					<span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
						{product.category}
					</span>
				</div>
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
					{product.name}
				</h3>
				<p className="text-gray-600 text-sm mb-3 line-clamp-2">
					{product.description}
				</p>
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500">
						{new Date(
							product.createdAt
						).toLocaleDateString()}
					</span>
					<div className="flex space-x-2">
						<button
							onClick={() => {
								setSelectedProduct(product);
								setShowEditModal(true);
							}}
							className="p-2 text-green-600 hover:bg-green-50 rounded-full"
							title="Edit"
						>
							<Edit size={16} />
						</button>
						<button
							onClick={() =>
								handleDeleteProduct(product._id)
							}
							className="p-2 text-red-600 hover:bg-red-50 rounded-full"
							title="Delete"
						>
							<Trash2 size={16} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Medical Products Dashboard
					</h1>
					<p className="text-gray-600">
						Manage your medical equipment and supplies
					</p>
				</div>
				<div className="flex gap-4">
					<button
						onClick={() =>
							setCurrentView(
								currentView === 'grid'
									? 'analytics'
									: 'grid'
							)
						}
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						{currentView === 'grid' ? (
							<BarChart3 size={20} />
						) : (
							<Package size={20} />
						)}
						<span>
							{currentView === 'grid'
								? 'Analytics'
								: 'Products'}
						</span>
					</button>
					{currentView === 'grid' && (
						<button
							onClick={() => setShowAddModal(true)}
							className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
						>
							<Plus size={20} />
							<span>Add Product</span>
						</button>
					)}
				</div>
			</div>

			{currentView === 'grid' ? (
				<div className="p-6">
					<div className="flex flex-col sm:flex-row gap-4 mb-6">
						<div className="relative flex-1">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={20}
							/>
							<input
								type="text"
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) =>
									setSearchTerm(e.target.value)
								}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
							/>
						</div>
						<select
							value={selectedCategory}
							onChange={(e) =>
								setSelectedCategory(e.target.value)
							}
							className="px-4 py-2 border border-gray-300 rounded-lg"
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredProducts.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="p-6 text-center text-gray-600">
					Analytics View
				</div>
			)}

			{/* Add Modal */}
			<Modal
				isOpen={showAddModal}
				onClose={() => setShowAddModal(false)}
				title="Add New Product"
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleAddProduct();
					}}
					className="space-y-4"
				>
					<input
						type="text"
						placeholder="Product Name"
						value={newProduct.name}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								name: e.target.value,
							})
						}
						className="w-full border p-2 rounded"
						required
					/>
					<input
						type="file"
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								image: e.target.files[0],
							})
						}
						className="w-full border p-2 rounded"
						required
					/>
					<select
						value={newProduct.category}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								category: e.target.value,
							})
						}
						className="w-full border p-2 rounded"
					>
						{categories.slice(1).map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
					<textarea
						placeholder="Description"
						value={newProduct.description}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								description: e.target.value,
							})
						}
						className="w-full border p-2 rounded"
					/>
					<button
						type="submit"
						className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
					>
						Submit
					</button>
				</form>
			</Modal>

			{/* Edit Modal */}
			<Modal
				isOpen={showEditModal}
				onClose={() => {
					setShowEditModal(false);
					setSelectedProduct(null);
				}}
				title="Edit Product"
			>
				{selectedProduct && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleEditProduct();
						}}
						className="space-y-4"
					>
						<input
							type="text"
							value={selectedProduct.name}
							onChange={(e) =>
								setSelectedProduct({
									...selectedProduct,
									name: e.target.value,
								})
							}
							className="w-full border p-2 rounded"
						/>
						<textarea
							value={selectedProduct.description}
							onChange={(e) =>
								setSelectedProduct({
									...selectedProduct,
									description: e.target.value,
								})
							}
							className="w-full border p-2 rounded"
						/>
						<select
							value={selectedProduct.category}
							onChange={(e) =>
								setSelectedProduct({
									...selectedProduct,
									category: e.target.value,
								})
							}
							className="w-full border p-2 rounded"
						>
							{categories.slice(1).map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<button
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
						>
							Save Changes
						</button>
					</form>
				)}
			</Modal>
		</div>
	);
};

export default ProductsDashboard;

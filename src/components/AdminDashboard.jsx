import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsDashboard from './ProductsDashboard';
import NewsManagement from './NewsManagement';
import { Users, ShoppingBag, Newspaper, LogOut } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState('overview');
	const navigate = useNavigate();

	// Add state for overview statistics
	const [stats, setStats] = useState({
		totalProducts: 150,
		totalNews: 24,
		newOrders: 12,
		visitors: 1234,
	});

	useEffect(() => {
		const isAuthenticated = localStorage.getItem('authToken');
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [navigate]);

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		navigate('/login');
	};

	// Function to update statistics
	const updateStats = (newStats) => {
		setStats((prevStats) => ({
			...prevStats,
			...newStats,
		}));
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
						className={`nav-item ${
							activeTab === 'overview' ? 'active' : ''
						}`}
						onClick={() => setActiveTab('overview')}
					>
						<Users /> Overview
					</button>
					<button
						className={`nav-item ${
							activeTab === 'products' ? 'active' : ''
						}`}
						onClick={() => setActiveTab('products')}
					>
						<ShoppingBag /> Products
					</button>
					<button
						className={`nav-item ${
							activeTab === 'news' ? 'active' : ''
						}`}
						onClick={() => setActiveTab('news')}
					>
						<Newspaper /> News
					</button>
				</nav>

				<button
					className="logout-button"
					onClick={handleLogout}
				>
					<LogOut /> Logout
				</button>
			</div>

			{/* Main Content */}
			<div className="dashboard-main">
				<div className="dashboard-header">
					<h2>
						{activeTab.charAt(0).toUpperCase() +
							activeTab.slice(1)}
					</h2>
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
								<p>{stats.totalProducts}</p>
							</div>
							<div className="stat-card">
								<h3>Total News</h3>
								<p>{stats.totalNews}</p>
							</div>
							<div className="stat-card">
								<h3>New Orders</h3>
								<p>{stats.newOrders}</p>
							</div>
							<div className="stat-card">
								<h3>Visitors</h3>
								<p>{stats.visitors}</p>
							</div>
						</div>
					)}

					{activeTab === 'products' && (
						<div className="products-section">
							<ProductsDashboard
								onStatsUpdate={(productCount) =>
									updateStats({
										totalProducts: productCount,
									})
								}
							/>
						</div>
					)}

					{activeTab === 'news' && (
						<div className="news-section">
							<NewsManagement
								onStatsUpdate={(newsCount) =>
									updateStats({
										totalNews: newsCount,
									})
								}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;

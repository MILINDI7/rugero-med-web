import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { backendUrl } from '../config';

const Login = () => {
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post(
			`${backendUrl}/user/login`,
			credentials
		);
		console.log(response);
		if (response.status === 200) {
			localStorage.setItem(
				'authToken',
				response.data.accessToken
			);
			navigate('/admin-dashboard');
		} else {
			setError('Invalid credentials');
		}
	};

	return (
		<div className="login-container">
			<div className="login-box">
				<h2>Admin Login</h2>
				{error && <div className="error-message">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">email</label>
						<input
							type="text"
							id="email"
							name="email"
							value={credentials.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
							required
						/>
					</div>
					<button type="submit" className="login-button">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

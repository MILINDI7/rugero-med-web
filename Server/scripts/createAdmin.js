import User from '../models/user.js';
import dotenv from 'dotenv';
import { hashPassword } from '../utils/helpers.js';

dotenv.config();

const createAdmin = async () => {
	try {
		const email = process.env.ADMIN_EMAIL;
		const password = process.env.ADMIN_PASSWORD;

		// Check if admin already exists
		const existingAdmin = await User.findOne({ email });
		if (existingAdmin) {
			console.log('Admin already exists.');
			process.exit();
		}

		const hashedPassword = hashPassword(password);

		const admin = await User.create({
			email,
			password: hashedPassword,
			role: 'admin',
		});
		console.log('Superuser (admin) created.', admin);
		process.exit();
	} catch (error) {
		console.log(
			'Something went wrong while creating an admin, try again latter',
			error.message
		);
		process.exit(1);
	}
};

createAdmin();

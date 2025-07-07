import Product from '../models/product.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { getLoggedInUser } from '../utils/helpers.js';

const getProducts = async (req, res) => {
	try {
	} catch (error) {}
};
const addProduct = async (req, res) => {
	try {
		const { title, description, category } = req.body;

		console.log('REQUEST', req.body);

		// Validate file existence
		if (!req.files || !req.files.image) {
			return res
				.status(400)
				.json({ message: 'Image is required' });
		}

		const loggedInUser = await getLoggedInUser(req);
		if (loggedInUser.role !== 'admin') {
			return res.status(403).json({
				message:
					'You are not authorized to perform this action',
			});
		}

		// Upload files to Cloudinary
		const imageUrl = await uploadToCloudinary(
			req.files.image[0].buffer,
			'artifacts'
		);

		// Validate upload results
		if (!imageUrl) {
			return res
				.status(500)
				.json({ message: 'File upload failed' });
		}

		console.log('IMAGE URL: ', imageUrl);

		// Save artifact to database
		const newProduct = new Product({
			title,
			description,
			category,
			imageUrl,
		});

		await newProduct.save();

		res.status(201).json(newProduct);
	} catch (error) {
		console.log(error);
		if (error.message.includes('Not authorized')) {
			return res
				.status(401)
				.json({ message: 'Invalid token or not authorized' });
		} else {
			return res
				.status(500)
				.json({ message: 'Something went wrong' });
		}
	}
};

const updateProduct = async (req, res) => {
	try {
	} catch (error) {}
};

const deleteProduct = async (req, res) => {
	try {
	} catch (error) {}
};

export { deleteProduct, updateProduct, getProducts, addProduct };

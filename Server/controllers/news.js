import News from '../models/news.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { getLoggedInUser } from '../utils/helpers.js';

const postNews = async (req, res) => {
	try {
		const { title, description } = req.body;

		// Validate file existence
		if (!req.files || !req.files.image) {
			return res
				.status(400)
				.json({ message: 'Image is required' });
		}

		const loggedInUser = await getLoggedInUser(req);
		if (loggedInUser.email !== process.env.SUPER_USER) {
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

		// Save artifact to database
		const postedNews = new News({
			title,
			description,
			image: imageUrl,
		});

		await postedNews.save();

		res.status(201).json(postedNews);
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

const getNews = async (req, res) => {
	try {
	} catch (error) {}
};

const updateNews = async (req, res) => {
	try {
	} catch (error) {}
};

const deleteNews = async (req, res) => {
	try {
	} catch (error) {}
};

export { postNews, getNews, updateNews, deleteNews };

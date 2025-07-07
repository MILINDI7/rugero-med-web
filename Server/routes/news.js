import express from 'express';
import { multerUpload } from '../utils/multer.js';
import {
	deleteNews,
	getNews,
	postNews,
	updateNews,
} from '../controllers/news.js';

const router = express.Router();

const uploadMiddleware = multerUpload().fields([
	{ name: 'image', maxCount: 1 },
]);

router.get('/', getNews);

router.post('/', uploadMiddleware, postNews);
router.patch('/:productId', uploadMiddleware, updateNews);
router.delete('/:productId', deleteNews);

export default router;

import express from 'express';
import { multerUpload } from '../utils/multer.js';
import { checkSchema } from 'express-validator';
import {
	deleteNews,
	getNews,
	postNews,
	updateNews,
} from '../controllers/news.js';
import { postNewsValidator } from '../middlewares/news.js';

const router = express.Router();

const uploadMiddleware = multerUpload().fields([
	{ name: 'image', maxCount: 1 },
]);

router.get('/', getNews);

router.post('/', uploadMiddleware, checkSchema(postNewsValidator), postNews);
router.patch('/:productId', uploadMiddleware, updateNews);
router.delete('/:productId', deleteNews);

export default router;

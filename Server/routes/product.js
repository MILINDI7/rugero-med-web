import express from 'express';
import { multerUpload } from '../utils/multer.js';
import {
	addProduct,
	deleteProduct,
	getProducts,
	updateProduct,
} from '../controllers/product.js';

const router = express.Router();

const uploadMiddleware = multerUpload().fields([
	{ name: 'image', maxCount: 1 },
]);

router.get('/', getProducts);

router.post('/', uploadMiddleware, addProduct);
router.patch('/:productId', uploadMiddleware, updateProduct);
router.delete('/:productId', deleteProduct);

export default router;

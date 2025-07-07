import express from 'express';
import userRouter from './user.js';
import productRouter from './product.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/products', productRouter);

export default router;

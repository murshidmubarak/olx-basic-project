import express from 'express';
import upload from '../middleware/multerMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

import {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/myads', protect, getMyProducts);

// Get single product
router.get('/:id', getProductById);

// Create product
router.post(
  '/',
  protect,
  upload.single('image'),
  createProduct
);

// Update product
router.put(
  '/:id',
  protect,
  upload.single('image'),
  updateProduct
);

// Delete product
router.delete(
  '/:id',
  protect,
  deleteProduct
);

export default router;
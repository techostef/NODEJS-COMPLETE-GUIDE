import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/product => POST
router.post('/product', adminController.postProduct) 

// /admin/products => GET
router.get('/products', adminController.getProducts) 

export default router;
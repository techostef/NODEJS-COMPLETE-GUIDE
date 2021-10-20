import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct)

// /admin/product => POST
router.post('/add-product', adminController.postAddProduct) 

// /admin/edit-product => post
router.post('/edit-product', adminController.postEditProduct)

router.get('/delete-product/:productId', adminController.deleteProduct)

// /admin/products => GET
router.get('/products', adminController.getProducts) 

export default router;
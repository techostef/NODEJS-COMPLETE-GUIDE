import express from 'express';
import shopController from '../controllers/shopController';

const router = express.Router();

router.get('/shop', shopController.getRoot)
router.get('/shop/products', shopController.getProductList)
router.get('/shop/cart', shopController.getCart)
router.get('/shop/orders', shopController.getOrders)
router.get('/shop/checkout', shopController.getCheckout)

export default router;
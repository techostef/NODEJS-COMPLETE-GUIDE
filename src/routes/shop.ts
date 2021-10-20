import express from 'express';
import shopController from '../controllers/shopController';

const router = express.Router();

router.get('/shop', shopController.getRoot)
router.get('/shop/products', shopController.getProductList)
router.get('/shop/products/:productId', shopController.getProductDetail)
router.get('/shop/cart', shopController.getCart)
router.post('/shop/cart', shopController.postCart)
router.post('/shop/delete-cart-item', shopController.deleteCart)
router.get('/shop/orders', shopController.getOrders)
router.get('/shop/checkout', shopController.getCheckout)

export default router;
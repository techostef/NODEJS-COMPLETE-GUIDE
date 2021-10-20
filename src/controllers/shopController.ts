import { RequestHandler } from "express";
import CartModel from "../models/cartModel";
import ProductModel from "../models/productModel";

const getRoot: RequestHandler = (req, res, next) => {
  res.render('shop/index', {
    products: ProductModel.fetchAll(),
    docTitle: 'Shop',
    path: '/shop'
  })
}

const getProductList: RequestHandler = (req, res, next) => {
  res.render('shop/productList', {
    products: ProductModel.fetchAll(),
    docTitle: 'Product List',
    path: '/shop/products'
  })
}

const getProductDetail: RequestHandler = (req, res, next) => {
  res.render('shop/productDetail', {
    product: ProductModel.fetchById(req.params?.productId),
    docTitle: 'Product Detail',
    path: '/shop/products'
  })
}

const getCart: RequestHandler = (req, res, next) => {
  res.render('shop/cart', {
    products: CartModel.getProducts(),
    docTitle: 'Cart',
    path: '/shop/cart'
  })
}

const postCart: RequestHandler = (req, res, next) => {
  const productId = req.body?.productId;
  const product = ProductModel.fetchById(productId);
  if (product) {
    CartModel.addProduct(product.id, product.price);
  }
  res.redirect('/shop/cart');
}

const getOrders: RequestHandler = (req, res, next) => {
  res.render('shop/orders', {
    products: ProductModel.fetchAll(),
    docTitle: 'Orders',
    path: '/shop/orders'
  })
}

const getCheckout: RequestHandler = (req, res, next) => {
  res.render('shop/checkout', {
    products: ProductModel.fetchAll(),
    docTitle: 'Checkout',
    path: '/shop/checkout'
  })
}

const deleteCart: RequestHandler = (req, res, next) => {
  const productId = req.body?.productId;
  const product = ProductModel.fetchById(productId);
  if (product) {
    CartModel.deleteProduct(product?.id, product?.price)
  }
  res.redirect('/shop/cart')
}

const shopController = {
  getRoot,
  getProductList,
  getProductDetail,
  getOrders,
  getCart,
  postCart,
  getCheckout,
  deleteCart,
}

export default shopController;

import { RequestHandler } from "express";
import CartModel from "../models/cartModel";
import ProductModel from "../models/productModel";

const getRoot: RequestHandler = async (req, res, next) => {
  const products = await ProductModel.fetchAll();
  res.render('shop/index', {
    products,
    docTitle: 'Shop',
    path: '/shop'
  })
}

const getProductList: RequestHandler = async (req, res, next) => {
  const products = await ProductModel.fetchAll();
  res.render('shop/productList', {
    products,
    docTitle: 'Product List',
    path: '/shop/products'
  })
}

const getProductDetail: RequestHandler = async (req, res, next) => {
  const product = await ProductModel.fetchById(req.params?.productId)

  res.render('shop/productDetail', {
    product,
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

const postCart: RequestHandler = async  (req, res, next) => {
  const productId = req.body?.productId;
  const product = await ProductModel.fetchById(productId);
  if (product) {
    CartModel.addProduct(product?.id, product?.price);
  }
  res.redirect('/shop/cart');
}

const getOrders: RequestHandler = async (req, res, next) => {
  const products = await ProductModel.fetchAll();
  res.render('shop/orders', {
    products,
    docTitle: 'Orders',
    path: '/shop/orders'
  })
}

const getCheckout: RequestHandler = async (req, res, next) => {
  const products = await ProductModel.fetchAll();
  res.render('shop/checkout', {
    products,
    docTitle: 'Checkout',
    path: '/shop/checkout'
  })
}

const deleteCart: RequestHandler = async (req, res, next) => {
  const productId = req.body?.productId;
  const product = await ProductModel.fetchById(productId);
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

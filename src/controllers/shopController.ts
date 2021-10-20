import { RequestHandler } from "express";
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

const getCart: RequestHandler = (req, res, next) => {
  res.render('shop/cart', {
    products: ProductModel.fetchAll(),
    docTitle: 'Cart',
    path: '/shop/cart'
  })
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

const shopController = {
  getRoot,
  getProductList,
  getOrders,
  getCart,
  getCheckout,
}

export default shopController;

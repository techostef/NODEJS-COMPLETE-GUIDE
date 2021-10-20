import { RequestHandler } from "express";
import ProductModel from "../models/productModel";


const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('addProduct', {
    docTitle: 'Add Product',
    path: '/admin/add-product'
  })
}

const postProduct: RequestHandler = (req, res, next) => {
  const productModel = new ProductModel(req.body?.title);
  productModel.save();
  res.redirect('/');
}
 
const adminController = {
  getAddProduct,
  postProduct,
}

export default adminController;

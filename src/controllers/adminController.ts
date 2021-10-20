import { RequestHandler } from "express";
import IProduct from "../interfaces/IProduct";
import ProductModel from "../models/productModel";


const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/addProduct', {
    docTitle: 'Add Product',
    path: '/admin/add-product'
  })
}

const getProducts: RequestHandler = (req, res, next) => {
  res.render('admin/products', {
    docTitle: 'Products',
    products: ProductModel.fetchAll(),
    path: '/admin/products'
  })
}

const postProduct: RequestHandler = (req, res, next) => {
  const data: IProduct = req.body;
  const productModel = new ProductModel(
    data?.title,
    data?.imageUrl,
    data?.description,
    data?.price,
  );
  productModel.save();
  res.redirect('/shop/products');
}
 
const adminController = {
  getAddProduct,
  getProducts,
  postProduct,
}

export default adminController;

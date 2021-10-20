import { RequestHandler } from "express";
import IProduct from "../interfaces/IProduct";
import ProductModel from "../models/productModel";


const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/editProduct', {
    docTitle: 'Add Product',
    product: null,
    path: '/admin/add-product'
  })
}

const getEditProduct: RequestHandler = (req, res, next) => {
  const product = ProductModel.fetchById(req.params?.productId);
  if (!product) res.redirect('/')
  else {
    res.render('admin/editProduct', {
      docTitle: 'Edit Product',
      product: ProductModel.fetchById(req.params?.productId),
      path: '/admin/add-product'
    })
  }
}

const getProducts: RequestHandler = (req, res, next) => {
  res.render('admin/products', {
    docTitle: 'Products',
    products: ProductModel.fetchAll(),
    path: '/admin/products'
  })
}

const postAddProduct: RequestHandler = (req, res, next) => {
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

const postEditProduct: RequestHandler = (req, res, next) => {
  const data: IProduct = req.body;
  ProductModel.updateItem(data);
  res.redirect('/shop/products');
}

const deleteProduct: RequestHandler = (req, res, next) => {
  const productId = req.params.productId;
  ProductModel.deleteItem(productId);
  res.redirect('/shop/products');
}
 
const adminController = {
  getAddProduct,
  getEditProduct,
  getProducts,
  postAddProduct,
  postEditProduct,
  deleteProduct,
}

export default adminController;

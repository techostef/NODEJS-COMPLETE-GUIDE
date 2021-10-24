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

const getEditProduct: RequestHandler = async (req, res, next) => {
  const product = await ProductModel.fetchById(req.params?.productId);
  if (!product) res.redirect('/')
  else {
    res.render('admin/editProduct', {
      docTitle: 'Edit Product',
      product,
      path: '/admin/add-product'
    })
  }
}

const getProducts: RequestHandler = async (req, res, next) => {
  const products = await ProductModel.fetchAll();
  res.render('admin/products', {
    docTitle: 'Products',
    products,
    path: '/admin/products'
  })
}

const postAddProduct: RequestHandler = async (req, res, next) => {
  const data: IProduct = req.body;
  const productModel = new ProductModel(
    data?.title,
    data?.imageUrl,
    data?.description,
    data?.price,
  );
  await productModel.save();
  res.redirect('/shop/products');
}

const postEditProduct: RequestHandler = async (req, res, next) => {
  const data: IProduct = req.body;
  await ProductModel.updateItem(data);
  res.redirect('/shop/products');
}

const deleteProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;
  await ProductModel.deleteItem(productId);
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

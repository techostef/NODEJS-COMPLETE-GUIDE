import { RequestHandler } from "express";

interface IProduct {
  title: string,
}

const products: IProduct[] = [];

const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('addProduct', {
    docTitle: 'Add Product',
    path: '/admin/add-product'
  })
}

const postProduct: RequestHandler = (req, res, next) => {
  products.push({
    title: req.body?.title
  })
  res.redirect('/');
}
 
const adminController = {
  getAddProduct,
  postProduct,
  products,
}

export default adminController;

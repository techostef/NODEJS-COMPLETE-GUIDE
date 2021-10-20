import { RequestHandler } from "express";
import ProductModel from "../models/productModel";

const getRoot: RequestHandler = (req, res, next) => {
  res.render('shop', {
    products: ProductModel.fetchAll(),
    docTitle: 'shop',
    path: '/'
  })
}

const shopController = {
  getRoot,
}

export default shopController;

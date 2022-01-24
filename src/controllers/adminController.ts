import { RequestHandler } from "express";
import IProduct from "../interfaces/IProduct";
import ProductModel from "../models/productModel";
import UserModel from "../models/userModel";


const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/editProduct', {
    docTitle: 'Add Product',
    product: null,
    path: '/admin/add-product'
  })
}

const getEditProduct: RequestHandler = async (req, res, next) => {
  const user: any = await UserModel.findByPk(1);
  const products = await user.getProductModels({
    where: {
      id: req?.params?.productId
    }
  })
  const [ product ] = products;
  // const product = await ProductModel.findOne({
  //   where: {
  //     id: req.params?.productId,
  //   }
  // });
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
  const user: any = await UserModel.findByPk(1);
  const products = await user.getProductModels({
    where: {
      id: req?.params?.productId
    }
  })
  res.render('admin/products', {
    docTitle: 'Products',
    products,
    path: '/admin/products'
  })
}

const postAddProduct: RequestHandler = async (req, res, next) => {
  const data: IProduct = req.body;
  const user: any = await UserModel.findByPk(1);
  user.createProductModel(data)
  res.redirect('/shop/products');
}

const postEditProduct: RequestHandler = async (req, res, next) => {
  const data: IProduct = req.body;
  await ProductModel.update(data, {
    where: {
      id: data?.id
    }
  });
  res.redirect('/shop/products');
}

const deleteProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;
  await ProductModel.destroy({
    where: {
      id: productId
    }
  });
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

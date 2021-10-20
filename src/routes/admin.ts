import express from 'express';
import path from 'path';
import pathHelper from '../helper/pathHelper';

const router = express.Router();

interface IProduct {
  title: string,
}

const products: IProduct[] = [];


// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('addProduct', {
    docTitle: 'Add Product'
  })
})

// /admin/add-product => POST
router.post('/product', (req, res, next) => {
  products.push({
    title: req.body?.title
  })
  res.redirect('/');
}) 

const admin = {
  router,
  products,
}

export default admin;
import express from 'express';
import path from 'path';
import pathHelper from '../helper/pathHelper';
import admin from './admin';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('admin', admin.products);
  res.render('shop', {
    products: admin.products,
    docTitle: 'shop'
  })
})

export default router;
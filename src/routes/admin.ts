import express from 'express';
import path from 'path';
import pathHelper from '../helper/pathHelper';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  console.log('In Another middleware');
  res.sendFile(path.join(pathHelper.getSrcDir, 'views', 'addProduct.html'))
})

// /admin/add-product => POST
router.post('/product', (req, res, next) => {
  console.log('product', req.body)
  res.redirect('/');
}) 


export default router;
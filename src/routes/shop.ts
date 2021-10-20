import express from 'express';
import path from 'path';
import pathHelper from '../helper/pathHelper';
import admin from './admin';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('admin', admin.products);
  res.sendFile(path.join(pathHelper.getSrcDir, 'views', 'shop.html'))
})

export default router;
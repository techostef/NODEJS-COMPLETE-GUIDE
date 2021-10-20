import express from 'express';
import path from 'path';
import adminController from '../controllers/adminController';
import pathHelper from '../helper/pathHelper';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)

// /admin/add-product => POST
router.post('/product', adminController.postProduct) 

export default router;
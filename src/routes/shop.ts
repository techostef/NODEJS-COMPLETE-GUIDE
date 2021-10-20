import express from 'express';
import shopController from '../controllers/shopController';

const router = express.Router();

router.get('/', shopController.getRoot)

export default router;
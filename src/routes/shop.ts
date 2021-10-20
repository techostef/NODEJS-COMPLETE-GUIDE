import express from 'express';
import path from 'path';
import pathHelper from '../helper/pathHelper';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(pathHelper.getSrcDir, 'views', 'shop.html'))
})

export default router;
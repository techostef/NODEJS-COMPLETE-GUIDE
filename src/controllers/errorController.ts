import { RequestHandler } from "express";

const getRoot: RequestHandler = (req, res, next) => {
  res.status(404).render('404', {
    docTitle: 'Page Not Found',
    path: ''
  })
}

const errorController = {
  getRoot,
}

export default errorController;

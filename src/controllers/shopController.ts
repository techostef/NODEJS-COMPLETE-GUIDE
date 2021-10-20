import adminController from "./adminController"

const getRoot = (req, res, next) => {
  res.render('shop', {
    products: adminController.products,
    docTitle: 'shop',
    path: '/'
  })
}

const shopController = {
  getRoot,
}

export default shopController;

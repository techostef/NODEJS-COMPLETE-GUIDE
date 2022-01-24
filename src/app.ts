import config from './config'
import express from 'express';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import pathHelper from './helper/pathHelper';
import path from 'path';
import errorController from './controllers/errorController';
import sequelizeHelper, { initDatabase } from './helper/sequelizeHelper';
import ProductModel from './models/productModel';
import UserModel from './models/userModel';
import CartModel from './models/cartModel';
import CartItemModel from './models/cartItemModel';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(pathHelper.getSrcDir, 'views'));

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static(path.join(pathHelper.getSrcDir, '../', 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.getRoot);

(async() => {
  await initDatabase()

  ProductModel.belongsTo(UserModel, {
    constraints: true,
    onDelete: 'CASCADE',
  });
  UserModel.hasMany(ProductModel)
  UserModel.hasOne(CartModel);
  CartModel.belongsTo(UserModel);
  CartModel.belongsToMany(ProductModel, {
    through: CartItemModel,
  });
  ProductModel.belongsToMany(CartModel, {
    through: CartItemModel,
  })

  sequelizeHelper
  // .sync({force: true}) // for force rewrite table
  .sync()
  .then(() => {
    return UserModel.findAll();
  })
  .then((users: any) => {
    if (users.length === 0) {
      return UserModel.create({
        name: 'admin',
        email: 'admin@gmail.com'
      })
    }
    return users;
  })
  .then(async (users: any) => {
    try {
      const carts = await CartModel.findOne({
        where: {
          UserModelId: 1
        } as any
      })
      if (!carts && users?.[0]?.createCartModel) {
        users[0].createCartModel()
      }
    } catch (err) {
      console.log("err", err)
    }
    return users;
  })
  .then(() => {
    app.listen(config.port);
  })
  .catch(err => {
    console.log('err sync')
  }) 
})();


// UserModel.hasMany(ProductModel);


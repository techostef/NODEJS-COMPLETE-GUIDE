import config from './config'
import express from 'express';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import pathHelper from './helper/pathHelper';
import path from 'path';
import errorController from './controllers/errorController';

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

app.use(errorController.getRoot)

// (async () => {
//   await dbHelper.end()
// });

app.listen(config.port);
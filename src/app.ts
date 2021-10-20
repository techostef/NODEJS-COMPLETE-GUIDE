import config from './config'
import express from 'express';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import pathHelper from './helper/pathHelper';
import path from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(pathHelper.getSrcDir, 'views'));

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(pathHelper.getSrcDir, '../', 'public')))

app.use('/admin', adminRoutes.router);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(pathHelper.getSrcDir, 'views', '404.html'))
})

app.listen(config.port);
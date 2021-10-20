import IProduct from "../interfaces/IProduct";
import fs from 'fs';
import path from "path";
import pathHelper from "../helper/pathHelper";


const products: IProduct[] = [];
const p = path.join(pathHelper.getSrcDir, 'data', 'productions.json');

class ProductModel {
  private title;

  constructor(title) {
    this.title = title;
  }

  save() {

    fs.readFile(p, 'utf8', (err, fileContent) => {
      let productsTemp: IProduct[] = [];
      if (!err) {
        productsTemp = JSON.parse(fileContent as any);
      } else {
        console.log('err', err)
      }
      productsTemp.push({
        title: this.title
      })
      fs.writeFile(p, JSON.stringify(productsTemp), (err) => {
        console.log('err', err)
      });
    })
  }

  static fetchAll(): IProduct[] {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
}

export default ProductModel;
import IProduct from "../interfaces/IProduct";
import fs from 'fs';
import path from "path";
import pathHelper from "../helper/pathHelper";


const products: IProduct[] = [];
const p = path.join(pathHelper.getSrcDir, 'data', 'productions.json');

class ProductModel {
  private title;
  private imageUrl;
  private description;
  private price;

  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
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
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        price: this.price,
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
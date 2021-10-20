import IProduct from "../interfaces/IProduct";
import fs from 'fs';
import path from "path";
import pathHelper from "../helper/pathHelper";
import stringHelper from "../helper/stringHelper";
import CartModel from "./cartModel";

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
        id: stringHelper.getRandomId(),
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
    let products = [];
    try {
      products = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (err) {
      console.log('err', err)
    }
    return products;
  }
  
  static updateItem(product: IProduct) {
    const products = this.fetchAll();
    const productIndex = products.findIndex((item) => item.id === product.id);
    console.log('product', product, productIndex, '!');
    if (productIndex === -1) return;
    products[productIndex] = product;
    fs.writeFile(p, JSON.stringify(products), (err) => {
      console.log('err', err)
    });
  }
  
  static deleteItem(id) {
    const products = this.fetchAll();
    const product = products.find((item) => item.id === id);
    const newProducts = products.filter((item) => item.id !== id);
    fs.writeFile(p, JSON.stringify(newProducts), (err) => {
      console.log('err', err)
    });

    CartModel.deleteProduct(id, product?.price ?? 0)
  }

  static fetchById(id): IProduct | undefined {
    const listProduct = this.fetchAll();
    return listProduct.find((item) => item?.id === id);
  }
}

export default ProductModel;
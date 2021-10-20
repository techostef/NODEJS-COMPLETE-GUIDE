import IProduct from "../interfaces/IProduct";
import fs from 'fs';
import path from "path";
import pathHelper from "../helper/pathHelper";
import ProductModel from "./productModel";

const p = path.join(pathHelper.getSrcDir, 'data', 'cart.json');

interface ICartProduct extends Partial<IProduct> {
  qty: number,
}

interface ICart {
  products: ICartProduct[],
  totalPrice: number,
}

class CartModel {
  static addProduct(id, productPrice) {
    fs.readFile(p, 'utf8', (err, fileContent) => {
      let cart: ICart = {products: [] as ICartProduct[], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent as any);
      }

      const existingProductIndex = cart.products.findIndex(item => item?.id === id)
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct: ICartProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1}
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log('err', err);
      })
    })
  }

  static fetchAll() {
    let cart:ICart = {
      products: [],
      totalPrice: 0
    };
    try {
      cart = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (err) {
      console.log('err', err);
    }
    return cart;
  }
  
  static deleteProduct(id, productPrice) {
    fs.readFile(p, 'utf8', (err, fileContent) => {
      if (err) {
        return
      }

      const cart:ICart = JSON.parse(fileContent);
      const updateCart:ICart = {...cart};
      const product = updateCart.products.find(item => item?.id === id);
      const productQty = product?.qty ?? 0;
      updateCart.products = updateCart.products.filter((item) => item?.id !== id);
      updateCart.totalPrice -= productQty * productPrice;

      fs.writeFile(p, JSON.stringify(updateCart), (err) => {
        console.log('err', err);
      })
    })
  }

  static getProducts() {
    const products = ProductModel.fetchAll();
    const cartProducts = this.fetchAll();
    const filterProducts: ICartProduct[] = [];
    products.forEach((item) => {
      cartProducts.products.findIndex((cartProductItem, index) => {
        const id = cartProductItem.id;
        if (item?.id === id) {
          filterProducts.push({
            ...item,
            qty: cartProductItem?.qty,
          })
        }
        cartProducts.products.splice(index, 1);
      })
    })
    return filterProducts;
  }
}

export default CartModel;
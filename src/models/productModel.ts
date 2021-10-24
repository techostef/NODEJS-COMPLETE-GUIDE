import IProduct from "../interfaces/IProduct";
import stringHelper from "../helper/stringHelper";
import CartModel from "./cartModel";
import dbHelper from "../helper/dbHelper";

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

  async save() {
    const query = `INSERT INTO public.products(title, "imageUrl", description, price) VALUES ($1, $2, $3, $4)`
    const value = [this.title, this.imageUrl, this.description, this.price]

    await dbHelper.query(query, value)
      .catch(err => {
        console.log('err', err)
      })
  }


  static async fetchAll(): Promise<IProduct[]> {
    let products: IProduct[] = []
    await dbHelper.query('select * from products ORDER BY id ASC ')
      .then((res) => {
        products = res.rows
      })
      .catch((err) => {
        console.log('err', err)
      })
    return products;
  }
  
  static async updateItem(product: IProduct) {
    const query = `UPDATE public.products SET title=$1, "imageUrl"=$2, description=$3, price=$4 WHERE id=$5`
    const value = [product?.title, product?.imageUrl, product?.description, product?.price, product?.id]
    await dbHelper.query(query, value)
      .catch(err => {
        console.log('err', err)
      })
  }
  
  static async deleteItem(id) {
    const product = await this.fetchById(id);
    const query = `DELETE FROM public.products WHERE id=$1;`
    const value = [id]
    await dbHelper.query(query, value)
      .catch(err => {
        console.log('err', err)
      })

    CartModel.deleteProduct(id, product?.price ?? 0)
  }

  static async fetchById(id): Promise<IProduct | undefined> {
    const query = `SELECT * FROM public.products WHERE id=$1;`
    const value = [id]
    let product: IProduct | undefined = undefined;
    await dbHelper.query(query, value)
      .then((res) => {
        product = res.rows[0]
      })
      .catch((err) => {
        console.log('err', err)
      })
    return product;
  }
}

export default ProductModel;
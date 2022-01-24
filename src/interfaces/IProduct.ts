interface IProduct {
  id: string,
  title: string,
  imageUrl: string,
  description: string,
  price: string,
  createdAt: Date | string,
  updatedAt: Date | string,
}

export default IProduct;
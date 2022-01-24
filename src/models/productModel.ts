import Sequelize, { Model, Optional }  from "sequelize";
import IProduct from "../interfaces/IProduct";
import sequelizeHelper from "../helper/sequelizeHelper";


// Some attributes are optional in `User.build` and `User.create` calls
interface ProductCreationAttributes extends Optional<IProduct, "id"> {}

class ProductModel extends Model<IProduct, ProductCreationAttributes> implements IProduct {
  public createdAt!: string | Date;
  public updatedAt!: string | Date;
  public id!: string;
  public title!: string;
  public imageUrl!: string;
  public description!: string;
  public price!: string;

}

ProductModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.DOUBLE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    sequelize: sequelizeHelper,
    tableName: "projects",
  }
)

export default ProductModel;
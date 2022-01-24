import Sequelize, { 
  HasManyGetAssociationsMixin, 
  HasManyAddAssociationMixin, 
  HasManyHasAssociationMixin, 
  HasManyCountAssociationsMixin, 
  HasManyCreateAssociationMixin, 
  Model 
}  from "sequelize";
import sequelizeHelper from "../helper/sequelizeHelper";
import IProduct from "../interfaces/IProduct";


// Some attributes are optional in `User.build` and `User.create` calls

class CartModel extends Model<{
  id,
}> {
  id!: number;
  
  public getProjects!: HasManyGetAssociationsMixin<IProduct>; // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<IProduct, number>;
  public hasProject!: HasManyHasAssociationMixin<IProduct, number>;
  public countProjects!: HasManyCountAssociationsMixin;
  public createProject!: HasManyCreateAssociationMixin<IProduct>;
}

CartModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
  },
  {
    sequelize: sequelizeHelper,
    tableName: "carts",
  }
)

export default CartModel;
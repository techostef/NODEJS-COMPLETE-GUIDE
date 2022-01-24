import Sequelize, { Model }  from "sequelize";
import sequelizeHelper from "../helper/sequelizeHelper";


// Some attributes are optional in `User.build` and `User.create` calls

class CartItemModel extends Model<{
  id: number,
  quantity: number,
}> {
  id!: number;
}

CartItemModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
  },
  {
    sequelize: sequelizeHelper,
    tableName: "cartItems",
  }
)

export default CartItemModel;
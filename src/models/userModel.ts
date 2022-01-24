import Sequelize, { Model, Optional }  from "sequelize";
import IUser from "../interfaces/IUser";
import sequelizeHelper from "../helper/sequelizeHelper";


// Some attributes are optional in `User.build` and `User.create` calls
interface CardCreationAttributes extends Optional<IUser, "id"> {}

class UserModel extends Model<IUser, CardCreationAttributes> implements IUser {
  name!: string;
  email!: string;
  id!: number;
}

UserModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    sequelize: sequelizeHelper,
    tableName: "users",
  }
)

export default UserModel;
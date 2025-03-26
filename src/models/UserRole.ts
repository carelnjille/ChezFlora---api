import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

class UserRole extends Model {
  public user_id!: number;
  public role_id!: number;
}

UserRole.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: false,
  }
);

export default UserRole;
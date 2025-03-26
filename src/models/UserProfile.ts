import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

class UserProfile extends Model {
  public user_id!: number;
  public bio!: string;
  public profile_picture!: string;
  public phone_number!: string;
  public address!: string;
}

UserProfile.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profiles',
    timestamps: false,
  }
);

export default UserProfile;
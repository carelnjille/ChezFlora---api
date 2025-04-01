import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
  user_id: number;
  email: string;
  password_hash: string;
  username: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public email!: string;
  public password_hash!: string;
  public username!: string;
  public role!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Propriété virtuelle pour `password`
  public get password(): string {
    return this.password_hash;
  }

  public set password(value: string) {
    this.password_hash = value; // Vous pouvez hasher le mot de passe ici si nécessaire
  }

  // Méthode initialize() pour être utilisée dans l'index.ts
  static initialize(sequelize: Sequelize) {
    User.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
      }
    );
  }
}

export default User;

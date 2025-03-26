import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize';

class Quote extends Model {
  public quote_id!: number;
  public user_id!: number;
  public event_type!: string;
  public event_date!: Date;
  public description!: string;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Méthode d'initialisation
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        quote_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        event_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        event_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
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
        modelName: 'Quote',
        tableName: 'quotes',
        timestamps: false,
      }
    );
    return this;
  }

  // Méthode d'association (optionnelle)
  public static associate(models: any) {
    // Un devis appartient à un utilisateur
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Quote;
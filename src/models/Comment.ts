import { DataTypes, Model, Sequelize } from 'sequelize';
import BlogPost from './BlogPost';

class Comment extends Model {
  public comment_id!: number;
  public post_id!: number;
  public user_id!: number;
  public content!: string;
  public created_at!: Date;

  // Ajout de la méthode initialize()
  static initialize(sequelize: Sequelize) {
    Comment.init(
      {
        comment_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'blog_posts', // Utilisation du nom de la table
            key: 'post_id',
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: false,
      }
    );
  }

  // Ajout de la méthode associate() pour définir les relations
  static associate(models: any) {
    Comment.belongsTo(models.BlogPost, { foreignKey: 'post_id' });
    models.BlogPost.hasMany(Comment, { foreignKey: 'post_id' });
  }
}

export default Comment;

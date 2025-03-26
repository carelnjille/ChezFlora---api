import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import BlogPost from './BlogPost'; // Importez le modèle BlogPost

class Comment extends Model {
  public comment_id!: number;
  public post_id!: number;
  public user_id!: number;
  public content!: string;
  public created_at!: Date;
}

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
        model: BlogPost, // Référence à la table BlogPost
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
    timestamps: false, // Désactiver les timestamps natifs de Sequelize
  }
);

// Définir la relation entre BlogPost et Comment
BlogPost.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(BlogPost, { foreignKey: 'post_id' });

export default Comment;
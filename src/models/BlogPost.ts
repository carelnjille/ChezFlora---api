import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class BlogPost extends Model {
  public post_id!: number;
  public title!: string;
  public content!: string;
  public author_id!: number;
  public image_url!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

BlogPost.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
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
    modelName: 'BlogPost',
    tableName: 'blog_posts',
    timestamps: false, // Désactiver les timestamps natifs de Sequelize
  }
);

export default BlogPost;
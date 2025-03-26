import { Sequelize } from 'sequelize';
import User from './User';
import Product from './Product';
import Order from './Order';
import Quote from './Quote';
import BlogPost from './BlogPost';
import Comment from './Comment';

// Configuration de la connexion à la base de données
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, // Désactive les logs SQL
});

// Initialisation des modèles
const models = {
  User: User.initialize(sequelize),
  Product: Product.initialize(sequelize),
  Order: Order.initialize(sequelize),
  Quote: Quote.initialize(sequelize),
  BlogPost: BlogPost.initialize(sequelize),
  Comment: Comment.initialize(sequelize),
};

// Association des modèles
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Exportation de l'instance Sequelize et des modèles
export { sequelize, models };
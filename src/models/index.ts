import { Sequelize } from 'sequelize';
import User from './User';
import Product from './Product';
import Order from './Order';
import Quote from './Quote';
import BlogPost from './BlogPost';
import Comment from './Comment';

// Définition d'une interface pour typer les modèles
interface ModelWithAssociations {
  initialize: (sequelize: Sequelize) => void;
  associate?: (models: any) => void; // La méthode associate est optionnelle
}

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

// Liste des modèles
const models: { [key: string]: ModelWithAssociations } = {
  User,
  Product,
  Order,
  Quote,
  BlogPost,
  Comment,
};

// Initialisation des modèles
Object.values(models).forEach((model) => {
  model.initialize(sequelize);
});

// Association des modèles (si applicable)
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, models };

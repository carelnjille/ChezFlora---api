// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// // Configuration de la base de donn�es 
// const sequelize_1 = require("sequelize");
// const dotenv_1 = __importDefault(require("dotenv"));
// dotenv_1.default.config();
// const sequelize = new sequelize_1.Sequelize({
//     dialect: 'postgres',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT || '5432'),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     logging: false, // Désactive les logs SQL
// });
// exports.default = sequelize;
import { Sequelize } from 'sequelize'; // Importe Sequelize avec TypeScript
import dotenv from 'dotenv'; // Importer dotenv pour les variables d'environnement

dotenv.config(); // Charger les variables d'environnement

// Créer une instance de Sequelize pour se connecter à PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'), // Valeur par défaut de port PostgreSQL
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, // Désactiver les logs SQL en production
});

// Vérifier la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('La connexion à la base de données a réussi.');
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
  });

export default sequelize; // Exporter l'instance sequelize

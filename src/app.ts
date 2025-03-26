import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sequelize from './config/db'; // Assurez-vous que le chemin est correct
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import quoteRoutes from './routes/quoteRoutes';
import blogRoutes from './routes/blogRoutes';
import commentRoutes from './routes/commentRoutes';

dotenv.config();

const app = express();

// Middleware pour parser les cookies
app.use(cookieParser());

// Configuration CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Autoriser uniquement cette origine
  credentials: true, // Autoriser les cookies
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comments', commentRoutes);

// Middleware pour gérer les erreurs globales
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Synchroniser les modèles avec la base de données
sequelize.sync({ force: false }) // `force: false` pour ne pas écraser les tables existantes
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
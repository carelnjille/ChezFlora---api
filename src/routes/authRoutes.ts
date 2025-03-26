import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Route pour l'inscription (register)
router.post('/register', registerUser);

// Route pour la connexion (login)
router.post('/login', loginUser);

// Route pour la déconnexion (logout) - Protégée par authentification
router.post('/logout', authenticate, logoutUser);

export default router;
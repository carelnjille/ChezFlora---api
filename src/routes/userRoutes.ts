// Routes pour les utilisateurs 
import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users/:user_id', authenticate, getUserProfile); // Apply middleware here


export default router;

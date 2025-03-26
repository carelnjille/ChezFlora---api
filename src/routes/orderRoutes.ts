import express from 'express';
import { addOrder, getOrderById, getOrdersByUserId, getOrderDetails } from '../controllers/orderController';

const router = express.Router();

// Route pour ajouter une commande
router.post('/orders', addOrder);

// Route pour récupérer une commande par ID
router.get('/orders/:order_id', getOrderById);

// Route pour récupérer toutes les commandes d'un utilisateur
router.get('/orders/user/:user_id', getOrdersByUserId);

// Route pour récupérer les détails d'une commande
router.get('/orders/:order_id/details', getOrderDetails);

export default router;
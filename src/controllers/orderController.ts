import { Request, Response } from 'express';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import { sendEmail } from '../utils/emailService';
import User from '../models/User'; // Assurez-vous d'importer le modèle User

// Ajouter une commande
export const addOrder = async (req: Request, res: Response) => {
  try {
    const { user_id, total_amount, status, products } = req.body;
    const order = await Order.create({ user_id, total_amount, status });

    // Ajouter les détails de la commande
    for (const product of products) {
      await OrderDetail.create({
        order_id: order.order_id,
        product_id: product.product_id,
        quantity: product.quantity,
        price: product.price,
      });
    }

    // Envoi d'un email de confirmation
    const user = await User.findByPk(user_id);
    if (user) {
      await sendEmail(user.email, 'Confirmation de commande', 'Votre commande a été passée avec succès.');
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error adding order', error });
  }
};

// Récupérer une commande par ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findByPk(order_id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

// Récupérer toutes les commandes d'un utilisateur
export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const orders = await Order.findAll({ where: { user_id } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Récupérer les détails d'une commande
export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.params;
    const orderDetails = await OrderDetail.findAll({ where: { order_id } });
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error });
  }
};
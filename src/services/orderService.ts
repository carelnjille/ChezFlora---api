// Service pour les commandes 
import Order from '../models/Order';

export const addOrder = async (orderData: any) => {
  return await Order.create(orderData);
};

export const getOrderById = async (orderId: number) => {
  return await Order.findByPk(orderId);
};

export const getOrdersByUserId = async (userId: number) => {
  return await Order.findAll({ where: { user_id: userId } });
};
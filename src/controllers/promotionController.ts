import { Request, Response } from 'express';
import Promotion from '../models/Promotion';

export const addPromotion = async (req: Request, res: Response) => {
  try {
    const { product_id, discount, start_date, end_date } = req.body;
    const promotion = await Promotion.create({ product_id, discount, start_date, end_date });
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Error adding promotion', error });
  }
};
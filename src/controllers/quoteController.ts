import { Request, Response } from 'express';
import Quote from '../models/Quote';

// Ajouter un devis
export const addQuote = async (req: Request, res: Response) => {
  try {
    const { user_id, event_type, event_date, description, status } = req.body;
    const quote = await Quote.create({ user_id, event_type, event_date, description, status });
    res.status(201).json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Error adding quote', error });
  }
};

// Récupérer un devis par ID
export const getQuoteById = async (req: Request, res: Response) => {
  try {
    const { quote_id } = req.params;
    const quote = await Quote.findByPk(quote_id);
    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(404).json({ message: 'Quote not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote', error });
  }
};

// Récupérer tous les devis d'un utilisateur
export const getQuotesByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const quotes = await Quote.findAll({ where: { user_id } });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes', error });
  }
};
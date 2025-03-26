// Service pour les devis 
import Quote from '../models/Quote';

export const addQuote = async (quoteData: any) => {
  return await Quote.create(quoteData);
};

export const getQuoteById = async (quoteId: number) => {
  return await Quote.findByPk(quoteId);
};

export const getQuotesByUserId = async (userId: number) => {
  return await Quote.findAll({ where: { user_id: userId } });
};
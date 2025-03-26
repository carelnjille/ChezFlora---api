// Routes pour les devis 
import express from 'express';
import { addQuote, getQuoteById, getQuotesByUserId } from '../controllers/quoteController';

const router = express.Router();

router.post('/quotes', addQuote);
router.get('/quotes/:quote_id', getQuoteById);
router.get('/quotes/user/:user_id', getQuotesByUserId);

export default router;
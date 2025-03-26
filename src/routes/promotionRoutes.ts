import express from 'express';
import { addPromotion } from '../controllers/promotionController';

const router = express.Router();

router.post('/promotions', addPromotion);

export default router;
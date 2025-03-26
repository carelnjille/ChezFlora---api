// Routes pour les commentaires 
import express from 'express';
import { addComment, getCommentsByPostId } from '../controllers/commentController';

const router = express.Router();

router.post('/comments', addComment);
router.get('/comments/post/:post_id', getCommentsByPostId);

export default router;
import express from 'express';
import { addBlogPost, getBlogPostById, getAllBlogPosts } from '../controllers/blogController';

const router = express.Router();

// Route pour ajouter un article de blog
router.post('/blog', addBlogPost);

// Route pour récupérer un article de blog par son ID
router.get('/blog/:post_id', getBlogPostById);

// Route pour récupérer tous les articles de blog
router.get('/blog', getAllBlogPosts);

export default router;
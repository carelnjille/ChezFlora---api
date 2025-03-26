import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

export const addBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author_id, image_url } = req.body;

    // Validation des données
    if (!title || !content || !author_id || !image_url) {
      res.status(400).json({ message: 'Missing required fields: title, content, author_id, image_url' });
      return;
    }

    // Créer l'article de blog
    const blogPost = await BlogPost.create({ title, content, author_id, image_url });

    // Réponse réussie
    res.status(201).json({
      message: 'Blog post created successfully',
      blogPost,
    });
  } catch (error) {
    console.error('Error adding blog post:', error); // Log l'erreur pour le débogage
    res.status(500).json({ message: 'Error adding blog post', error: error });
  }
};
export const getBlogPostById = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;

    // Trouver l'article de blog par son ID
    const blogPost = await BlogPost.findByPk(post_id);

    if (blogPost) {
      // Réponse réussie
      res.status(200).json(blogPost);
    } else {
      // Si l'article n'existe pas
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    console.error('Error fetching blog post:', error); // Log l'erreur pour le débogage
    res.status(500).json({ message: 'Error fetching blog post', error: error });
  }
};

export const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    // Récupérer tous les articles de blog
    const blogPosts = await BlogPost.findAll();

    // Réponse réussie
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error); // Log l'erreur pour le débogage
    res.status(500).json({ message: 'Error fetching blog posts', error: error });
  }
};
// Contr�leur pour les commentaires 
import { Request, Response } from 'express';
import Comment from '../models/Comment';

export const addComment = async (req: Request, res: Response) => {
  try {
    const { post_id, user_id, content } = req.body;
    const comment = await Comment.create({ post_id, user_id, content });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const comments = await Comment.findAll({ where: { post_id } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};
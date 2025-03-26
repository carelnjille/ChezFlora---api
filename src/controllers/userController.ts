// Contr�leur pour les utilisateurs 
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash: hashedPassword, username,role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return; // Retourne ici pour éviter d'exécuter le reste de la fonction
      }
  
      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid password' });
        return; // Retourne ici pour éviter d'exécuter le reste de la fonction
      }
  
      // Génération du token JWT
      const token = jwt.sign(
        { user_id: user.user_id, role: user.role }, // Données à inclure dans le token
        process.env.JWT_SECRET || 'secret', // Clé secrète pour signer le token
        { expiresIn: '1h' } // Durée de validité du token
      );
  
      // Envoi du token dans un cookie sécurisé
      res.cookie('token', token, {
        httpOnly: true, // Le cookie n'est accessible que par le serveur
        secure: process.env.NODE_ENV === 'production', // Cookie sécurisé en production (HTTPS)
        maxAge: 3600000, // Durée de validité du cookie (1 heure)
        sameSite: 'strict', // Protection contre les attaques CSRF
      });
  
      // Réponse réussie
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};
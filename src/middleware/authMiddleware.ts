import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Déclaration de l'interface pour le token décodé
interface DecodedToken {
  user_id: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Récupération du token depuis les cookies ou l'en-tête Authorization
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return; // Retourne ici pour éviter d'exécuter `next()`
  }

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as DecodedToken;

    // Ajout des informations de l'utilisateur à l'objet `req` avec une assertion de type
    (req as any).user = { id: decoded.user_id, role: decoded.role }; // Ensure user property is defined


    next(); // Passage au middleware ou au contrôleur suivant
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

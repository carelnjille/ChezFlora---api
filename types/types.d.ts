import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string }; // Ajoutez la propriété `user` à l'objet `Request`
    }
  }
}
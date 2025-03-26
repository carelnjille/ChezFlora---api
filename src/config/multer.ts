import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Configuration de multer pour stocker les fichiers en mémoire
const storage = multer.memoryStorage(); // Stocke les fichiers en mémoire sous forme de Buffer

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées'));
  }
};

const upload = multer({
  storage, // Utilise memoryStorage au lieu de diskStorage
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 Mo
  },
});

export { upload }; // Exportation nommée
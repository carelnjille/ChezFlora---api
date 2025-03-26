import express from 'express';
import { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getProductById, 
  getAllProducts, 
  getProductsByCategory,
  checkLowStock 
} from '../controllers/productController';

const router = express.Router();

// Route pour ajouter un produit
router.post('/products', addProduct);

// Route pour mettre à jour un produit
router.put('/products/:product_id', updateProduct);

// Route pour supprimer un produit
router.delete('/products/:product_id', deleteProduct);

// Route pour récupérer un produit par ID
router.get('/products/:product_id', getProductById);

// Route pour récupérer tous les produits
router.get('/products', getAllProducts);

// Route pour récupérer les produits par catégorie
router.get('/products/category/:category', getProductsByCategory);

// Route pour vérifier les produits en faible stock
router.get('/products/low-stock', checkLowStock);

export default router;
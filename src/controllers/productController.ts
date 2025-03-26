import { Request, Response } from 'express';
import Product from '../models/Product';
import { Op } from 'sequelize'; // Assurez-vous d'importer Op pour les opérations de comparaison
import { addProductQuery, updateProductQuery, deleteProductQuery, getProductByIdQuery, getAllProductsQuery, getProductsByCategoryQuery } from '../query/query';


// Ajouter un produit
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock_quantity, image_url } = req.body;
    const product = await Product.create({ name, description, price, category, stock_quantity, image_url });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;
    const { name, description, price, category, stock_quantity, image_url } = req.body;
    const [updated] = await Product.update({ name, description, price, category, stock_quantity, image_url }, { where: { product_id } });
    
    if (updated) {
      const updatedProduct = await Product.findByPk(product_id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Supprimer un produit
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;
    const deleted = await Product.destroy({ where: { product_id } });
    
    if (deleted) {
      res.status(204).json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Récupérer un produit par ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findByPk(product_id);
    
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Récupérer tous les produits
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Récupérer les produits par catégorie
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await Product.findAll({ where: { category } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
};

// Vérifier les produits en faible stock
export const checkLowStock = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ where: { stock_quantity: { [Op.lt]: 10 } } }); // Exemple : alerte si stock < 10
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error checking low stock', error });
  }
};

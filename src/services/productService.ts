// Service pour les produits 
import Product from '../models/Product';

export const addProduct = async (productData: any) => {
  return await Product.create(productData);
};

export const updateProduct = async (productId: number, productData: any) => {
  return await Product.update(productData, { where: { product_id: productId } });
};

export const deleteProduct = async (productId: number) => {
  return await Product.destroy({ where: { product_id: productId } });
};

export const getProductById = async (productId: number) => {
  return await Product.findByPk(productId);
};

export const getAllProducts = async () => {
  return await Product.findAll();
};

export const getProductsByCategory = async (category: string) => {
  return await Product.findAll({ where: { category } });
};
import type{ Product } from '../types/Product';
import db from '../../public/data/db.json';

// quando a equipe de Back-end entregar a API só vai precisar mudar aq,
// (Ex: 'https://api.loadingjr.com.br/v1')
const BASE_URL = '/data/db.json';

export async function getProducts(): Promise<Product[]> {
    try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.products;
} catch (error) {
    console.error("Erro ao buscar os produtos:", error);
    return [];
    }
}
export const fetchOrders = () => {
  return Promise.resolve(db.orders);
};

export const fetchProducts = () => {
  return Promise.resolve(db.products);
};

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(product => product.id === id);
}
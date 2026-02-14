// src/services/api.ts
import type{ Product } from '../types/Product';
import db from '../../public/data/db.json';

// No futuro, quando a equipe de Back-end entregar a API,
// basta mudar essa única linha! (Ex: 'https://api.loadingjr.com.br/v1')
const BASE_URL = '/data/db.json';

export async function getProducts(): Promise<Product[]> {
    try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.products; // Retorna o array de produtos tipado!
} catch (error) {
    console.error("Erro ao buscar os produtos:", error);
    return [];
    }
}
export const fetchOrders = () => {
  // O Promise.resolve() simula o comportamento assíncrono de uma API real (como o fetch ou axios)
  return Promise.resolve(db.orders);
};

// Simulando uma requisição para buscar os produtos
export const fetchProducts = () => {
  return Promise.resolve(db.products);
};

// Adicione isso ao final do seu arquivo api.ts
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  // O método .find() procura no array o primeiro item que tenha o ID igual ao que pedimos
  return products.find(product => product.id === id);
}
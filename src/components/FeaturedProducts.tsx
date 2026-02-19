import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, X } from 'lucide-react';

import type { Product } from '../types/Product';
import { getProducts } from '../services/api';
import { useCart } from '../contexts/CartContext';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data.slice(0, 4));
    }
    loadProducts();
  }, []);

  function handleAddToCart(product: Product) {
    addToCart(product);
    alert(`"${product.name}" foi adicionado ao carrinho! 🛒`);
    setSelectedProduct(null);
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-[#0a0410] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Destaques
          </h2>
          <Link
            to="/products"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
          >
            Ver todos &rarr;
          </Link>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#150a21] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-800 flex flex-col group"
            >
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative aspect-square bg-gray-100 dark:bg-gray-800 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full z-10">
                  {product.category}
                </span>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white text-purple-600 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Search size={24} />
                  </div>
                </div>
              </div>

              {/* Infos */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-xl hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition-colors"
                    title="Visualização Rápida"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedProduct(null)}
          ></div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative flex flex-col md:flex-row z-10">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 p-2 rounded-full z-10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Imagem do produto */}
            <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-700 p-8 flex items-center justify-center">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="max-h-80 object-contain"
              />
            </div>

            {/* Informações do produto */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                {selectedProduct.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                {selectedProduct.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>

              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition font-bold shadow-lg shadow-purple-200 dark:shadow-none active:scale-95"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </button>

              <Link
                to={`/product/${selectedProduct.id}`}
                className="mt-4 text-center text-sm text-gray-500 hover:text-purple-600 underline block"
              >
                Ver detalhes completos
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

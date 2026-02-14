import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getProducts } from '../services/api';
import { Search } from 'lucide-react';
import type { Product } from '../types/Product';

export function Products() { 
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Todas' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f061a] transition-colors">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl mt-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white ">Nossos Produtos</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Encontre os melhores itens da Loading JR.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all group">
                
                <Link to={`/product/${product.id}`} className="block relative h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4 overflow-hidden">
                  <img 
                    src={product.images[0]}
                    alt={product.name} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.stock <= 5 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      Restam {product.stock}
                    </span>
                  )}
                </Link>

                <div className="p-5">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 truncate hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    
                    <Link 
                      to={`/product/${product.id}`}
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-lg hover:bg-purple-600 hover:text-white dark:hover:bg-purple-500 transition-colors"
                      title="Ver Detalhes Completos"
                    >
                      <Search size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}

      </main>
      
    </div>
  );
}
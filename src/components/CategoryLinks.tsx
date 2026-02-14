import { Shirt, Coffee, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Vestuário', icon: Shirt, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { name: 'Acessórios', icon: Coffee, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { name: 'Equipamentos', icon: Monitor, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
];

export function CategoryLinks() {
  return (
    <section className="py-12 bg-white dark:bg-[#0f061a] transition-colors duration-300 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Compre por Categoria</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={`/products?category=${category.name.toLowerCase()}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-md group"
            >
              <div className={`p-3 rounded-xl ${category.color} transition-transform group-hover:scale-110`}>
                <category.icon size={24} />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Header } from './Header';

export function Hero() {
  return (
    <div className="relative">
      <Header />
      
      <section className="min-h-[90vh] flex items-center bg-purple-50 dark:bg-[#0f061a] transition-colors duration-300 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl animate-fade-in-up lg:w-1/2">
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
                Vista o orgulho de ser <span className="text-purple-600 dark:text-purple-500">Loading.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                A loja oficial da Loading Jr. Garanta sua camisa exclusiva, canecas personalizadas e mostre ao mundo a sua paixão por tecnologia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30"
                >
                  <ShoppingBag size={20} />
                  Ver Produtos
                </Link>
                
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-semibold hover:border-purple-600 dark:hover:border-purple-500 transition-all"
                >
                  Criar Conta
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Gengar */}
            <div className="w-full lg:w-1/2 flex justify-center animate-fade-in-up">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-[80px] opacity-20 dark:opacity-40 rounded-full"></div>
                
                <img
                  src="/src/assets/logo_gengar.png"
                  alt="Mascote Gengar Loading Jr"
                  className="relative z-10 w-3/4 max-w-md mx-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
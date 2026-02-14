import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductById } from '../services/api';
import type { Product } from '../types/Product'; // Verifique se é 'Product' ou 'product' no seu projeto
import { useCart } from '../contexts/CartContext';
import { Header } from '../components/Header';

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      const data = await getProductById(id);
      setProduct(data || null);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) return <div className="text-center py-20">Carregando detalhes...</div>;
  if (!product) return <div className="text-center py-20">Produto não encontrado! 😢</div>;

  return (

    <div className="min-h-screen bg-white dark:bg-[#0f061a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <Header />

      <main className="container mx-auto px-4 py-12">
        
        <Link to="/" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-8 hover:underline">
          <ArrowLeft size={20} />
          Voltar para a loja
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
  
          <div className="relative group">
            <div className="bg-gray-100 dark:bg-[#150a21] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 aspect-square flex items-center justify-center relative overflow-hidden">
               
               <img 
                 src={product.images[currentImageIndex]} 
                 alt={product.name} 
                 className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 animate-fade-in-up"
               />

               {product.images.length > 1 && (
                 <>
                   <button 
                     onClick={prevImage}
                     className="absolute left-4 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black text-purple-600 dark:text-purple-400 transition-all opacity-0 group-hover:opacity-100"
                   >
                     <ChevronLeft size={32} />
                   </button>
                   <button 
                     onClick={nextImage}
                     className="absolute right-4 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black text-purple-600 dark:text-purple-400 transition-all opacity-0 group-hover:opacity-100"
                   >
                     <ChevronRight size={32} />
                   </button>
                 </>
               )}
            </div>

            {product.images.length > 1 && (
              <div className="flex justify-center gap-4 mt-4 ">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                      currentImageIndex === index 
                        ? 'border-purple-600 dark:border-purple-400 opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-sm font-bold px-3 py-1 rounded-full animate-fade-in-up">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4 animate-fade-in-up">{product.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed animate-fade-in-up">
              {product.description}
            </p>
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
              <span className="text-4xl font-bold text-purple-600 dark:text-purple-400 animate-fade-in-up">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <span className="text-sm text-gray-500 animate-fade-in-up">Em até 2x sem juros</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-8 font-medium animate-fade-in-up">
              <Check size={20} />
              {product.stock} unidades em estoque
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              
              <button 
                onClick={() => {
                  if(product) addToCart(product);
                  alert('Produto adicionado!');
                }}
                className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-purple-200 dark:shadow-none flex items-center gap-3 justify-center transition-transform hover:scale-105 active:scale-95"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </button>

              <button
                className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-green-200 dark:shadow-none flex items-center gap-3 justify-center transition-transform hover:scale-105 active:scale-95"
              >
                <ShoppingCart size={20} />
                Comprar Agora
              </button>

            </div>
          
          </div> 

        </div>
      </main>
    </div>
  );
}
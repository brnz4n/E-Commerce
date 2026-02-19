import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Store, ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { useCart } from '../contexts/CartContext';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItems(cartItems.map(item => item.id));
  }, [cartItems.length]);

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    } else {
      setSelectedItems(prev => [...prev, id]);
    }
  };

  const totalSelected = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const countSelected = selectedItems.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[#0f061a] transition-colors ">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <Link
            to="/products"
            className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors p-2 -ml-2 rounded-full hover:bg-purple-50 dark:hover:bg-gray-800"
            title="Voltar para os produtos"
          >
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <ShoppingBag /> Carrinho de Compras
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center flex flex-col items-center justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-full mb-4 ">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Parece que você ainda não adicionou nada.</p>
            <Link to="/products" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition flex items-center gap-2">
              Ir às Compras Now!
            </Link>
          </div>
        ) : (

          <div className="flex flex-col gap-4">
            
            <div className="hidden md:grid grid-cols-12 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-gray-500 dark:text-gray-400 text-sm font-medium items-center animate-fade-in-up">
              <div className="col-span-6 flex items-center gap-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                  checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                  onChange={handleSelectAll}
                />
                <span>Produto</span>
              </div>
              <div className="col-span-2 text-center">Preço Unitário</div>
              <div className="col-span-2 text-center">Quantidade</div>
              <div className="col-span-1 text-center">Preço Total</div>
              <div className="col-span-1 text-center">Ações</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">

              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium animate-fade-in-up">
                <Store size={18} />
                <span>Loja Oficial Loading Jr.</span>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 items-center last:border-0 relative animate-fade-in-up">
                  
                  <div className="col-span-1 md:col-span-6 flex items-start md:items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-purple-600 mt-1 md:mt-0 cursor-pointer"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                    />
                    <Link to={`/product/${item.id}`} className="flex gap-4 group">
                      <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-700" />
                      <div className="flex flex-col justify-center">
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full w-fit">
                          Categoria: {item.category}
                        </span>
                        {/* Preço Mobile */}
                        <div className="md:hidden mt-2 font-bold text-purple-600">
                          {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* preço unitário pc */}
                  <div className="hidden md:block col-span-2 text-center text-gray-600 dark:text-gray-300">
                    {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-10 text-center bg-transparent text-gray-900 dark:text-white font-medium focus:outline-none" 
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:block col-span-1 text-center font-bold text-purple-600 dark:text-purple-400">
                    {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>

                  <div className="col-span-1 flex justify-center md:justify-center absolute top-4 right-4 md:static">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Remover item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl z-40 animate-fade-in-up">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
                
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="selectAll"
                      className="w-4 h-4 accent-purple-600 cursor-pointer"
                      checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="selectAll" className="text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                      Selecionar Tudo ({cartItems.length})
                    </label>
                  </div>
                  <button className="text-red-500 hover:underline text-sm hidden md:block" onClick={() => selectedItems.forEach(id => removeFromCart(id))}>
                    Excluir Selecionados
                  </button>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-300">Total ({countSelected} itens):</span>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {totalSelected.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">Frete Grátis aplicado</span>
                  </div>

                  <Link
                    to="/checkout"
                    className={`px-8 py-3 rounded-lg font-bold text-white transition-all shadow-lg text-center ${
                      countSelected > 0
                        ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30'
                        : 'bg-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    Continuar
                  </Link>
                </div>

              </div>
            </div>

          </div>
        )}
      </main>

    </div>
  );
}
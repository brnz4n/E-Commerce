import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Search, ShoppingCart, User, LogOut, Package, ChevronDown, Trash2 } from 'lucide-react';
import logoLoading from '../assets/logo_loading.png';
import { useCart } from '../contexts/CartContext';

export function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // AGORA: Desestruturamos tudo o que precisamos do Carrinho
  const { cartCount, cartItems, cartTotal, removeFromCart } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0f061a]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors animate-fade-in-up">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* 1. Logo */}
        <Link to="/" className="flex items-center shrink-0 animate-fade-in-up">
          <img
            src={logoLoading}
            alt="Loading Store"
            className="w-auto h-15 object-contain" // Ajustei a altura para ficar proporcional ao header
          />
        </Link>

        {/* 2. Barra de Pesquisa (Desktop) */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center group relative">
          <div className="absolute left-3 text-gray-400 group-focus-within:text-purple-500 transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar produtos, categorias..." 
            className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-500 rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white outline-none transition-all"
          />
        </div>

        {/* 3. Ações à Direita */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          
          {/* Lupa (Mobile Only) */}
          <button className="md:hidden text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
            <Search size={24} />
          </button>

          {/* --- ÁREA DO CARRINHO (Com Dropdown no Hover) --- */}
          <div className="relative group z-50">
            <Link to="/cart" className="relative block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#0f061a]">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* DROPDOWN DO CARRINHO */}
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 transform origin-top-right">
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex justify-between">
                  Seu Carrinho
                  <span className="text-purple-600 dark:text-purple-400">{cartCount} itens</span>
                </h3>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-6">
                    <ShoppingCart size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500 text-sm">Seu carrinho está vazio.</p>
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center group/item hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-md object-contain bg-white border border-gray-200 dark:border-gray-700" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={item.name}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.quantity} x <span className="text-purple-600 dark:text-purple-400 font-bold">{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                          </p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault(); // Evita navegar para /cart ao clicar no lixo
                            removeFromCart(item.id);
                          }}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-full transition-all"
                          title="Remover item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rodapé do Dropdown (Total e Botão) */}
                {cartItems.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Subtotal:</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                    <Link 
                      to="/cart" 
                      className="block w-full bg-purple-600 text-white text-center py-2.5 rounded-lg font-bold text-sm hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-500/20"
                    >
                      Finalizar Compra
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* --- FIM DO CARRINHO --- */}

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          {/* Área do Usuário (Seu código original mantido e ajustado) */}
          {user ? (
            <div className="relative group cursor-pointer z-50">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2">
                <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center border border-purple-200 dark:border-purple-800">
                  <User size={18} />
                </div>
                <div className="hidden lg:block text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white leading-none">
                    {user.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">Minha Conta</p>
                </div>
                <ChevronDown size={16} className="hidden lg:block group-hover:rotate-180 transition-transform duration-300" />
              </div>

              {/* Menu do Usuário */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700/50 hover:text-purple-700 dark:hover:text-purple-400 rounded-lg transition-colors">
                    <User size={18} /> Meu Perfil
                  </Link>
                  <Link to="/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700/50 hover:text-purple-700 dark:hover:text-purple-400 rounded-lg transition-colors">
                    <Package size={18} /> Meus Pedidos
                  </Link>
                </div>
                <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut size={18} /> Sair da Conta
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-md shadow-purple-200 dark:shadow-none text-sm active:scale-95 transform"
            >
              <User size={18} />
              <span className="hidden sm:block">Entrar</span>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
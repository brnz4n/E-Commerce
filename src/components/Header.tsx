import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Search, ShoppingCart, User, LogOut, ChevronDown, Trash2, X, Sun, Moon } from 'lucide-react';
import logoLoading from '../assets/logo_loading.png';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import logo_roxa from '../assets/logo_roxa.png';

export function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cartCount, cartItems, removeFromCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${searchQuery}`);
      setIsMobileSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0f061a]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors animate-fade-in-up">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className={`flex items-center shrink-0 animate-fade-in-up ${isMobileSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          <img
            src={theme === 'dark' ? logoLoading : logo_roxa}
            alt="Loading Store"
            className="w-auto h-12 object-contain transition-all duration-300"
          />
        </Link>

        {/* Barra de Pesquisa PC */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex items-center group relative">
          <button type="submit" className="absolute left-3 text-gray-400 group-focus-within:text-purple-500 transition-colors">
            <Search size={20} />
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar produtos, categorias..."
            className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-500 rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white outline-none transition-all"
          />
        </form>

        {/* Barra de Pesquisa Mobile */}
        {isMobileSearchOpen ? (
          <form onSubmit={handleSearch} className="flex-1 flex md:hidden items-center gap-2 animate-in fade-in slide-in-from-top-2 w-full">
            <div className="relative flex-1">
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600 dark:text-purple-400">
                  <Search size={18} />
                </button>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="O que você procura?"
                  className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-purple-500 rounded-full py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white outline-none"
                />
            </div>
            <button type="button" onClick={() => setIsMobileSearchOpen(false)} className="text-gray-500 dark:text-gray-400 p-2 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-auto md:ml-0">
            
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              title={theme === 'dark' ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Botão Lupa Mobile */}
            <button onClick={() => setIsMobileSearchOpen(true)} className="md:hidden text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <Search size={24} />
            </button>

            {/* Carrinho */}
            <div className="relative group z-50">
              <Link to="/cart" className="relative block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#0f061a]">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 transform origin-top-right">
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex justify-between">
                    Seu Carrinho <span className="text-purple-600">{cartCount} itens</span>
                  </h3>
                  
                  {cartItems.length === 0 ? (
                    <div className="text-center py-6">
                      <ShoppingCart size={40} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 text-sm">Vazio</p>
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar pr-1">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center group/item hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                          <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-md object-contain bg-white border border-gray-200 dark:border-gray-700" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity} x <span className="text-purple-600 font-bold">R$ {item.price}</span></p>
                          </div>
                          <button onClick={(e) => { e.preventDefault(); removeFromCart(item.id); }} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  {cartItems.length > 0 && (
                    <Link to="/cart" className="block w-full bg-purple-600 text-white text-center py-2 mt-4 rounded-lg font-bold text-sm hover:bg-purple-700">
                      Ver Carrinho
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

            {user ? (
              <div className="relative group cursor-pointer z-50">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2">
                  <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center border border-purple-200 dark:border-purple-800">
                    <User size={18} />
                  </div>
                  <div className="hidden lg:block text-sm">
                    <p className="font-semibold text-gray-900 dark:text-white leading-none">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">Conta</p>
                  </div>
                  <ChevronDown size={16} className="hidden lg:block group-hover:rotate-180 transition-transform duration-300" />
                </div>

                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700/50 rounded-lg"><User size={18} /> Perfil</Link>
                  </div>
                  <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"><LogOut size={18} /> Sair</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-purple-700 shadow-md text-sm">
                <User size={18} /> <span className="hidden sm:block">Entrar</span>
              </Link>
            )}

          </div>
        )}
      </div>
    </header>
  );
}
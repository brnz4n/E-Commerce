import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Mail, HelpCircle } from 'lucide-react';
import logoLoading from '../assets/logo_loading.png';

export function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Preencha todos os campos!');
      return;
    }
    register({ name, email, password });
    alert('Conta criada com sucesso! Você está logado.');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-600 dark:bg-[#0f061a] transition-colors relative">

      <header className="bg-white dark:bg-gray-900 py-4 px-4 sm:px-8 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logoLoading} alt="Loading Store" className="h-10 w-auto object-contain" />
          </Link>
          <span className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white border-l-2 border-purple-600 pl-4">
            Cadastrar
          </span>
        </div>
        <Link to="#" className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
          <HelpCircle size={16} className="hidden sm:block" />
          Precisa de ajuda?
        </Link>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center lg:justify-between gap-12">
        
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center animate-fade-in-up text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-purple-400 blur-[100px] opacity-40 dark:opacity-30 rounded-full"></div>
            <img
              src="/src/assets/logo_gengar.png"
              alt="Mascote Gengar Loading Jr"
              className="relative z-10 w-full max-w-sm mx-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-md">
            Sua melhor plataforma de<br/>compras tech.
          </h1>
          <p className="text-purple-100 text-lg max-w-md">
            Vista o orgulho de ser Loading. Produtos exclusivos para desenvolvedores e amantes de tecnologia.
          </p>
        </div>

        <div className="w-full max-w-[420px] bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl animate-fade-in-up transition-colors">
          
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
            Cadastrar
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-colors"
                placeholder="Nome Completo"
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-colors"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:ring-1 focus:ring-purple-500 outline-none text-sm transition-colors"
                placeholder="Senha"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition-all font-bold shadow-sm uppercase text-sm mt-2"
            >
              Próximo
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="px-4 text-gray-400 text-xs uppercase">OU</span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>

          <div className="flex gap-2 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Facebook size={18} className="text-blue-600" />
              Facebook
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Mail size={18} className="text-red-500" />
              Google
            </button>
          </div>

          <div className="text-center text-[11px] text-gray-500 dark:text-gray-400 mb-6 px-4">
            Ao se inscrever, você concorda com as políticas da Loading Jr:{' '}
            <Link to="#" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">Termos de serviço</Link> &{' '}
            <Link to="#" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">Política de privacidade</Link>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Tem uma conta?{' '}
            <Link
              to="/login"
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              Entrar
            </Link>
          </p>

        </div>
      </main>
    </div>
  );
}
// src/pages/Login.tsx
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Footer } from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

export function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return alert('Preencha todos os campos!');
    
    const success = login(email, password);
    
    if (success) {
      alert('Login realizado com sucesso!');
      navigate('/Profile');
    } else {
      alert('Credenciais inválidas ou usuário não encontrado.');
    }
  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f061a] transition-colors">

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-md transition-colors animate-fade-in-up">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Bem-vindo de volta!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Faça login para continuar.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="exemplo@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all font-semibold shadow-md hover:shadow-lg mt-2"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Ainda não tem uma conta?{' '}
            <Link to="/register" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
              Crie uma agora
            </Link>
          </p>
        </div>
      </main>

    </div>
  );
}
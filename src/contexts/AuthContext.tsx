// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User, RegisterData } from '../types/auth';

interface AuthContextType {
  user: User | null;
  register: (data: RegisterData) => void;
  login: (email: string, password?: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Assim que o app abre, verifica se já tem alguém logado no LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('@LoadingJR:user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (data: RegisterData) => {
    // Simulando a criação de um ID único pelo back-end
    const newUser: User = {
      id: String(Math.random()),
      name: data.name,
      email: data.email,
    };

    setUser(newUser);
    // Salvando no LocalStorage conforme exigido no bônus
    localStorage.setItem('@LoadingJR:user', JSON.stringify(newUser));
  };

const login = (email: string) => {
    const storedUser = localStorage.getItem('@LoadingJR:user');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
      // Verifica se o email digitado é o mesmo que está salvo no navegador
        if (parsedUser.email === email) {
        setUser(parsedUser);
        return true; // Login deu certo
        }
    }
    return false; // Usuário não encontrado ou email errado
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@LoadingJR:user');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
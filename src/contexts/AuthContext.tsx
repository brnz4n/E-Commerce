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

  const register = async (data: RegisterData) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      address: {
        street: 'Endereço Pendente',
        number: 'S/N',
        neighborhood: '-',
        city: '-',
        state: '-',
        zipCode: '00000-000'
      }
    };
    setUser(newUser);
    localStorage.setItem('@loading-jr:user', JSON.stringify(newUser));
  };

const login = async (email: string, password?: string) => {
    const mockUser: User = {
      id: '1',
      name: 'Dev Loading Jr',
      email: email,
      address: {
        street: 'Rua Coronel Estanislau Frota',
        number: 'S/N',
        neighborhood: 'Centro',
        city: 'Sobral',
        state: 'CE',
        zipCode: '62010-560'
      }
    };
    setUser(mockUser);
    localStorage.setItem('@loading-jr:user', JSON.stringify(mockUser));
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
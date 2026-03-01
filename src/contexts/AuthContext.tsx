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

  useEffect(() => {
    const storedUser = localStorage.getItem('@loading-jr:user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (data: RegisterData) => {
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

  const login = (email: string, password?: string) => {
    const storedUser = localStorage.getItem('@loading-jr:user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);
        return true;
      }
    }

    const nameFromEmail = email.split('@')[0];
    const dynamicName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const mockUser: User = {
      id: crypto.randomUUID(),
      name: dynamicName,
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
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@loading-jr:user');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
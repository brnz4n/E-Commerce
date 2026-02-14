// src/types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  
}

// Simulando o que enviaríamos para uma API
export interface RegisterData extends Omit<User, 'id'> {
  password?: string; // Opcional aqui pois não vamos salvar a senha no LocalStorage por segurança básica
}
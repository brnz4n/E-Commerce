export interface User {
  id: string;
  name: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  number: string; // numero da casa
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

// Simulando o que enviaríamos para uma API
export interface RegisterData extends Omit<User, 'id' | 'address'> {
  password?: string;
}
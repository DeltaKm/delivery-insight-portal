
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Delivery {
  id: string;
  riderId: string;
  riderEmail: string;
  recipientName: string;
  deliveryAddress: string;
  date: string;
  status: 'delivered' | 'pending' | 'cancelled';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

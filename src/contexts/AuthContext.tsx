'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import toast from 'react-hot-toast';

const VALID_CREDENTIALS = {
  email: 'admin@logik.com',
  password: 'admin123',
};

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Verifica credenciais básicas
      if (
        email === VALID_CREDENTIALS.email &&
        password === VALID_CREDENTIALS.password
      ) {
        // Cria dados do usuário
        const userData: User = {
          id: '1',
          name: 'Administrador',
          email: 'admin@logik.com',
        };
        const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        setUser(userData);

        toast.success('Login realizado com sucesso!');
        router.push('/admin/dashboard');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao fazer login';
      toast.error(message);
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/admin/login');
    toast.success('Logout realizado com sucesso!');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

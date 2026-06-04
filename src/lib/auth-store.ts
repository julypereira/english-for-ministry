import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Define os tipos de perfis de usuário disponíveis no sistema.
 */
export type UserProfile = "Administrador" | "Aluno";

/**
 * Interface que representa a estrutura de um usuário.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  profile: UserProfile;
  createdAt: string;
}

/**
 * Interface que define o estado e as ações de autenticação.
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

/**
 * Store de autenticação utilizando Zustand com persistência local.
 * Gerencia o estado do usuário logado e métodos de login/logout.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      /**
       * Realiza o login do usuário no sistema.
       * @param user Objeto do usuário a ser autenticado.
       */
      login: (user) => {
        try {
          console.log("Logging in user:", user.email);
          set({ user, isAuthenticated: true });
        } catch (err) {
          console.error("Erro ao realizar login no store:", err);
        }
      },
      /**
       * Realiza o logout do usuário, limpando o estado.
       */
      logout: () => {
        try {
          set({ user: null, isAuthenticated: false });
        } catch (err) {
          console.error("Erro ao realizar logout no store:", err);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserProfile = "Administrador" | "Aluno";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  profile: UserProfile;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        try {
          console.log("Logging in user:", user.email);
          set({ user, isAuthenticated: true });
        } catch (err) {
          console.error("Erro ao realizar login no store:", err);
        }
      },
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

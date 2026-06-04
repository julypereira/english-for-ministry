import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './auth-store';

interface UsersState {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set) => ({
      users: [
        { id: "1", name: "Administrador", email: "adm@adm.com", password: "123", profile: "Administrador", createdAt: "2024-03-20" },
        { id: "3", name: "Aluno Teste", email: "aluno@aluno.com", password: "123", profile: "Aluno", createdAt: "2026-06-03" },
      ],
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (user) => set((state) => ({ users: state.users.map((u) => (u.id === user.id ? user : u)) })),
      deleteUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
    }),
    {
      name: 'users-storage-v2',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './auth-store';

/**
 * Interface que define o estado e as ações para gerenciamento de usuários.
 */
interface UsersState {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

/**
 * Store de usuários utilizando Zustand com persistência local.
 * Armazena a lista de usuários cadastrados e provê métodos de CRUD.
 */
export const useUsersStore = create<UsersState>()(
  persist(
    (set) => ({
      // Lista inicial de usuários (Administrador e Aluno de teste)
      users: [
        { id: "1", name: "Administrador", email: "adm@adm.com", password: "Ch@nge0987", profile: "Administrador", createdAt: "2024-03-20" },
        { id: "3", name: "Aluno Teste", email: "aluno@aluno.com", password: "Ch@nge1234", profile: "Aluno", createdAt: "2026-06-03" },
      ],
      /**
       * Adiciona um novo usuário à lista.
       */
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      /**
       * Atualiza os dados de um usuário existente.
       */
      updateUser: (user) => set((state) => ({ users: state.users.map((u) => (u.id === user.id ? user : u)) })),
      /**
       * Remove um usuário da lista pelo ID.
       */
      deleteUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
    }),
    {
      // Versão do storage para controle de migrações manuais de dados
      name: 'users-storage-v3',
    }
  )
);

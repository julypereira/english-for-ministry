import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Search, 
  ChevronLeft,
  Shield,
  GraduationCap,
  X,
  Check
} from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersComponent,
});

type UserProfile = "Administrador" | "Aluno";

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  profile: UserProfile;
  createdAt: string;
}

function AdminUsersComponent() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "João Silva", email: "admin@church.com", password: "adm1234", profile: "Administrador", createdAt: "2024-03-20" },
    { id: "2", name: "Maria Oliveira", email: "maria@example.com", profile: "Aluno", createdAt: "2024-03-21" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", profile: "Aluno" as UserProfile });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, password: user.password || "", profile: user.profile });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "", profile: "Aluno" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="container mx-auto max-w-6xl">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/login" className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                <Users className="text-primary" />
                Gestão de Usuários
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold opacity-60">Painel Administrativo</p>
            </div>
          </div>
          
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <UserPlus size={18} />
            Novo Usuário
          </button>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-white/10 bg-white/[0.02]">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar por nome ou email..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-6 py-4">Usuário</th>
                  <th className="px-6 py-4">Perfil</th>
                  <th className="px-6 py-4">Criado em</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-primary font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        user.profile === "Administrador" 
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {user.profile === "Administrador" ? <Shield size={10} /> : <GraduationCap size={10} />}
                        {user.profile}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {user.createdAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(user)}
                          className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                {editingUser ? "Editar Usuário" : "Novo Usuário"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Nome do usuário"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Perfil de Acesso</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, profile: "Administrador" })}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.profile === "Administrador" 
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                        : "bg-slate-950 border-white/10 text-slate-500 hover:border-white/20"
                    }`}
                  >
                    <Shield size={14} />
                    Administrador
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, profile: "Aluno" })}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.profile === "Aluno" 
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                        : "bg-slate-950 border-white/10 text-slate-500 hover:border-white/20"
                    }`}
                  >
                    <GraduationCap size={14} />
                    Aluno
                  </button>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Check size={14} />
                  {editingUser ? "Salvar Alterações" : "Criar Usuário"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

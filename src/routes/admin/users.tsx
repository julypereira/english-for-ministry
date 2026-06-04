import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/auth-store";
import { useUsersStore } from "@/lib/users-store";
import { useSchoolStore } from "@/lib/school-store";
import type { User, UserProfile } from "@/lib/auth-store";
import type { Class, Lesson, LessonStatus } from "@/lib/school-store";
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
  Check,
  LogOut,
  Languages,
  Users2,
  BookOpen,
  Plus,
  ArrowLeft,
  Lock,
  Unlock,
  Video,
  AlertCircle,
  Play
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";





export const Route = createFileRoute("/admin/users")({
  component: AdminUsersComponent,
});


function AdminUsersComponent() {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuthStore();
  const { users, addUser, updateUser, deleteUser } = useUsersStore();
  const { lang, toggleLang } = useLanguageStore();
  const { modules, classes, addClass, updateClass, deleteClass, lessons, addLesson, updateLesson, deleteLesson, releaseLesson, lockLesson } = useSchoolStore();
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"users" | "classes" | "lessons">("users");

  useEffect(() => {
    const adminUser = useUsersStore.getState().users.find(u => u.profile === "Administrador");
    if ((!currentUser || currentUser.profile !== "Administrador") && adminUser) {
      useAuthStore.getState().login(adminUser);
    }
  }, [currentUser]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", profile: "Aluno" as UserProfile });

  // Class Management State
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [classFormData, setClassFormData] = useState({ 
    name: "", 
    moduleIds: [] as number[], 
    studentIds: [] as string[] 
  });

  // Lesson Management State
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonFormData, setLessonFormData] = useState({
    title: "",
    moduleId: 1,
    theory: "",
    exercises: "",
    homework: "",
    canvaUrl: "",
    status: "locked" as LessonStatus
  });

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
    try {
      if (editingUser) {
        updateUser({ ...editingUser, ...formData });
      } else {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        addUser(newUser);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Erro ao salvar usuário:", err);
      setError(lang === 'pt' ? "Erro ao salvar usuário. Tente novamente." : "Error saving user. Please try again.");
    }
  };

  const handleDelete = (id: string) => {
    try {
      if (window.confirm(lang === 'pt' ? "Tem certeza que deseja excluir este usuário?" : "Are you sure you want to delete this user?")) {
        deleteUser(id);
      }
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      setError(lang === 'pt' ? "Erro ao excluir usuário." : "Error deleting user.");
    }
  };

  // Class management handlers
  const handleOpenClassModal = (cls?: Class) => {
    if (cls) {
      setEditingClass(cls);
      setClassFormData({ name: cls.name, moduleIds: cls.moduleIds, studentIds: cls.studentIds });
    } else {
      setEditingClass(null);
      setClassFormData({ name: "", moduleIds: [], studentIds: [] });
    }
    setIsClassModalOpen(true);
  };

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClass) {
        updateClass({ ...editingClass, ...classFormData });
      } else {
        addClass({
          id: Math.random().toString(36).substr(2, 9),
          ...classFormData
        });
      }
      setIsClassModalOpen(false);
    } catch (err) {
      console.error("Erro ao salvar turma:", err);
      setError(lang === 'pt' ? "Erro ao salvar turma." : "Error saving class.");
    }
  };

  const handleDeleteClass = (id: string) => {
    if (window.confirm(lang === 'pt' ? "Tem certeza que deseja excluir esta turma?" : "Are you sure you want to delete this class?")) {
      deleteClass(id);
    }
  };

  // Lesson management handlers
  const handleOpenLessonModal = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson);
      setLessonFormData({
        title: lesson.title,
        moduleId: lesson.moduleId,
        theory: lesson.theory,
        exercises: lesson.exercises,
        homework: lesson.homework,
        canvaUrl: lesson.canvaUrl || "",
        status: lesson.status
      });
    } else {
      setEditingLesson(null);
      setLessonFormData({
        title: "",
        moduleId: 1,
        theory: "",
        exercises: "",
        homework: "",
        canvaUrl: "",
        status: "locked"
      });
    }
    setIsLessonModalOpen(true);
  };

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingLesson) {
        updateLesson({ ...editingLesson, ...lessonFormData });
      } else {
        const newLesson: Lesson = {
          id: Math.random().toString(36).substr(2, 9),
          order: lessons.filter(l => l.moduleId === lessonFormData.moduleId).length + 1,
          ...lessonFormData
        };
        addLesson(newLesson);
      }
      setIsLessonModalOpen(false);
    } catch (err) {
      console.error("Erro ao salvar aula:", err);
      setError(lang === 'pt' ? "Erro ao salvar aula." : "Error saving lesson.");
    }
  };

  const handleDeleteLesson = (id: string) => {
    if (window.confirm(lang === 'pt' ? "Tem certeza que deseja excluir esta aula?" : "Are you sure you want to delete this lesson?")) {
      deleteLesson(id);
    }
  };

  const toggleLessonStatus = (lesson: Lesson) => {
    if (lesson.status === "released") {
      lockLesson(lesson.id);
    } else {
      releaseLesson(lesson.id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };



  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 p-4 md:p-8 font-sans transition-colors duration-300">

      <div className="container mx-auto max-w-6xl">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] p-4 rounded-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top duration-300">
              <div className="flex items-center gap-3">
                <AlertCircle size={16} />
                <p className="font-black uppercase tracking-widest">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-red-500 hover:text-white transition-colors font-black uppercase tracking-widest text-[8px]"
              >
                [X]
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">

            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                <Shield className="text-primary" />
                {lang === 'pt' ? 'Administração' : 'Administration'}
              </h1>
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={() => setActiveTab("users")}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'users' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {lang === 'pt' ? 'Usuários' : 'Users'}
                </button>
                <button 
                  onClick={() => setActiveTab("classes")}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'classes' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {lang === 'pt' ? 'Turmas' : 'Classes'}
                </button>
                <button 
                  onClick={() => setActiveTab("lessons")}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'lessons' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {lang === 'pt' ? 'Aulas' : 'Lessons'}
                </button>
              </div>
            </div>

          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-primary text-white"
              aria-label="Trocar Idioma"
            >
              <Languages size={14} className="text-primary" />
              <span>{lang === 'pt' ? 'PT' : 'EN'}</span>
            </button>
              <Link 
                to="/aulas"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/10"
              >
                <ArrowLeft size={14} />
                {lang === 'pt' ? 'Voltar' : 'Back'}
              </Link>
              <button 
                onClick={() => {
                  if (activeTab === 'users') handleOpenModal();
                  else if (activeTab === 'classes') handleOpenClassModal();
                  else handleOpenLessonModal();
                }}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                <Plus size={16} />
                {activeTab === 'users' ? (lang === 'pt' ? 'Novo Usuário' : 'New User') : 
                 activeTab === 'classes' ? (lang === 'pt' ? 'Nova Turma' : 'New Class') : 
                 (lang === 'pt' ? 'Nova Aula' : 'New Lesson')}
              </button>

          </div>

        </header>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors">
          {activeTab === 'users' ? (
            <>
              <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    placeholder={lang === 'pt' ? "Pesquisar por nome ou email..." : "Search by name or email..."}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors text-slate-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      <th className="px-6 py-4">{lang === 'pt' ? 'Usuário' : 'User'}</th>
                      <th className="px-6 py-4">{lang === 'pt' ? 'Perfil' : 'Profile'}</th>
                      <th className="px-6 py-4">{lang === 'pt' ? 'Evolução' : 'Evolution'}</th>
                      <th className="px-6 py-4">{lang === 'pt' ? 'Criado em' : 'Created at'}</th>
                      <th className="px-6 py-4 text-right">{lang === 'pt' ? 'Ações' : 'Actions'}</th>
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
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5 min-w-[120px]">
                            {user.profile === "Aluno" ? (
                              (() => {
                                const userLessons = lessons;
                                const userProgress = useSchoolStore.getState().progress.filter(p => p.studentId === user.id);
                                const totalLessons = userLessons.length;
                                const completedLessons = userProgress.filter(p => p.completed).length;
                                const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                                
                                return (
                                  <>
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                                      <span>{percentage}%</span>
                                      <span>{completedLessons}/{totalLessons} {lang === 'pt' ? 'Aulas' : 'Lessons'}</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-primary transition-all duration-500" 
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </>
                                );
                              })()
                            ) : (
                              <span className="text-[10px] text-slate-600 italic">--</span>
                            )}
                          </div>
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
            </>
          ) : activeTab === 'classes' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-6 py-4">{lang === 'pt' ? 'Nome da Turma' : 'Class Name'}</th>
                    <th className="px-6 py-4">{lang === 'pt' ? 'Módulos Liberados' : 'Released Modules'}</th>
                    <th className="px-6 py-4">{lang === 'pt' ? 'Alunos' : 'Students'}</th>
                    <th className="px-6 py-4 text-right">{lang === 'pt' ? 'Ações' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {classes.map((cls) => (
                    <tr key={cls.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-white">{cls.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {cls.moduleIds.map(id => (
                            <span key={id} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-slate-400">
                              {modules.find(m => m.id === id)?.title}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {cls.studentIds.length} {lang === 'pt' ? 'Alunos' : 'Students'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenClassModal(cls)}
                            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteClass(cls.id)}
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
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-6 py-4">{lang === 'pt' ? 'Aula' : 'Lesson'}</th>
                    <th className="px-6 py-4">{lang === 'pt' ? 'Módulo' : 'Module'}</th>
                    <th className="px-6 py-4">{lang === 'pt' ? 'Status' : 'Status'}</th>
                    <th className="px-6 py-4 text-right">{lang === 'pt' ? 'Ações' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {lessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lesson.canvaUrl ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-slate-500'}`}>
                            <Video size={14} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{lesson.title}</div>
                            
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1 bg-white/5 border border-white/10 rounded">
                          {modules.find(m => m.id === lesson.moduleId)?.title}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleLessonStatus(lesson)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                            lesson.status === "released" 
                              ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {lesson.status === "released" ? <Unlock size={10} /> : <Lock size={10} />}
                          {lesson.status === "released" ? (lang === 'pt' ? 'Liberada' : 'Released') : (lang === 'pt' ? 'Bloqueada' : 'Locked')}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenLessonModal(lesson)}
                            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteLesson(lesson.id)}
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
          )}
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
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Senha</label>
                <input 
                  type="password" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
      {/* Class Modal */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                <Users2 className="text-primary" size={20} />
                {editingClass ? (lang === 'pt' ? "Editar Turma" : "Edit Class") : (lang === 'pt' ? "Nova Turma" : "New Class")}
              </h2>
              <button onClick={() => setIsClassModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleClassSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{lang === 'pt' ? 'Nome da Turma' : 'Class Name'}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors text-white"
                    placeholder="Ex: Turma 2024-A"
                    value={classFormData.name}
                    onChange={(e) => setClassFormData({ ...classFormData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{lang === 'pt' ? 'Módulos Liberados' : 'Released Modules'}</label>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
                    {modules.map(module => (
                      <label key={module.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all cursor-pointer group">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 rounded border-white/10 bg-slate-950 text-primary focus:ring-primary"
                          checked={classFormData.moduleIds.includes(module.id)}
                          onChange={(e) => {
                            const newIds = e.target.checked 
                              ? [...classFormData.moduleIds, module.id]
                              : classFormData.moduleIds.filter(id => id !== module.id);
                            setClassFormData({ ...classFormData, moduleIds: newIds });
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">{module.title}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{lang === 'pt' ? 'Selecionar Alunos' : 'Select Students'}</label>
                  <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-2">
                    {users.filter(u => u.profile === "Aluno").map(student => (
                      <label key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all cursor-pointer group">
                        <input 
                          type="checkbox"
                          className="w-4 h-4 rounded border-white/10 bg-slate-950 text-primary focus:ring-primary"
                          checked={classFormData.studentIds.includes(student.id)}
                          onChange={(e) => {
                            const newIds = e.target.checked 
                              ? [...classFormData.studentIds, student.id]
                              : classFormData.studentIds.filter(id => id !== student.id);
                            setClassFormData({ ...classFormData, studentIds: newIds });
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">{student.name}</span>
                          <span className="text-[9px] text-slate-500">{student.email}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white"
                >
                  {lang === 'pt' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Check size={14} />
                  {editingClass ? (lang === 'pt' ? "Salvar Turma" : "Save Class") : (lang === 'pt' ? "Criar Turma" : "Create Class")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Lesson Modal */}
      {isLessonModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-white/[0.03] to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                  <Video size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-white leading-none">
                    {editingLesson ? (lang === 'pt' ? "Editar Aula" : "Edit Lesson") : (lang === 'pt' ? "Nova Aula" : "New Lesson")}
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">
                    {lang === 'pt' ? 'Configurações de Conteúdo' : 'Content Settings'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsLessonModalOpen(false)} 
                className="p-3 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleLessonSubmit} className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-primary transition-colors">
                    {lang === 'pt' ? 'Título da Aula' : 'Lesson Title'}
                  </label>
                  <div className="relative">
                    <input 
                      required
                      type="text" 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-white placeholder:text-slate-700"
                      placeholder={lang === 'pt' ? "Ex: Alfabeto Inglês" : "Ex: English Alphabet"}
                      value={lessonFormData.title}
                      onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-primary transition-colors">
                    {lang === 'pt' ? 'Módulo do Curso' : 'Course Module'}
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-white appearance-none cursor-pointer"
                      value={lessonFormData.moduleId}
                      onChange={(e) => setLessonFormData({ ...lessonFormData, moduleId: parseInt(e.target.value) })}
                    >
                      {modules.map(m => (
                        <option key={m.id} value={m.id} className="bg-slate-900">{m.title}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ChevronLeft size={16} className="-rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-primary transition-colors">
                  {lang === 'pt' ? 'Código HTML de incorporação' : 'HTML Embed Code'}
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-5 text-primary/50 group-focus-within:text-primary transition-colors">
                    <Video size={18} />
                  </div>
                  <textarea
                    required
                    rows={6}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-xs font-mono focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-white placeholder:text-slate-700"
                    placeholder='<iframe ... src="https://www.canva.com/design/.../view?embed" ...></iframe>'
                    value={lessonFormData.canvaUrl}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, canvaUrl: e.target.value })}
                  />
                </div>
                <p className="text-[9px] text-slate-500 ml-1 italic">
                  {lang === 'pt'
                    ? '* Cole o código HTML completo de incorporação (iframe) gerado pelo Canva ou outra plataforma.'
                    : '* Paste the full HTML embed code (iframe) generated by Canva or another platform.'}
                </p>
              </div>

              <div className="pt-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-3 block">
                  {lang === 'pt' ? 'Visibilidade para Alunos' : 'Student Visibility'}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setLessonFormData({ ...lessonFormData, status: "released" })}
                    className={`flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border-2 transition-all duration-300 group/btn ${
                      lessonFormData.status === "released" 
                        ? "bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]" 
                        : "bg-slate-950/30 border-white/5 text-slate-500 hover:border-white/20"
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${lessonFormData.status === "released" ? "bg-green-500/20" : "bg-white/5"}`}>
                      <Unlock size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {lang === 'pt' ? 'Liberada' : 'Released'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLessonFormData({ ...lessonFormData, status: "locked" })}
                    className={`flex items-center justify-center gap-3 py-5 rounded-[1.5rem] border-2 transition-all duration-300 group/btn ${
                      lessonFormData.status === "locked" 
                        ? "bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]" 
                        : "bg-slate-950/30 border-white/5 text-slate-500 hover:border-white/20"
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${lessonFormData.status === "locked" ? "bg-red-500/20" : "bg-white/5"}`}>
                      <Lock size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {lang === 'pt' ? 'Bloqueada' : 'Locked'}
                    </span>
                  </button>
                </div>
              </div>
            </form>

            <div className="p-8 border-t border-white/5 bg-gradient-to-t from-white/[0.03] to-transparent flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsLessonModalOpen(false)}
                className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white active:scale-95"
              >
                {lang === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  const form = (e.currentTarget as HTMLButtonElement).closest('form');
                  if (form) form.requestSubmit();
                  else handleLessonSubmit(e as any);
                }}
                className="flex-[2] py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 group"
              >
                <Check size={18} className="group-hover:scale-125 transition-transform" />
                {editingLesson ? (lang === 'pt' ? "Salvar Alterações" : "Save Changes") : (lang === 'pt' ? "Criar Aula" : "Create Lesson")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

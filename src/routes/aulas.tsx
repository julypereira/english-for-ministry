import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { LogOut, GraduationCap, Lock, ArrowRight, Languages, LayoutGrid } from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { useSchoolStore } from "@/lib/school-store";

export const Route = createFileRoute("/aulas")({
  component: AulasComponent,
});

function AulasComponent() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { lang, toggleLang } = useLanguageStore();
  const { modules, classes } = useSchoolStore();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  if (!user) return null;

  const isAdmin = user.profile === "Administrador";

  // Check if student has access to a module via their classes
  const hasAccess = (moduleId: number) => {
    if (isAdmin) return true;
    return classes.some(c => c.studentIds.includes(user.id) && c.moduleIds.includes(moduleId));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-primary/30 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-lg px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-3 transition-transform">
              <span className="text-white font-black text-xl italic select-none">A</span>
            </div>
            <div className="hidden sm:block font-black text-sm uppercase tracking-tighter">Amigo Intimo</div>
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {isAdmin && (
              <Link 
                to="/admin/users" 
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
              >
                {lang === 'pt' ? 'Gerenciar' : 'Manage'}
              </Link>
            )}
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-primary text-white"
            >
              <Languages size={14} className="text-primary" />
              <span>{lang === 'pt' ? 'PT' : 'EN'}</span>
            </button>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">{lang === 'pt' ? user.profile : (user.profile === 'Administrador' ? 'Admin' : 'Student')}</span>
              <span className="text-sm font-bold">{user.name}</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">{lang === 'pt' ? 'Sair' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto py-12 px-6">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
            <GraduationCap size={12} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              {isAdmin ? (lang === 'pt' ? 'Visão do Administrador' : 'Admin View') : (lang === 'pt' ? 'Dashboard do Aluno' : 'Student Dashboard')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">{lang === 'pt' ? 'Módulos do Curso' : 'Course Modules'}</h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            {lang === 'pt' ? 'Escolha o nível que deseja estudar hoje.' : 'Choose the level you want to study today.'}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map(module => {
            const accessible = hasAccess(module.id);
            return (
              <div key={module.id} className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 transition-all duration-300 overflow-hidden">
                {!accessible && (
                  <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex items-center justify-center flex-col gap-4 animate-in fade-in duration-500">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <Lock size={20} className="text-white/40" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                      {lang === 'pt' ? 'BLOQUEADO' : 'LOCKED'}
                    </span>
                  </div>
                )}
                
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all">
                  <LayoutGrid size={24} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{module.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {lang === 'pt' ? `Acesse o conteúdo completo do módulo ${module.title}.` : `Access the full content of the ${module.title} module.`}
                </p>
                <Link 
                  to="/modulo/$moduleId"
                  params={{ moduleId: module.id.toString() }}
                  disabled={!accessible}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                    accessible 
                    ? "bg-white/5 border-white/10 text-white hover:bg-primary hover:border-primary" 
                    : "bg-transparent border-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  {lang === 'pt' ? 'Acessar Módulo' : 'Access Module'}
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

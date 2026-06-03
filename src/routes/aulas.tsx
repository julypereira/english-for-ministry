import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { LogOut, GraduationCap, BookOpen, ArrowRight } from "lucide-react";



export const Route = createFileRoute("/aulas")({
  component: AulasComponent,
});


function AulasComponent() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();



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

  const aulas = [
    { id: 1, title: "English for Missions 101", description: "Vocabulário básico para missões." },
    { id: 2, title: "Preaching in English", description: "Como estruturar uma mensagem curta em inglês." },
    { id: 3, title: "Prayer and Intercession", description: "Termos e frases comuns para oração." },
  ];

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
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Estudante</span>
              <span className="text-sm font-bold">{user.name}</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto py-12 px-6">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
            <GraduationCap size={12} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Dashboard do Aluno</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Minhas Aulas</h1>
          <p className="text-slate-400 mt-2 max-w-xl">Bem-vindo de volta! Continue sua jornada de aprendizado do inglês ministerial.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aulas.map(aula => (
            <div key={aula.id} className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all">
                <BookOpen size={24} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{aula.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{aula.description}</p>
              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-primary group-hover:border-primary transition-all">
                Assistir Aula
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

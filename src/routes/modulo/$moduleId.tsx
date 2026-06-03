import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { 
  LogOut, 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Lock, 
  Trophy,
  BookOpen,
  PenTool,
  Home as HomeIcon,
  Languages
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { useSchoolStore } from "@/lib/school-store";

export const Route = createFileRoute("/modulo/$moduleId")({
  component: ModuloComponent,
});

function ModuloComponent() {
  const { moduleId } = Route.useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { lang, toggleLang } = useLanguageStore();
  const { modules, lessons, progress, classes } = useSchoolStore();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  if (!user) return null;

  const mId = parseInt(moduleId);
  const module = modules.find((m) => m.id === mId);
  const moduleLessons = lessons
    .filter((l) => l.moduleId === mId)
    .sort((a, b) => a.order - b.order);

  const isAdmin = user.profile === "Administrador";
  const hasAccess = isAdmin || classes.some(c => c.studentIds.includes(user.id) && c.moduleIds.includes(mId));

  if (!module || !hasAccess) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Módulo não encontrado ou sem acesso</h1>
          <Link to="/aulas" className="text-primary hover:underline">Voltar para Aulas</Link>
        </div>
      </div>
    );
  }

  const getLessonProgress = (lessonId: string) => {
    const p = progress.find((p) => p.studentId === user.id && p.lessonId === lessonId);
    return p ? { completed: p.completed, score: p.score } : { completed: false, score: 0 };
  };

  const isLessonLocked = (index: number) => {
    if (isAdmin || index === 0) return false;
    const previousLesson = moduleLessons[index - 1];
    return !getLessonProgress(previousLesson.id).completed;
  };

  const totalLessons = moduleLessons.length;
  const completedLessons = moduleLessons.filter(l => getLessonProgress(l.id).completed).length;
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isApproved = completionPercentage >= 70;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-lg px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/aulas" className="flex items-center gap-2 group text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
            <span className="font-black text-[10px] uppercase tracking-widest">Voltar</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"
            >
              <Languages size={14} className="text-primary" />
              <span>{lang === 'pt' ? 'PT' : 'EN'}</span>
            </button>
            <button 
              onClick={handleLogout} 
              className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto py-12 px-6 max-w-4xl">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{module.title}</h1>
            <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isApproved ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-primary/10 border-primary/20 text-primary'}`}>
              <Trophy size={14} />
              {completionPercentage}% {lang === 'pt' ? 'Concluído' : 'Completed'}
            </div>
          </div>
          <p className="text-slate-400">
            {lang === 'pt' 
              ? `Você precisa de 70% de aproveitamento para ser aprovado. Atualmente: ${completionPercentage}%`
              : `You need 70% completion to pass. Current: ${completionPercentage}%`}
          </p>
        </header>

        <div className="space-y-4">
          {moduleLessons.map((lesson, index) => {
            const locked = isLessonLocked(index);
            const { completed, score } = getLessonProgress(lesson.id);
            
            return (
              <div 
                key={lesson.id} 
                className={`group relative bg-white/[0.02] border rounded-2xl p-6 transition-all duration-300 ${locked ? 'border-white/5 opacity-50' : 'border-white/10 hover:bg-white/[0.04]'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${completed ? 'bg-green-500/20 text-green-500' : (locked ? 'bg-white/5 text-white/20' : 'bg-primary/20 text-primary')}`}>
                      {completed ? <CheckCircle2 size={20} /> : (locked ? <Lock size={20} /> : <Video size={20} />)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{lesson.title}</h3>
                      <div className="flex gap-4 mt-1">
                        {/* Removido Teoria, Exercícios e Homework conforme solicitado */}
                      </div>
                    </div>
                  </div>
                  
                  {!locked && (
                    <Link 
                      to="/modulo/$moduleId/aula/$lessonId"
                      params={{ moduleId: moduleId.toString(), lessonId: lesson.id }}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
                    >
                      <Play size={14} fill="currentColor" />
                      {lang === 'pt' ? 'Acessar' : 'Access'}
                    </Link>
                  )}
                </div>
                
                {completed && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Desempenho:</span>
                    <div className="h-1.5 flex-1 mx-4 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${score}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-green-500">{score}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
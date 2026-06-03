import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  Languages,
  X,
  Check
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { useSchoolStore, Lesson } from "@/lib/school-store";

export const Route = createFileRoute("/modulo/$moduleId")({
  component: ModuloComponent,
});

function ModuloComponent() {
  const { moduleId } = Route.useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { lang, toggleLang } = useLanguageStore();
  const { modules, lessons, progress, classes, completeLesson } = useSchoolStore();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'homework'>('theory');

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

  const handleCompleteLesson = () => {
    if (selectedLesson && user) {
      // For simplicity, giving 100% score when clicking complete in this simulation
      completeLesson(user.id, selectedLesson.id, 100);
      setSelectedLesson(null);
    }
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{module.title}</h1>
            <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${isApproved ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-primary/10 border-primary/20 text-primary'}`}>
              <Trophy size={14} />
              {completionPercentage}% {lang === 'pt' ? 'Concluído' : 'Completed'}
            </div>
          </div>
          <p className="text-slate-400 max-w-xl">
            {lang === 'pt' 
              ? `Você precisa de 70% de aproveitamento das aulas para ser aprovado no módulo. Atualmente você completou ${completedLessons} de ${totalLessons} aulas.`
              : `You need 70% completion of the lessons to pass the module. Currently you have completed ${completedLessons} of ${totalLessons} lessons.`}
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 ${completed ? 'bg-green-500/20 text-green-500' : (locked ? 'bg-white/5 text-white/20' : 'bg-primary/20 text-primary')}`}>
                      {completed ? <CheckCircle2 size={20} /> : (locked ? <Lock size={20} /> : index + 1)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors">{lesson.title}</h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                          <BookOpen size={10} /> {lang === 'pt' ? 'Teoria' : 'Theory'}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                          <PenTool size={10} /> {lang === 'pt' ? 'Exercícios' : 'Exercises'}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                          <HomeIcon size={10} /> {lang === 'pt' ? 'Homework' : 'Homework'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {!locked && (
                    <button 
                      onClick={() => {
                        if (lesson.canvaUrl) {
                          window.open(lesson.canvaUrl, '_blank');
                        }
                        setSelectedLesson(lesson);
                        setActiveTab('theory');
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 w-full md:w-auto"
                    >
                      <Play size={14} fill="currentColor" />
                      {lang === 'pt' ? 'Acessar Aula' : 'Access Lesson'}
                    </button>
                  )}
                </div>
                
                {completed && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{lang === 'pt' ? 'Evolução:' : 'Evolution:'}</span>
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

      {/* Lesson Content Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">Aula {selectedLesson.order}</span>
                <h2 className="text-xl font-bold text-white">{selectedLesson.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex border-b border-white/5 bg-white/[0.01]">
              <button 
                onClick={() => setActiveTab('theory')}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'theory' ? 'text-primary bg-primary/5 border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
              >
                <BookOpen size={14} />
                {lang === 'pt' ? 'Explicação' : 'Theory'}
              </button>
              <button 
                onClick={() => setActiveTab('exercises')}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'exercises' ? 'text-primary bg-primary/5 border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
              >
                <PenTool size={14} />
                {lang === 'pt' ? 'Exercícios' : 'Exercises'}
              </button>
              <button 
                onClick={() => setActiveTab('homework')}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'homework' ? 'text-primary bg-primary/5 border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
              >
                <HomeIcon size={14} />
                Homework
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 text-slate-300 leading-relaxed">
              {activeTab === 'theory' && (
                <div className="space-y-6 animate-in slide-in-from-left duration-500">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">{lang === 'pt' ? 'Conteúdo Teórico' : 'Theoretical Content'}</h4>
                      {selectedLesson.canvaUrl ? (
                        <div className="space-y-4">
                          <p className="whitespace-pre-line mb-4">{selectedLesson.theory}</p>
                          <a 
                            href={selectedLesson.canvaUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C4CC] text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                          >
                            <Play size={14} fill="currentColor" />
                            {lang === 'pt' ? 'Abrir Apresentação Canva' : 'Open Canva Presentation'}
                          </a>
                        </div>
                      ) : (
                        <p className="whitespace-pre-line">{selectedLesson.theory}</p>
                      )}
                    </div>
                </div>
              )}
              {activeTab === 'exercises' && (
                <div className="space-y-6 animate-in slide-in-from-left duration-500">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">{lang === 'pt' ? 'Prática' : 'Practice'}</h4>
                    <p className="whitespace-pre-line">{selectedLesson.exercises}</p>
                  </div>
                </div>
              )}
              {activeTab === 'homework' && (
                <div className="space-y-6 animate-in slide-in-from-left duration-500">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">{lang === 'pt' ? 'Tarefa de Casa' : 'Homework'}</h4>
                    <p className="whitespace-pre-line">{selectedLesson.homework}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex justify-end">
              <button 
                onClick={handleCompleteLesson}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-500 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-green-500/20"
              >
                <Check size={16} />
                {lang === 'pt' ? 'Finalizar Aula' : 'Complete Lesson'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
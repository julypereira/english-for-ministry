import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useSchoolStore } from "@/lib/school-store";
import { useUsersStore } from "@/lib/users-store";
import { useLanguageStore } from "@/lib/language-store";
import { handleError } from "@/lib/error-handler";
import { 
  ChevronLeft, 
  Lock, 
  Play, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  X,
  Search,
  LayoutGrid,
  Menu,
  ChevronRight,
  AlertCircle
} from "lucide-react";

export const Route = createFileRoute("/modulo/$moduleId")({
  component: ModuloComponent,
});

function ModuloComponent() {
  const { moduleId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { lang } = useLanguageStore();
  const { modules, lessons, progress, classes } = useSchoolStore();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mId = parseInt(moduleId);
  const module = modules.find((m) => m.id === mId);
  const allLessons = lessons.sort((a, b) => {
    if (a.moduleId !== b.moduleId) return a.moduleId - b.moduleId;
    return a.order - b.order;
  });

  const isAdmin = user?.profile === "Administrador";
  
  useEffect(() => {
    const studentUser = useUsersStore.getState().users.find(u => u.profile === "Aluno") || useUsersStore.getState().users[0];
    if (!user && studentUser) {
      useAuthStore.getState().login(studentUser);
    }
  }, [user]);

  useEffect(() => {
    if (!selectedLessonId && allLessons.length > 0) {
      const moduleLessons = allLessons.filter(l => l.moduleId === mId);
      if (moduleLessons.length > 0) {
        setSelectedLessonId(moduleLessons[0].id);
      } else {
        setSelectedLessonId(allLessons[0].id);
      }
    }
  }, [allLessons, mId]);

  if (!user || !module) return null;

  const selectedLesson = allLessons.find(l => l.id === selectedLessonId);

  const getLessonProgress = (lessonId: string) => {
    const p = progress.find((p) => p.studentId === user.id && p.lessonId === lessonId);
    return p ? { completed: p.completed, score: p.score } : { completed: false, score: 0 };
  };

  const isLessonLocked = (lesson: any) => {
    if (isAdmin) return false;
    return lesson.status === "locked";
  };

  const getCanvaEmbedUrl = (input: string) => {
    if (!input) return null;
    const value = input.trim();
    if (value.startsWith('<')) {
      const match = value.match(/src=["']([^"']+)["']/i);
      return match ? match[1] : null;
    }
    const url = value;
    if (url.includes('canva.com') && url.includes('view?embed')) return url;
    if (url.includes('canva.link')) return url;
    if (url.includes('canva.com/design/')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}view?embed`;
    }
    return url;
  };

  return (
    <div className="flex h-screen bg-[#050505] text-slate-100 overflow-hidden">
      {/* Sidebar - Todas as Aulas */}
      <aside 
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 border-r border-white/5 bg-[#080808] flex flex-col overflow-hidden relative group`}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-primary">Conteúdo do Curso</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{allLessons.length} Aulas Disponíveis</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {modules.map(mod => {
            const modLessons = allLessons.filter(l => l.moduleId === mod.id);
            if (modLessons.length === 0) return null;
            
            const modTitle = lang === 'en' ? (
              mod.id === 1 ? "BEGINNER" :
              mod.id === 2 ? "BASIC" :
              mod.id === 3 ? "INTERMEDIATE" :
              mod.id === 4 ? "ADVANCED" :
              mod.id === 5 ? "FLUENT" : mod.title
            ) : mod.title;

            return (
              <div key={mod.id} className="mb-4">
                <div className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 flex items-center gap-2 text-left">
                  <LayoutGrid size={10} />
                  {modTitle}
                </div>
                {modLessons.map((lesson) => {
                  const locked = isLessonLocked(lesson);
                  const { completed } = getLessonProgress(lesson.id);
                  const active = selectedLessonId === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      disabled={locked}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 group/item ${
                        active 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'hover:bg-white/5 text-slate-400 border border-transparent'
                      } ${locked ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        active ? 'bg-primary text-white' : (completed ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-slate-600')
                      }`}>
                        {completed ? <CheckCircle2 size={16} /> : (locked ? <Lock size={16} /> : <Play size={16} className={active ? 'fill-current' : ''} />)}
                      </div>
                      <span className={`text-xs font-bold truncate transition-colors ${active ? 'text-white' : 'group-hover/item:text-slate-200'}`}>
                        {lesson.title}
                      </span>
                      {active && <ChevronRight size={14} className="ml-auto" />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-lg flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <Menu size={20} />
              </button>
            )}
            <Link to="/aulas" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ChevronLeft size={20} />
              <span className="font-black text-[10px] uppercase tracking-widest hidden sm:inline">Voltar ao Painel</span>
            </Link>
          </div>

          <div className="flex-1 px-8 hidden md:block">
            <h1 className="text-sm font-black uppercase tracking-widest text-white truncate text-center">
              {selectedLesson?.title || 'Selecione uma aula'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
              title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </header>

        {/* Iframe Container */}
        <div className={`flex-1 relative ${isFullscreen ? 'absolute inset-0 z-50 bg-black' : ''}`}>
          {selectedLesson ? (
            <div className="w-full h-full flex flex-col p-4 md:p-8">
              <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
                {selectedLesson.canvaUrl ? (
                  <iframe 
                    key={selectedLesson.id}
                    src={getCanvaEmbedUrl(selectedLesson.canvaUrl) || ''}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-slate-500">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                      <LayoutGrid size={40} className="opacity-20" />
                    </div>
                    <p className="font-black uppercase tracking-[0.3em] text-[10px]">Nenhum material cadastrado para esta aula</p>
                  </div>
                )}
                
                {/* Fullscreen Close Button */}
                {isFullscreen && (
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-6 right-6 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-red-500 transition-all z-[60]"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>
              
              {/* Bottom Controls / Status */}
              <div className="mt-6 flex items-center justify-between px-4">
                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Professor</span>
                     <span className="text-xs font-bold text-slate-300">Equipe Amigo Intimo</span>
                   </div>
                </div>
                
                <button 
                   className={`px-8 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${
                     getLessonProgress(selectedLesson.id).completed 
                       ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' 
                       : 'bg-primary hover:scale-105 shadow-primary/20'
                   }`}
                   onClick={() => {
                     try {
                       const { completeLesson } = useSchoolStore.getState();
                       completeLesson(user.id, selectedLesson.id, 100);
                     } catch (err) {
                       handleError(err, { component: "ModuloComponent", action: "completeLesson" });
                       setError(lang === 'pt' ? "Erro ao concluir aula." : "Error completing lesson.");
                     }
                   }}
                >
                  {getLessonProgress(selectedLesson.id).completed ? (lang === 'pt' ? 'Aula Concluída' : 'Lesson Completed') : (lang === 'pt' ? 'Concluir Aula' : 'Complete Lesson')}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
               <div className="animate-pulse flex flex-col items-center gap-4">
                 <div className="w-12 h-12 bg-primary/20 rounded-full" />
                 <div className="h-2 w-32 bg-white/5 rounded" />
               </div>
            </div>
          )}
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

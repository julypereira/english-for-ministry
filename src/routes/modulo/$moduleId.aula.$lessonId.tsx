import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useSchoolStore } from "@/lib/school-store";
import { useUsersStore } from "@/lib/users-store";
import { useLanguageStore } from "@/lib/language-store";
import { 
  ChevronLeft, 
  BookOpen, 
  PenTool, 
  Home as HomeIcon, 
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Maximize2,
  Minimize2,
  X
} from "lucide-react";
import ReactMarkdown from 'react-markdown';

export const Route = createFileRoute("/modulo/$moduleId/aula/$lessonId")({
  component: LessonComponent,
});

function LessonComponent() {
  const { moduleId, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { lessons, updateLessonProgress, progress } = useSchoolStore();
  const { lang } = useLanguageStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const lessonProgress = progress.find(p => p.studentId === user?.id && p.lessonId === lessonId);
  const currentProgress = lessonProgress?.score || 0;

  const lesson = lessons.find(l => l.id === lessonId);

  useEffect(() => {
    const studentUser = useUsersStore.getState().users.find(u => u.profile === "Aluno") || useUsersStore.getState().users[0];
    if (!user && studentUser) {
      useAuthStore.getState().login(studentUser);
    }
  }, [user]);

  if (!user || !lesson) return null;

  const handleComplete = () => {
    updateLessonProgress(user.id, lesson.id, 100, 100);
    navigate({ to: "/modulo/$moduleId", params: { moduleId: moduleId.toString() } });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Simulação de detecção de progresso do Canva
  // Como o Canva iframe não envia mensagens de progresso facilmente sem API oficial
  // Vamos simular o progresso baseado no tempo de visualização ou interação para este exemplo
  // Em uma implementação real com Canva SDK seria diferente.
  useEffect(() => {
    if (iframeLoaded && user && lesson) {
      const timer = setInterval(() => {
        if (currentProgress < 100) {
          const nextProgress = Math.min(currentProgress + 10, 100);
          updateLessonProgress(user.id, lesson.id, nextProgress, 100);
        }
      }, 10000); // Aumenta 10% a cada 10 segundos para simular leitura
      return () => clearInterval(timer);
    }
  }, [iframeLoaded, currentProgress, user, lesson]);

  const getCanvaEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // Se for um link curto do canva.link, convertemos para o formato de embed
    if (url.includes('canva.link/')) {
      const code = url.split('canva.link/')[1]?.split('?')[0];
      if (code) {
        return `https://www.canva.com/design/${code}/view?embed`;
      }
    }
    
    // Se já for um link de embed do Canva, retorna
    if (url.includes('canva.com') && url.includes('view?embed')) return url;
    
    // Tenta converter link de compartilhamento padrão para link de embed
    if (url.includes('canva.com/design/')) {
      const parts = url.split('/design/')[1]?.split('/');
      const designId = parts ? parts[0] : null;
      if (designId) {
        return `https://www.canva.com/design/${designId}/view?embed`;
      }
    }
    
    return url;
  };

  const canvaEmbedUrl = getCanvaEmbedUrl(lesson.canvaUrl || "");

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-lg px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to="/modulo/$moduleId" 
            params={{ moduleId: moduleId.toString() }}
            className="flex items-center gap-2 group text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="font-black text-[10px] uppercase tracking-widest">Voltar ao Módulo</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold hidden md:block">{lesson.title}</h2>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto py-8 px-6 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {canvaEmbedUrl && (
              <div 
                ref={containerRef}
                className={`${
                  isFullscreen 
                  ? 'fixed inset-0 z-[100] bg-black p-4 flex flex-col' 
                  : 'aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl relative'
                }`}
              >
                <div className="absolute top-4 right-4 z-[110] flex gap-2">
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-primary transition-all"
                    title={isFullscreen ? "Minimizar" : "Maximizar"}
                  >
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                  {isFullscreen && (
                    <button 
                      onClick={() => setIsFullscreen(false)}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-red-500 transition-all"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <iframe 
                  loading="lazy"
                  width="100%" 
                  height="100%" 
                  src={canvaEmbedUrl}
                  title="Canva Presentation" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  onLoad={() => setIframeLoaded(true)}
                  className={`${isFullscreen ? 'flex-1 rounded-2xl' : ''}`}
                ></iframe>
                
                {/* Barra de Progresso Customizada */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
              </div>
            )}

            {!canvaEmbedUrl && lesson.canvaUrl && (
               <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-black flex items-center justify-center text-slate-500 flex-col gap-4">
                 <AlertCircle size={48} />
                 <p>O link do material não é um link válido do Canva.</p>
                 <a href={lesson.canvaUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Abrir link original</a>
               </div>
            )}

            {lesson.theory && (
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                <div className="p-8 md:p-12 prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {lesson.theory}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Status da Aula</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                    <PlayCircle size={18} />
                  </div>
                  <span className="text-xs font-bold">{lang === 'pt' ? 'Vídeo Assistido' : 'Video Watched'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500">
                    <CheckCircle size={18} />
                  </div>
                  <span className="text-xs font-bold">{lang === 'pt' ? 'Atividade Pendente' : 'Activity Pending'}</span>
                </div>
              </div>

              <button 
                onClick={handleComplete}
                className="w-full mt-8 py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
              >
                {lang === 'pt' ? 'Concluir Aula' : 'Complete Lesson'}
              </button>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-6">
              <div className="flex gap-3 text-orange-500 mb-4">
                <AlertCircle size={20} className="shrink-0" />
                <h4 className="text-xs font-black uppercase tracking-widest">Dica Ministerial</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "A excelência na comunicação reflete nosso compromisso com o Reino. Pratique o alfabeto diariamente para ganhar confiança."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
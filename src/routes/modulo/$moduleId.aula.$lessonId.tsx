import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useSchoolStore } from "@/lib/school-store";
import { useLanguageStore } from "@/lib/language-store";
import { 
  ChevronLeft, 
  BookOpen, 
  PenTool, 
  Home as HomeIcon, 
  PlayCircle,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import ReactMarkdown from 'react-markdown';

export const Route = createFileRoute("/modulo/$moduleId/aula/$lessonId")({
  component: LessonComponent,
});

function LessonComponent() {
  const { moduleId, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { lessons, completeLesson } = useSchoolStore();
  const { lang } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<'theory' | 'exercises' | 'homework'>('theory');

  const lesson = lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  if (!user || !lesson) return null;

  const handleComplete = () => {
    completeLesson(user.id, lesson.id, 100);
    navigate({ to: "/modulo/$moduleId", params: { moduleId } });
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-lg px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to="/modulo/$moduleId" 
            params={{ moduleId }}
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
            {lesson.canvaUrl && getYoutubeId(lesson.canvaUrl) && (
              <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${getYoutubeId(lesson.canvaUrl)}`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
              <div className="flex border-b border-white/5 bg-white/[0.01]">
                <button 
                  onClick={() => setActiveTab('theory')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'theory' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
                >
                  <BookOpen size={14} />
                  {lang === 'pt' ? 'Teoria' : 'Theory'}
                </button>
                <button 
                  onClick={() => setActiveTab('exercises')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'exercises' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
                >
                  <PenTool size={14} />
                  {lang === 'pt' ? 'Exercícios' : 'Exercises'}
                </button>
                <button 
                  onClick={() => setActiveTab('homework')}
                  className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'homework' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
                >
                  <HomeIcon size={14} />
                  {lang === 'pt' ? 'Homework' : 'Homework'}
                </button>
              </div>

              <div className="p-8 md:p-12 prose prose-invert max-w-none">
                <ReactMarkdown>
                  {activeTab === 'theory' ? lesson.theory : activeTab === 'exercises' ? lesson.exercises : lesson.homework}
                </ReactMarkdown>
              </div>
            </div>
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
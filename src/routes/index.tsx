import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from 'embla-carousel-react';
import { BookOpen, Globe, Users, GraduationCap, Star, Languages, MessageCircle, ArrowRight, ShieldCheck, Zap, Signpost } from 'lucide-react';
import { useCallback, useEffect, useState, useRef } from 'react';

type Language = 'pt' | 'en';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "English for Ministry | Amigo Intimo Church" },
      { name: "description", content: "A plataforma oficial de idiomas da Amigo Intimo Church para missões e ministérios." },
    ],
  }),
  component: Index,
});

const translations = {
  pt: {
    nav: {
      join: "Login",
    },
    hero: {
      tag: "Capacitando Líderes do Reino",
      title1: "DOMINE O",
      title2: "INGLÊS MINISTERIAL",
      desc: "A plataforma de treinamento de idiomas definitiva para a comunidade missionária da ",
      descHighlight: "Amigo Intimo Church",
      testimonial: "E disse-lhes: 'Vão pelo mundo todo e preguem o evangelho a todas as pessoas.'",
      testimonialAuthor: "Marcos 16:15",
    },
    levels: [
      { name: "Iniciante", lessons: "14 aulas" },
      { name: "Básico", lessons: "18 aulas" },
      { name: "Intermediário", lessons: "25 aulas" },
      { name: "Avançado", lessons: "27 aulas" },
      { name: "Fluente", lessons: "Final" }
    ]
  },
  en: {
    nav: {
      join: "Student Area",
    },
    hero: {
      tag: "Empowering Kingdom Leaders",
      title1: "MASTER",
      title2: "MINISTERIAL ENGLISH",
      desc: "The ultimate language training platform for the missionary community of ",
      descHighlight: "Amigo Intimo Church",
      testimonial: "And he said unto them, 'Go ye into all the world, and preach the gospel to every creature.'",
      testimonialAuthor: "Mark 16:15",
    },
    levels: [
      { name: "Beginner", lessons: "14 lessons" },
      { name: "Basic", lessons: "18 lessons" },
      { name: "Intermediate", lessons: "25 lessons" },
      { name: "Advanced", lessons: "27 lessons" },
      { name: "Fluent", lessons: "Final" }
    ]
  }
};

function Index() {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] font-sans text-slate-100 selection:bg-primary/30 relative overflow-x-hidden flex flex-col">
      {/* 3D Animated Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: `perspective(1000px) rotateX(60deg) translateY(${mousePos.y * 2}px) translateZ(0)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"
          style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)`, animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <nav className="px-6 py-8">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="text-white font-black text-3xl italic select-none z-10 -ml-0.5">A</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-400 opacity-50"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl leading-none uppercase tracking-tighter text-white">Amigo Intimo</span>
                <span className="text-primary text-[9px] tracking-[0.3em] font-black uppercase opacity-80">English for Ministry</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="relative overflow-hidden group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
              >
                <Languages size={14} className="text-primary" />
                <span>{lang === 'pt' ? 'EN-US' : 'PT-BR'}</span>
              </button>
            </div>
          </div>
        </nav>

        <section className="flex-1 flex items-center py-12 md:py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{t.hero.tag}</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-left-10 duration-1000 pb-2">
                  {t.hero.title1} <br />
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 py-2 pr-4">
                    {t.hero.title2}
                  </span>
                </h1>

                <p className="text-lg text-slate-400 max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-12 duration-1000">
                  {t.hero.desc} <span className="text-white font-bold">{t.hero.descHighlight}</span>
                </p>

                <div className="animate-in fade-in slide-in-from-left-14 duration-1000">
                  <Link 
                    to="/login" 
                    className="group relative inline-flex items-center gap-3 bg-primary hover:bg-orange-500 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]"
                  >
                    <span>{t.nav.join}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>


                <div className="flex flex-wrap lg:flex-nowrap gap-3 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
                  {t.levels.map((level, i) => (
                    <div key={i} className="group/card relative flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover/card:bg-primary group-hover/card:border-primary transition-colors">
                        <span className="text-[10px] font-black text-primary group-hover/card:text-white">{i + 1}</span>
                      </div>
                      <div className="text-[10px] font-black text-white uppercase tracking-wider mb-1 line-clamp-1">{level.name}</div>
                      <div className="text-[8px] font-bold text-primary tracking-[0.1em] uppercase opacity-80">{level.lessons}</div>
                      
                      {i < t.levels.length - 1 && (
                        <div className="hidden lg:block absolute top-8 -right-4 w-8 h-[1px] bg-gradient-to-r from-primary/50 to-transparent z-0"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden lg:block [perspective:2000px] animate-in fade-in zoom-in duration-1000">
                <div 
                  className="relative z-10 w-full aspect-[4/5] max-w-md mx-auto"
                  style={{ 
                    transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  {/* Glass Card 1 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl p-8 flex flex-col justify-end overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200" 
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-[3s]"
                      alt=""
                    />
                    <div className="relative z-10 space-y-4">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-primary text-primary" />)}
                      </div>
                      <p className="text-2xl font-bold italic leading-tight">"{t.hero.testimonial}"</p>
                      <div className="flex items-center gap-3 pt-4">
                        <span className="w-10 h-[1px] bg-primary"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{t.hero.testimonialAuthor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div 
                    className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center p-6 shadow-2xl animate-bounce"
                    style={{ animationDuration: '4s', transform: 'translateZ(50px)' }}
                  >
                    <div className="text-center">
                      <Signpost className="text-primary mx-auto mb-2" size={24} />
                      <div className="text-[8px] font-black uppercase tracking-widest leading-tight">MARCOS 16:15</div>
                    </div>
                  </div>

                  <div 
                    className="absolute -bottom-6 -left-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-float"
                    style={{ transform: 'translateZ(80px)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <ShieldCheck className="text-green-500" size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest">CERTIFICADO</div>
                        <div className="text-[8px] text-slate-400">DE CONCLUSÃO A CADA MÓDULO</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Shadow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <div className="relative mt-auto p-8 flex flex-col sm:flex-row items-center gap-6 animate-in fade-in duration-1000">
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            © 2026 ENGLISH FOR MINISTRY
          </div>
          <div className="hidden sm:block h-[1px] w-12 bg-white/10"></div>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/amigointimochurch_cg/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              INSTAGRAM
            </a>
            <a href="https://api.whatsapp.com/send?phone=5567984047848" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-colors">
              <MessageCircle size={14} />
              WHATSAPP
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateZ(80px) translateY(0); }
          50% { transform: translateZ(80px) translateY(-10px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

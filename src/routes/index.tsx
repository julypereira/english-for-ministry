import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, BookOpen, Globe, Users, GraduationCap, MapPin, Search, ArrowRight, Play, CheckCircle, Headphones, Star, Languages, MessageCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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
    topBanner: "APRENDER PARA SERVIR. SERVIR PARA TRANSFORMAR",
    topBannerCTA: "",
    nav: {
      methodology: "Metodologia",
      courses: "Cursos",
      missions: "Missões",
      join: "Área do Aluno",
    },
    hero: {
      tag: "Capacitando Líderes do Reino",
      title1: "FALE INGLÊS",
      title2: "ESPALHE A PALAVRA.",
      desc: "A plataforma definitiva de treinamento de idiomas para a comunidade missionária da ",
      descHighlight: "Amigo Intimo Church",
      cta: "Começar",
      secondaryCta: "Nossa Missão",
      testimonial: "E disse-lhes: 'Vão pelo mundo todo e preguem o evangelho a todas as pessoas.'",
      testimonialAuthor: "Marcos 16:15",
    },
    carousel: [
      {
        title: "A Palavra em Cada Língua",
        desc: "Prepare seu coração e sua voz para pregar o evangelho em inglês."
      },
      {
        title: "Mandato Missionário Global",
        desc: "O mundo é o nosso campo. A comunicação é a nossa ponte."
      },
      {
        title: "Comunidade de Aprendizado Cristão",
        desc: "Aprenda em um ambiente de fé, focado na grande comissão."
      }
    ],
    globalCommunity: {
      title: "Uma Comunidade Global",
      cta: "Explorar Metodologia"
    },
    methodology: {
      title1: "Não apenas Inglês.",
      title2: "Fluência Ministerial.",
      desc: "Desenvolvemos um currículo exclusivo que combina linguística inglesa com prática ministerial cristã. Vá além da conversação básica.",
      features: ["Pregação em Inglês", "Aconselhamento Pastoral", "Vocabulário do Reino", "Missões Transculturais"],
      cta: "Comece seu treinamento",
      cardTitle: "A Estrutura Bíblica",
      cards: [
        { title: "Foco Teológico", desc: "Vocabulário específico para sermões, cuidado pastoral e liderança de igreja." },
        { title: "Método de Imersão", desc: "Ouça orações e ensinamentos de líderes cristãos globais." },
        { title: "Alcance Internacional", desc: "Prepare-se para viagens missionárias com contexto cultural relevante." }
      ]
    },
    footer: {
      desc: "Treinando líderes globais para levar a mensagem de esperança a cada tribo, língua e nação.",
      navTitle: "Navegação",
      baseTitle: "Endereço",
      copyright: "Todos os direitos reservados. Construído para a Eternidade.",
      privacy: "Privacidade",
      terms: "Termos"
    }
  },
  en: {
    topBanner: "LEARN TO SERVE. SERVE TO TRANSFORM",
    topBannerCTA: "",
    nav: {
      methodology: "Methodology",
      courses: "Courses",
      missions: "Missions",
      join: "Student Area",
    },
    hero: {
      tag: "Empowering Kingdom Leaders",
      title1: "SPEAK ENGLISH",
      title2: "SPREAD THE WORD.",
      desc: "The ultimate language training platform for the missionary community of ",
      descHighlight: "Amigo Intimo Church",
      cta: "Get Started",
      secondaryCta: "Our Mission",
      testimonial: "And he said unto them, 'Go ye into all the world, and preach the gospel to every creature.'",
      testimonialAuthor: "Mark 16:15",
    },
    carousel: [
      {
        title: "The Word in Every Language",
        desc: "Prepare your heart and voice to preach the gospel in English."
      },
      {
        title: "Global Mission Mandate",
        desc: "The world is our field. Communication is our bridge."
      },
      {
        title: "Christian Community Learning",
        desc: "Learn in an environment of faith, focused on the great commission."
      }
    ],
    globalCommunity: {
      title: "A Global Community",
      cta: "Explore Methodology"
    },
    methodology: {
      title1: "Not just English.",
      title2: "Ministerial Fluency.",
      desc: "We developed a unique curriculum blending English linguistics with Christian ministry practice. Go beyond basic conversation.",
      features: ["Preaching in English", "Pastoral Counseling", "Kingdom Vocabulary", "Cross-cultural Missions"],
      cta: "Start your training",
      cardTitle: "The Biblical Framework",
      cards: [
        { title: "Theology-focused", desc: "Vocabulary specific for sermons, pastoral care, and church leadership." },
        { title: "Immersion method", desc: "Listen to prayers and teachings from global Christian leaders." },
        { title: "International Reach", desc: "Prepare for mission trips with culturally relevant context." }
      ]
    },
    footer: {
      desc: "Training global leaders to carry the message of hope to every tribe, tongue, and nation.",
      navTitle: "Navigation",
      baseTitle: "Address",
      copyright: "All rights reserved. Built for Eternity.",
      privacy: "Privacy",
      terms: "Terms"
    }
  }
};

function Index() {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const carouselImages = [
    "https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=1600",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600",
  ];

  const toggleLang = () => {
    setLang(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <div className="h-screen bg-black font-sans text-slate-100 selection:bg-primary/30 relative overflow-hidden flex flex-col">
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1519491050282-ce00c729c8bf?q=80&w=2000')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: 0.2
        }}
      />
      
      {/* Dynamic background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <nav className="bg-black/40 backdrop-blur-md border-b border-white/5 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm transition-all">
              <span className="font-black text-2xl leading-none uppercase tracking-tighter text-white group-hover:text-primary transition-colors">Amigo Intimo</span>
              <span className="text-primary text-[10px] tracking-[0.4em] font-black uppercase opacity-80">English for Ministry</span>
            </Link>

            <div className="flex items-center gap-3 md:gap-6">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
              >
                <Languages size={14} className="text-primary" />
                <span className="hidden sm:inline font-bold">{lang === 'pt' ? 'EN-US' : 'PT-BR'}</span>
              </button>
              
              <Link 
                to="/login" 
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border border-primary/20 transition-all active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t.nav.join}
              >
                <Users size={14} className="text-primary group-hover:text-white group-hover:scale-110 transition-transform" />
                <span className="font-bold">{t.nav.join}</span>
              </Link>
            </div>
          </div>
        </nav>

        <section className="flex-1 relative flex items-center overflow-hidden">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="relative z-10 text-center lg:text-left lg:w-3/5">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20 mb-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Star size={12} className="fill-primary" aria-hidden="true" />
                  {t.hero.tag}
                </div>
                <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  {t.hero.title1} <br />
                  <span className="text-primary italic relative inline-block">
                    {t.hero.title2}
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full blur-sm"></span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  {t.hero.desc} <span className="text-white font-bold decoration-primary/30 decoration-2 underline-offset-4">{t.hero.descHighlight}</span>
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  <Link 
                    to="/login" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-[13px] font-black uppercase tracking-[0.2em] px-12 py-5 rounded-xl shadow-[0_20px_50px_rgba(234,88,12,0.3)] hover:shadow-[0_20px_50px_rgba(234,88,12,0.5)] hover:-translate-y-1 active:scale-95 transition-all text-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                  >
                    {t.nav.join}
                  </Link>
                  <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center overflow-hidden ring-2 ring-white/5 group-hover:ring-primary/30 transition-all">
                          <img 
                            src={`https://i.pravatar.cc/100?img=${i+10}`} 
                            alt={`Avatar do aluno ${i}`} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black uppercase tracking-widest text-white">+500 ALUNOS</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Engajados no Reino</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative lg:w-2/5 w-full max-w-lg mx-auto hidden md:block animate-in fade-in zoom-in duration-1000">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group">
                  <img 
                    src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200" 
                    alt="Pessoas em serviço missionário" 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white p-6 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:-translate-y-2">
                    <div className="flex gap-1.5 mb-4" aria-label="Avaliação 5 estrelas">
                       {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-primary text-primary" aria-hidden="true" />)}
                    </div>
                    <p className="text-base font-bold italic leading-relaxed mb-4 text-white/95">"{t.hero.testimonial}"</p>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-[2px] bg-primary"></span>
                      <p className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-black">
                        {t.hero.testimonialAuthor}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Visual enhancements */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              </div>
            </div>
          </div>
          
          {/* Social Links at Bottom Right */}
          <div className="absolute bottom-10 right-10 z-50 flex items-center gap-8">
            <a 
              href="https://www.instagram.com/amigointimochurch_cg/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-3 text-white/40 hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2"
              title="Siga-nos no Instagram"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] hidden md:inline">Instagram</span>
            </a>
            <a 
              href="https://web.whatsapp.com/send/?phone=5567984047848" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-3 text-white/40 hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-2"
              title="Fale conosco pelo WhatsApp"
            >
              <div className="relative">
                <MessageCircle size={22} className="group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                <span className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] hidden md:inline">WhatsApp</span>
            </a>
          </div>

          {/* Copyright watermark */}
          <div className="absolute bottom-10 left-10 text-[9px] font-black uppercase tracking-[0.3em] text-white/10 select-none hidden sm:block">
            © {new Date().getFullYear()} English for Ministry
          </div>
        </section>
      </div>
    </div>
  );
}

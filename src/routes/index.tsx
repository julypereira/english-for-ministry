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
        className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519491050282-ce00c729c8bf?q=80&w=2000')` }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <nav className="bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex flex-col group">
              <span className="font-black text-2xl leading-none uppercase tracking-tighter text-white group-hover:text-primary transition-colors">Amigo Intimo</span>
              <span className="text-primary text-[10px] tracking-[0.4em] font-black uppercase opacity-80">English for Ministry</span>
            </Link>

            <div className="flex items-center gap-3 md:gap-6">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 active:scale-95"
                aria-label="Toggle Language"
              >
                <Languages size={14} className="text-primary" />
                <span className="hidden sm:inline">{lang === 'pt' ? 'EN-US' : 'PT-BR'}</span>
              </button>
              
              <Link to="/login" className="flex items-center gap-2 bg-white/5 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/10 transition-all active:scale-95 group">
                <Users size={14} className="text-primary group-hover:text-white group-hover:scale-110 transition-transform" />
                {t.nav.join}
              </Link>
            </div>
          </div>
        </nav>

        <section className="flex-1 relative flex items-center overflow-hidden">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="relative z-10 text-center lg:text-left lg:w-3/5">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20 mb-8 backdrop-blur-md">
                  <Star size={12} className="fill-primary" />
                  {t.hero.tag}
                </div>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
                  {t.hero.title1} <br />
                  <span className="text-primary italic relative inline-block">
                    {t.hero.title2}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  {t.hero.desc} <span className="text-white font-bold">{t.hero.descHighlight}</span>
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link to="/login" className="w-full sm:w-auto bg-primary text-white text-[13px] font-black uppercase tracking-[0.2em] px-12 py-5 rounded-xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all text-center">
                    {t.nav.join}
                  </Link>
                  <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">+500 ALUNOS</span>
                  </div>
                </div>
              </div>

              <div className="relative lg:w-2/5 w-full max-w-lg mx-auto hidden md:block">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                  <img 
                    src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200" 
                    alt="Christian Mission Service" 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white p-5 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10">
                    <div className="flex gap-1 mb-3">
                       {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-primary text-primary" />)}
                    </div>
                    <p className="text-sm font-bold italic leading-relaxed mb-3 text-white/90">"{t.hero.testimonial}"</p>
                    <p className="text-[9px] opacity-60 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                      <span className="w-6 h-px bg-primary"></span>
                      {t.hero.testimonialAuthor}
                    </p>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px]"></div>
              </div>
            </div>
          </div>
          
          {/* Social Links at Bottom Right */}
          <div className="absolute bottom-8 right-8 z-50 flex items-center gap-6">
            <a 
              href="https://www.instagram.com/amigointimochurch_cg/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 text-white/50 hover:text-primary transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Instagram</span>
            </a>
            <a 
              href="https://web.whatsapp.com/send/?phone=5567984047848" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 text-white/50 hover:text-primary transition-all"
            >
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

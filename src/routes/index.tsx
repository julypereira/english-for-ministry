import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, BookOpen, Globe, Users, GraduationCap, MapPin, Search, ArrowRight, Play, CheckCircle, Headphones, Star, Languages } from 'lucide-react';
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
    topBanner: "Expanda seu ministério. Alcance as nações.",
    topBannerCTA: "",
    nav: {
      methodology: "Metodologia",
      courses: "Cursos",
      missions: "Missões",
      testimonials: "Depoimentos",
      login: "Entrar",
      join: "Participar Agora",
    },
    hero: {
      tag: "Capacitando Líderes do Reino",
      title1: "FALE INGLÊS",
      title2: "ESPALHE A PALAVRA.",
      desc: "A plataforma definitiva de treinamento de idiomas para a comunidade missionária da ",
      descHighlight: "Amigo Intimo Church",
      cta: "Começar",
      secondaryCta: "Nossa Missão",
      testimonial: "Agora posso pregar com confiança.",
      testimonialAuthor: "Pastor John, Depto. de Missões",
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
      baseTitle: "Base",
      copyright: "Todos os direitos reservados. Construído para a Eternidade.",
      privacy: "Privacidade",
      terms: "Termos"
    }
  },
  en: {
    topBanner: "Expand your ministry. Reach the nations.",
    topBannerCTA: "",
    nav: {
      methodology: "Methodology",
      courses: "Courses",
      missions: "Missions",
      testimonials: "Testimonials",
      login: "Login",
      join: "Join Now",
    },
    hero: {
      tag: "Empowering Kingdom Leaders",
      title1: "SPEAK ENGLISH",
      title2: "SPREAD THE WORD.",
      desc: "The ultimate language training platform for the missionary community of ",
      descHighlight: "Amigo Intimo Church",
      cta: "Get Started",
      secondaryCta: "Our Mission",
      testimonial: "Now I can preach with confidence.",
      testimonialAuthor: "Pastor John, Missions Dept.",
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
      baseTitle: "Base",
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
    "https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=1200", // Bíblia aberta
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200", // Mapa mundi
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200", // Grupo estudando
  ];

  const toggleLang = () => {
    setLang(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <div className="min-h-screen bg-black font-sans text-slate-100 selection:bg-primary/30 relative">
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519491050282-ce00c729c8bf?q=80&w=2000')` }}
      />
      
      <div className="relative z-10">
        <div className="bg-primary/90 backdrop-blur-sm text-white py-2 text-center text-xs font-bold uppercase tracking-widest px-4">
          {t.topBanner}
        </div>

        <nav className="sticky top-0 z-[100] bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex flex-col group">
              <span className="font-black text-xl leading-none uppercase tracking-tighter text-white">Amigo Intimo</span>
              <span className="text-primary text-[10px] tracking-[0.3em] font-black uppercase">English for Ministry</span>
            </Link>

            <div className="hidden lg:flex items-center space-x-10 text-sm font-bold uppercase tracking-tight">
              <Link to="/" className="text-white hover:text-primary transition-colors">{t.nav.methodology}</Link>
              <Link to="/" className="text-slate-400 hover:text-primary transition-colors">{t.nav.courses}</Link>
              <Link to="/" className="text-slate-400 hover:text-primary transition-colors">{t.nav.missions}</Link>
              <Link to="/" className="text-slate-400 hover:text-primary transition-colors">{t.nav.testimonials}</Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Languages size={14} className="text-primary" />
                {lang === 'pt' ? 'EN-US' : 'PT-BR'}
              </button>
              <Link to="/login" className="text-sm font-bold uppercase tracking-tight text-white hover:text-primary px-4 py-2 transition-colors">
                {t.nav.login}
              </Link>
              <Link to="/login" className="bg-primary text-white text-sm font-black uppercase tracking-widest px-8 py-3.5 rounded-full shadow-[0_8px_20px_-6px_rgba(255,102,0,0.4)] hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                {t.nav.join}
              </Link>
            </div>
          </div>
        </nav>

        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20 mb-8 backdrop-blur-md">
                <Star size={14} className="fill-primary" />
                {t.hero.tag}
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
                {t.hero.title1} <br />
                <span className="text-primary italic">{t.hero.title2}</span>
              </h1>
              <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium">
                {t.hero.desc} <span className="text-white font-bold underline decoration-primary decoration-4 underline-offset-4">{t.hero.descHighlight}</span>
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/login" className="px-10 py-5 bg-white text-black text-lg font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all shadow-2xl">
                  {t.hero.cta}
                </Link>
                <button className="flex items-center gap-4 px-8 py-5 border-2 border-white/10 rounded-full hover:border-primary hover:bg-primary/5 transition-all group backdrop-blur-sm">
                  <div className="bg-primary text-white p-2 rounded-full group-hover:scale-110 transition-transform">
                    <Play size={20} fill="white" />
                  </div>
                  <span className="text-lg font-bold uppercase tracking-tight">{t.hero.secondaryCta}</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/5 group bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200" 
                  alt="Missionary Global Map" 
                  className="w-full aspect-square object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <div className="flex gap-1 mb-2">
                     {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FF6600" color="#FF6600" />)}
                  </div>
                  <p className="text-lg font-bold italic">"{t.hero.testimonial}"</p>
                  <p className="text-sm opacity-80 uppercase tracking-widest font-black mt-1">{t.hero.testimonialAuthor}</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100/10 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur-md py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">{t.globalCommunity.title}</h2>
              <div className="w-20 h-2 bg-primary mx-auto mb-6"></div>
            </div>

            <div className="relative group">
              <div className="overflow-hidden rounded-[32px] shadow-2xl" ref={emblaRef}>
                <div className="flex">
                  {t.carousel.map((item, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[500px] md:h-[700px]">
                      <img 
                        src={carouselImages[index]} 
                        alt={item.title}
                        className="w-full h-full object-cover grayscale-[20%] opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-8 text-center">
                        <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">{item.title}</h3>
                        <p className="text-xl text-white/90 max-w-2xl font-medium mb-10">{item.desc}</p>
                        <button className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
                          {t.globalCommunity.cta}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button onClick={scrollPrev} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white backdrop-blur-md p-5 rounded-full text-white hover:text-black transition-all group/btn border border-white/20">
                <ChevronLeft size={32} />
              </button>
              <button onClick={scrollNext} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white backdrop-blur-md p-5 rounded-full text-white hover:text-black transition-all group/btn border border-white/20">
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-black/80 backdrop-blur-xl rounded-[40px] p-12 text-white relative z-10 overflow-hidden border border-white/10">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')]"></div>
                 
                 <div className="relative z-10">
                   <h3 className="text-4xl font-black uppercase tracking-tighter mb-10">{t.methodology.cardTitle}</h3>
                   <div className="space-y-8">
                     {t.methodology.cards.map((item, i) => (
                       <div key={i} className="flex gap-6 items-start">
                         <div className="bg-primary/20 text-primary p-3 rounded-2xl">
                           {i === 0 ? <BookOpen /> : i === 1 ? <Headphones /> : <Globe />}
                         </div>
                         <div>
                           <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                           <p className="text-slate-400 font-medium">{item.desc}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                {t.methodology.title1} <br />
                <span className="text-primary italic">{t.methodology.title2}</span>
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">
                {t.methodology.desc}
              </p>
              <ul className="space-y-4 mb-12">
                {t.methodology.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-black uppercase tracking-tight text-white">
                    <CheckCircle className="text-primary" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/login" className="inline-flex items-center gap-4 text-white font-black uppercase tracking-widest text-lg group">
                {t.methodology.cta} <ArrowRight className="group-hover:translate-x-2 transition-transform text-primary" />
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-black/90 backdrop-blur-xl text-white pt-32 pb-16 relative overflow-hidden border-t border-white/10">
          <div className="absolute -bottom-20 -right-20 text-[20vw] font-black text-white/5 uppercase select-none pointer-events-none tracking-tighter">
            MINISTRY
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-2">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-primary p-2 rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100" 
                      alt="Logo"
                      className="w-10 h-10 object-contain" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-2xl leading-none uppercase tracking-tighter">Amigo Intimo</span>
                    <span className="text-primary text-xs tracking-[0.3em] font-black uppercase italic">Church</span>
                  </div>
                </div>
                <p className="text-slate-400 text-lg max-w-sm mb-10 font-medium">
                  {t.footer.desc}
                </p>
                <div className="flex gap-6">
                   <a href="https://www.instagram.com/amigointimochurch_cg/" className="text-white hover:text-primary transition-colors text-sm font-black uppercase tracking-widest">Instagram</a>
                   <a href="https://wa.link/wcgt0u" className="text-white hover:text-primary transition-colors text-sm font-black uppercase tracking-widest">WhatsApp</a>
                </div>
              </div>

              <div>
                <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">{t.footer.navTitle}</h4>
                <ul className="space-y-4 text-slate-400 font-bold uppercase tracking-tight text-sm">
                  <li><Link to="/" className="hover:text-white transition-colors">{t.nav.methodology}</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">{t.nav.courses}</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">{t.nav.testimonials}</Link></li>
                  <li><Link to="/login" className="hover:text-white transition-colors">{t.nav.login}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">{t.footer.baseTitle}</h4>
                <div className="flex gap-4 text-slate-400 items-start">
                  <MapPin className="shrink-0 text-primary" size={20} />
                  <p className="text-sm font-bold uppercase tracking-tight">
                    📍 R. dos Pássaros, 46, Bonjardim <br />
                    Campo Grande/MS - Brasil
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/10 gap-8">
              <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">
                © {new Date().getFullYear()} English for Ministry. {t.footer.copyright}
              </p>
              <div className="flex gap-10 text-slate-500 text-xs font-black uppercase tracking-widest">
                <a href="#" className="hover:text-white">{t.footer.privacy}</a>
                <a href="#" className="hover:text-white">{t.footer.terms}</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

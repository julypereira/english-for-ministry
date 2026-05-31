import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, BookOpen, Globe, Users, GraduationCap, MapPin, Search, ArrowRight, Play, CheckCircle, Headphones, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "English for Ministry | Amigo Intimo Church" },
      { name: "description", content: "A plataforma oficial de idiomas da Amigo Intimo Church para missões e ministérios." },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const carouselItems = [
    {
      url: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=1200", // Bíblia aberta
      title: "The Word in Every Language",
      desc: "Prepare seu coração e sua voz para pregar o evangelho em inglês."
    },
    {
      url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200", // Mapa mundi
      title: "Global Mission Mandate",
      desc: "O mundo é o nosso campo. A comunicação é a nossa ponte."
    },
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200", // Grupo estudando
      title: "Christian Community Learning",
      desc: "Aprenda em um ambiente de fé, focado na grande comissão."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 selection:bg-primary/30">
      {/* Top Banner (Fluency Style) */}
      <div className="bg-black text-white py-2 text-center text-xs font-bold uppercase tracking-widest px-4">
        Expand your ministry. Reach the nations. <span className="text-primary ml-2 underline cursor-pointer">Start your journey today</span>
      </div>

      <nav className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-black p-2 rounded-xl group-hover:bg-primary transition-colors duration-300">
              <img 
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100" 
                alt="Logo Amigo Intimo Church"
                className="w-8 h-8 object-contain brightness-0 invert" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl leading-none uppercase tracking-tighter text-black">Amigo Intimo</span>
              <span className="text-primary text-[10px] tracking-[0.3em] font-black uppercase">English for Ministry</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10 text-sm font-bold uppercase tracking-tight">
            <Link to="/" className="text-black hover:text-primary transition-colors">Methodology</Link>
            <Link to="/" className="text-slate-500 hover:text-primary transition-colors">Courses</Link>
            <Link to="/" className="text-slate-500 hover:text-primary transition-colors">Missions</Link>
            <Link to="/" className="text-slate-500 hover:text-primary transition-colors">Testimonials</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold uppercase tracking-tight text-black hover:text-primary px-4 py-2 transition-colors">
              Login
            </Link>
            <Link to="/login" className="bg-primary text-white text-sm font-black uppercase tracking-widest px-8 py-3.5 rounded-full shadow-[0_8px_20px_-6px_rgba(255,102,0,0.4)] hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all">
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Map Concept */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract Map Background Decoration */}
        <div className="absolute top-0 right-0 w-[60%] h-full opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-black">
             <path d="M150 200 L200 150 L300 180 L400 120 L500 150 L600 100 L700 180 L850 150 L900 250 L800 350 L850 450 L750 600 L650 550 L550 650 L400 600 L300 700 L150 650 L200 500 L100 400 L150 300 Z" />
             <circle cx="500" cy="500" r="10" />
             <circle cx="200" cy="300" r="10" />
             <circle cx="800" cy="600" r="10" />
          </svg>
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-orange-100 mb-8">
              <Star size={14} className="fill-primary" />
              Empowering Kingdom Leaders
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter mb-8 uppercase">
              SPEAK ENGLISH <br />
              <span className="text-primary italic">SPREAD THE WORD.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
              The ultimate language training platform for the <span className="text-black font-bold underline decoration-primary decoration-4 underline-offset-4">Amigo Intimo Church</span> missionary community.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/login" className="px-10 py-5 bg-black text-white text-lg font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-colors shadow-2xl">
                Get Started
              </Link>
              <button className="flex items-center gap-4 px-8 py-5 border-2 border-slate-100 rounded-full hover:border-primary hover:bg-orange-50 transition-all group">
                <div className="bg-primary text-white p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Play size={20} fill="white" />
                </div>
                <span className="text-lg font-bold uppercase tracking-tight">Our Mission</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200" 
                alt="Bible and Learning" 
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <div className="flex gap-1 mb-2">
                   {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FF6600" color="#FF6600" />)}
                </div>
                <p className="text-lg font-bold italic">"Now I can preach with confidence."</p>
                <p className="text-sm opacity-80 uppercase tracking-widest font-black mt-1">Pastor John, Missions Dept.</p>
              </div>
            </div>
            {/* Background floating elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Fluency-style Video/Carousel Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4">A Global Community</h2>
            <div className="w-20 h-2 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden rounded-[32px] shadow-2xl" ref={emblaRef}>
              <div className="flex">
                {carouselItems.map((item, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[500px] md:h-[700px]">
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center">
                      <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">{item.title}</h3>
                      <p className="text-xl text-white/90 max-w-2xl font-medium mb-10">{item.desc}</p>
                      <button className="bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
                        Explore Methodology
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

      {/* Methodology Section */}
      <section className="py-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="bg-black rounded-[40px] p-12 text-white relative z-10 overflow-hidden">
               {/* Map Pattern Overlay */}
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')]"></div>
               
               <div className="relative z-10">
                 <h3 className="text-4xl font-black uppercase tracking-tighter mb-10">The Biblical Framework</h3>
                 <div className="space-y-8">
                   {[
                     { icon: <BookOpen />, title: "Theology-focused", desc: "Vocabulary specific for sermons, pastoral care, and church leadership." },
                     { icon: <Headphones />, title: "Immersion method", desc: "Listen to prayers and teachings from global Christian leaders." },
                     { icon: <Globe />, title: "International Reach", desc: "Prepare for mission trips with culturally relevant context." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6 items-start">
                       <div className="bg-primary/20 text-primary p-3 rounded-2xl">
                         {item.icon}
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
            <h2 className="text-5xl font-black text-black uppercase tracking-tighter mb-8 leading-none">
              Not just English. <br />
              <span className="text-primary italic italic">Ministrial Fluency.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
              We developed a unique curriculum blending English linguistics with Christian ministry practice. Go beyond basic conversation.
            </p>
            <ul className="space-y-4 mb-12">
              {["Preaching in English", "Pastoral Counseling", "Kingdom Vocabulary", "Cross-cultural Missions"].map((t, i) => (
                <li key={i} className="flex items-center gap-3 font-black uppercase tracking-tight">
                  <CheckCircle className="text-primary" size={20} />
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/login" className="inline-flex items-center gap-4 text-black font-black uppercase tracking-widest text-lg group">
              Start your training <ArrowRight className="group-hover:translate-x-2 transition-transform text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-black text-white pt-32 pb-16 relative overflow-hidden">
        {/* Large Decorative Logo Background */}
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
                    className="w-10 h-10 object-contain brightness-0 invert" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-2xl leading-none uppercase tracking-tighter">Amigo Intimo</span>
                  <span className="text-primary text-xs tracking-[0.3em] font-black uppercase italic">Church</span>
                </div>
              </div>
              <p className="text-slate-400 text-lg max-w-sm mb-10 font-medium">
                Training global leaders to carry the message of hope to every tribe, tongue, and nation.
              </p>
              <div className="flex gap-6">
                 <a href="https://www.instagram.com/amigointimochurch_cg/" className="text-white hover:text-primary transition-colors text-sm font-black uppercase tracking-widest">Instagram</a>
                 <a href="https://wa.link/wcgt0u" className="text-white hover:text-primary transition-colors text-sm font-black uppercase tracking-widest">WhatsApp</a>
              </div>
            </div>

            <div>
              <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">Navigation</h4>
              <ul className="space-y-4 text-slate-400 font-bold uppercase tracking-tight text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Methodology</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-black uppercase tracking-widest text-sm mb-8">Base</h4>
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
              © {new Date().getFullYear()} English for Ministry. Built for Eternity.
            </p>
            <div className="flex gap-10 text-slate-500 text-xs font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

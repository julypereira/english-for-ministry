import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, BookOpen, Globe, Users, GraduationCap } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "English for Ministry - Amigo Intimo Church" },
      { name: "description", content: "Ministério de idiomas para avançar em missões e ministérios cristãos." },
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
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
      title: "Capacitação para Missões",
      desc: "Prepare-se para levar a palavra a todas as nações."
    },
    {
      url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200",
      title: "Grupos de Estudo",
      desc: "Comunhão e aprendizado em um ambiente cristão."
    },
    {
      url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200",
      title: "Liderança Fluente",
      desc: "Ferramentas para avançar em seu ministério local e global."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decorativo Estilo "Inspiração" */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-200/30 rounded-full blur-3xl opacity-50"></div>
      </div>

      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Globe className="text-white w-6 h-6" />
            </div>
            <div className="font-bold text-xl text-primary tracking-tight">AMIGO INTIMO CHURCH</div>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-muted-foreground hover:text-primary font-medium transition-colors hidden sm:block">Home</Link>
            <Link to="/login" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative py-24 text-center px-4 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
            English for Ministry
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-slate-900 leading-tight">
            Expanda seu Ministério <br />
            <span className="text-primary italic">Através do Idioma</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Capacitando missionários e líderes da Amigo Intimo Church para levar o Evangelho sem fronteiras.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-xl hover:scale-105 transition-transform">
              Começar Agora
            </Link>
            <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full text-lg font-bold shadow-md hover:bg-slate-50 transition-colors">
              Saiba Mais
            </button>
          </div>
        </div>
      </header>

      {/* Carrossel de Imagens */}
      <section className="container mx-auto px-4 mb-24 relative z-10">
        <div className="relative group">
          <div className="overflow-hidden rounded-3xl shadow-2xl" ref={emblaRef}>
            <div className="flex">
              {carouselItems.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[400px] md:h-[600px]">
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{item.title}</h2>
                    <p className="text-lg md:text-xl text-slate-200 max-w-xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </section>

      <main className="container mx-auto py-20 px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Estudo Focado</h3>
            <p className="text-slate-600 leading-relaxed">Conteúdo direcionado para pregação, louvor e intercessão em inglês.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform">
            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="text-indigo-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Missões Globais</h3>
            <p className="text-slate-600 leading-relaxed">Conecte-se com igrejas e organizações internacionais de forma fluente.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform">
            <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="text-purple-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Certificado</h3>
            <p className="text-slate-600 leading-relaxed">Reconhecimento do seu progresso em cada nível alcançado.</p>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 font-bold text-xl text-white">AMIGO INTIMO CHURCH</div>
          <p className="max-w-md mx-auto mb-8">
            Levando o Reino de Deus a todas as nações através da comunicação.
          </p>
          <div className="border-t border-slate-800 pt-8 text-sm">
            © {new Date().getFullYear()} English for Ministry. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

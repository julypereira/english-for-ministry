import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useUsersStore } from "@/lib/users-store";
import { useThemeStore } from "@/lib/theme-store";
import { AlertCircle, Sun, Moon } from "lucide-react";


export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const users = useUsersStore((state) => state.users);
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      login(user);
      if (user.profile === "Administrador") {
        navigate({ to: "/admin/users" });
      } else {
        navigate({ to: "/aulas" });
      }
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-slate-100 selection:bg-primary/30 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Elements directly from Index for consistency */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: `perspective(1000px) rotateX(60deg) translateY(0) translateZ(0)`,
          }}
        ></div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6 focus:outline-none">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all duration-500 overflow-hidden">
                <span className="text-white font-black text-3xl italic select-none z-10 -ml-0.5">A</span>
              </div>
            </Link>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">
              Login
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 opacity-80">English for Ministry</p>
          </div>

          <div className="flex justify-end mb-4">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white dark:text-white light:text-slate-900"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                <AlertCircle size={16} />
                <p className="font-black uppercase tracking-widest">{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600" 
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Senha</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full group relative flex items-center justify-center gap-3 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_25px_rgba(234,88,12,0.3)] active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
            >
              <span>Entrar na Plataforma</span>
            </button>
          </form>


          <div className="mt-10 text-center">
            <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              ← Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

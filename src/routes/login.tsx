import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useUsersStore } from "@/lib/users-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, GraduationCap, ArrowLeft, Languages } from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { users } = useUsersStore();
  const { lang, toggleLang } = useLanguageStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = users.find(u => (u.email === username || u.name === username) && u.password === password);

    if (user) {
      login(user);
      if (user.profile === "Administrador") {
        navigate({ to: "/admin/users" });
      } else {
        navigate({ to: "/aulas" });
      }
    } else {
      setError(lang === 'pt' ? "Usuário ou senha incorretos." : "Incorrect username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate({ to: "/" })}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {lang === 'pt' ? 'Voltar' : 'Back'}
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleLang}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
          >
            <Languages className="mr-2 h-4 w-4 text-primary" />
            {lang === 'pt' ? 'PT' : 'EN'}
          </Button>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
              <span className="text-white font-black text-4xl italic">A</span>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              {lang === 'pt' ? 'Acessar Plataforma' : 'Platform Access'}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {lang === 'pt' ? 'Entre com suas credenciais para continuar' : 'Enter your credentials to continue'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {lang === 'pt' ? 'Usuário / E-mail' : 'Username / Email'}
              </Label>
              <Input
                id="username"
                type="text"
                placeholder={lang === 'pt' ? "Nome de usuário ou e-mail" : "Username or email"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-primary h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {lang === 'pt' ? 'Senha' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-primary h-12 rounded-xl"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center animate-in fade-in slide-in-from-top-2">
                {error}
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-orange-600 text-white font-black uppercase tracking-widest py-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              {lang === 'pt' ? 'Entrar Agora' : 'Login Now'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
             <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                <Shield size={16} className="text-primary" />
                <span className="text-[8px] font-black uppercase tracking-tighter">Portal Admin</span>
             </div>
             <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                <GraduationCap size={16} className="text-blue-400" />
                <span className="text-[8px] font-black uppercase tracking-tighter">Área do Aluno</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

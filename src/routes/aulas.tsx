import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useThemeStore } from "@/lib/theme-store";
import { LogOut, Sun, Moon } from "lucide-react";


export const Route = createFileRoute("/aulas")({
  component: AulasComponent,
});


function AulasComponent() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();


  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  if (!user) return null;

  const aulas = [
    { id: 1, title: "English for Missions 101", description: "Vocabulário básico para missões." },
    { id: 2, title: "Preaching in English", description: "Como estruturar uma mensagem curta em inglês." },
    { id: 3, title: "Prayer and Intercession", description: "Termos e frases comuns para oração." },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="font-bold text-xl text-primary">English for Ministry</div>
          <div className="space-x-4">
            <span className="text-muted-foreground">Olá, {user.name}</span>
            <button onClick={handleLogout} className="text-destructive hover:underline flex items-center gap-2">
              <LogOut size={16} />
              Sair
            </button>

          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Minhas Aulas</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aulas.map(aula => (
            <div key={aula.id} className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-primary">{aula.title}</h3>
              <p className="text-muted-foreground mb-4">{aula.description}</p>
              <button className="text-primary font-medium hover:underline">Assistir Aula →</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

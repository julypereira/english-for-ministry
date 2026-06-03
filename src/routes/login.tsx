import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">English for Ministry</h1>
          <p className="text-muted-foreground">Área do Aluno</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Email</label>
            <input 
              type="email" 
              className="mt-1 block w-full border border-input rounded-md px-3 py-2 focus:ring-primary focus:border-primary" 
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Senha</label>
            <input 
              type="password" 
              className="mt-1 block w-full border border-input rounded-md px-3 py-2 focus:ring-primary focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <Link 
            to="/aulas"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-2"
          >
            Entrar como Aluno
          </Link>
          <Link 
            to="/admin/users"
            className="w-full flex justify-center py-2 px-4 border border-white/10 rounded-md shadow-sm text-sm font-medium text-foreground bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Entrar como Admin
          </Link>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-primary hover:underline">Voltar para o site</Link>
        </div>
      </div>
    </div>
  );
}

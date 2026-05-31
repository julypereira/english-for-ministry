import { createFileRoute, Link } from "@tanstack/react-router";

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
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="font-bold text-xl text-primary">AMIGO INTIMO CHURCH</div>
          <div className="space-x-4">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <Link to="/login" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Login</Link>
          </div>
        </div>
      </nav>

      <header className="py-20 text-center bg-primary text-primary-foreground">
        <h1 className="text-5xl font-bold mb-4">English for Ministry</h1>
        <p className="text-xl opacity-90">Avançando no Reino através do idioma</p>
      </header>

      <main className="container mx-auto py-16 px-4">
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Sobre o Grupo</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Bem-vindo ao English for Ministry, o ministério de idiomas da Amigo Intimo Church. 
            Nosso foco é capacitar missionários e líderes para expandir o evangelho através do aprendizado da língua inglesa.
          </p>
        </section>
      </main>
    </div>
  );
}

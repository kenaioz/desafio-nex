import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="flex h-16 items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-semibold">Nex Loyalty | Transações</h1>
        <ThemeSwitcher />
      </header>

      <main className="p-8">
        <Outlet />
      </main>

      <footer className="bg-foreground text-background flex items-center justify-between px-8 py-2">
        <p>Feito por Silvio Cesar</p>
        <p>Vaga FullStack Nex</p>
      </footer>
    </div>
  );
}

import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import type { PropsWithChildren } from "react";

export default function Dashboard({ children }: PropsWithChildren) {
  return (
    <>
      <header className="flex h-16 items-center justify-between px-8 py-4">
        <h1 className="text-2xl">Nex Loyalty | Silvio Cesar</h1>
        <ThemeSwitcher />
      </header>

      <main className="p-8">{children}</main>

      <footer className="bg-foreground text-background flex items-center justify-between px-8 py-4">
        <p>Feito por Silvio Cesar</p>
        <p>Vaga FullStack Nex</p>
      </footer>
    </>
  );
}

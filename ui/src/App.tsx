import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

import { Button } from "./components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <ThemeSwitcher />
        <Button
          className="cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => console.log("Teste")}
        >
          Click me
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;

import { useTheme } from "@/components/theme/theme-provider";

import { MdComputer, MdDarkMode, MdLightMode } from "react-icons/md";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="bg-foreground flex items-center justify-between gap-1 rounded-md p-1">
      <button
        className="text-background hover:bg-midground data-[active=true]:bg-background data-[active=true]:text-foreground cursor-pointer rounded-md p-1 transition-all duration-300 ease-in-out"
        onClick={() => setTheme("system")}
        data-active={theme === "system"}
      >
        <MdComputer />
      </button>

      <button
        className="text-background hover:bg-midground data-[active=true]:bg-background data-[active=true]:text-foreground cursor-pointer rounded-md p-1 transition-all duration-300 ease-in-out"
        onClick={() => setTheme("dark")}
        data-active={theme === "dark"}
      >
        <MdDarkMode />
      </button>
      <button
        className="text-background hover:bg-midground data-[active=true]:bg-background data-[active=true]:text-foreground cursor-pointer rounded-md p-1 transition-all duration-300 ease-in-out"
        onClick={() => setTheme("light")}
        data-active={theme === "light"}
      >
        <MdLightMode />
      </button>
    </div>
  );
}

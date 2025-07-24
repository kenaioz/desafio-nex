import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/hooks/auth";

import "./index.css";
import { Routes } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);

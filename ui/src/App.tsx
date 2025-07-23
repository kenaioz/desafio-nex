import { ThemeProvider } from "@/components/theme/theme-provider";

import { Route, Routes } from "react-router";

import AppLayout from "./pages/application/layout";
import Transactions from "./pages/application/transactions";

import AuthLayout from "./pages/auth/layout";
import { SignIn } from "./pages/auth/signin";
import { SignUp } from "./pages/auth/signup";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
        </Route>

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Transactions />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import { API } from "../services/api";

import { toast } from "sonner";

import { tryCatch } from "@/utils/try-catch";

interface User {
  id: number;
  email: string;
  cpf: string;
  fullName: string;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthData {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = React.useState<AuthData | null>(null);

  async function signIn({ email, password }: SignInCredentials) {
    const api = new API();

    const [error, response] = await tryCatch(
      api.post<AuthData>("/auth/login", {
        body: JSON.stringify({ email, password }),
      }),
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    const { token, user } = response;

    localStorage.setItem("@vaga_nex:token", token);

    api.createSession(response.token);

    setData({ token, user });

    console.log("Fim SignIn");

    return;
  }

  function signOut() {
    localStorage.removeItem("@vaga_nex:token");

    setData(null);
  }

  React.useEffect(() => {
    const api = new API();
    const token = localStorage.getItem("@vaga_nex:token");

    if (!token) return;

    api.createSession(token);

    (async () => {
      const [error, response] = await tryCatch(api.post<User>("/auth/verify"));

      if (error) {
        console.error("Erro ao verificar token", error);
        return;
      }

      setData({
        token,
        user: response,
      });
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data?.user ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };

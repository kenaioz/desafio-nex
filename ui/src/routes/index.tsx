import React from "react";
import { BrowserRouter } from "react-router";

import { TransactionsRoutes } from "./transactions";
import { AuthRoutes } from "./auth";

import { useAuth } from "../hooks/auth";

import { API } from "../services/api";
import { tryCatch } from "@/utils/try-catch";

export function Routes() {
  const { user, signOut } = useAuth();

  const token = localStorage.getItem("@vaga_nex:token");

  React.useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      const api = new API();

      const [error] = await tryCatch(api.post("/verify"));

      if (error) {
        signOut();
      }
    };

    verifyToken();
  }, [signOut, token]);

  return (
    <BrowserRouter>
      {user ? <TransactionsRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}

import { Routes, Route } from "react-router";

import { AuthLayout } from "@/pages/auth/layout";
import { SignIn } from "@/pages/auth/signin";
import { SignUp } from "@/pages/auth/signup";

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

import { Routes, Route } from "react-router";

import { AppLayout } from "@/pages/application/layout";
import { Transactions } from "@/pages/application/transactions";

export function TransactionsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Transactions />} />
      </Route>
    </Routes>
  );
}

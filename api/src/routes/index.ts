import { Router } from 'express';

import TransactionRoutes from './transactions.route';

const routes = Router();

routes.use('/transactions', TransactionRoutes);

export { routes };

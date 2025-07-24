import { Router } from 'express';

import AuthRoutes from './auth.route';
import UsersRoutes from './users.route';
import TransactionRoutes from './transactions.route';
import SeedRoutes from './seed.route';

const routes = Router();

routes.use('/auth', AuthRoutes);
routes.use('/users', UsersRoutes);
routes.use('/transactions', TransactionRoutes);
routes.use('/seed', SeedRoutes);

export { routes };

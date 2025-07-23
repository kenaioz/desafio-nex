import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';

import { TransactionRepository } from '../repositories/transactions.repository';
import { TransactionService } from '../services/transactions.services';
import { TransactionController } from '../controllers/transactions.controllers';

const router = Router();

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

router.use(AuthMiddleware);

router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getById);
router.post('/', transactionController.create);

export default router;

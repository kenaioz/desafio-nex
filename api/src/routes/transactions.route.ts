import { Router } from 'express';

import { TransactionRepository } from '../repositories/transactions.repository';
import { TransactionService } from '../services/transactions.services';
import { TransactionController } from '../controllers/transactions.controllers';

const router = Router();

const repository = new TransactionRepository();
const service = new TransactionService(repository);
const controller = new TransactionController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);

export default router;

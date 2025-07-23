import { Request, Response, NextFunction } from 'express';

import { TransactionService } from '../services/transactions.services';

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  getAll = async (_req: Request, res: Response, _next: NextFunction) => {
    const transactions = await this.transactionService.getAll();

    return res.json(transactions);
  };

  getById = async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const transaction = await this.transactionService.getById(id);
    return res.json(transaction);
  };

  create = async (req: Request, res: Response, _next: NextFunction) => {
    const transaction = await this.transactionService.create(req.body);
    return res.status(201).json(transaction);
  };
}

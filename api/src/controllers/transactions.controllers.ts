import { Request, Response, NextFunction } from 'express';

import { TransactionService } from '../services/transactions.services';

import { User } from '../models/Users';

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  getAll = async (req: Request, res: Response, _next: NextFunction) => {
    const user = (req as any).user as User;

    const transactions = await this.transactionService.getAll(user);

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

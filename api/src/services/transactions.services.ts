import { TransactionRepository } from '../repositories/transactions.repository';
import { Transaction } from '../models/Transactions';

import { HttpError } from '../utils/HttpError';

export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async getAll(): Promise<Transaction[]> {
    return await this.transactionRepository.findAll();
  }

  async getById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new HttpError(404, 'Transação não encontrada');
    }

    return transaction;
  }

  async create(data: Transaction): Promise<Transaction> {
    if (!data.cpf || !data.status) {
      throw new HttpError(400, 'Campos obrigatórios ausentes');
    }

    return await this.transactionRepository.create(data);
  }
}

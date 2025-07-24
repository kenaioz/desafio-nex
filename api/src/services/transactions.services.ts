import { TransactionRepository } from '../repositories/transactions.repository';

import {
  Transaction,
  TransactionCreationAttributes,
} from '../models/Transactions';

import { HttpError } from '../utils/HttpError';

import { User } from '../models/Users';

export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async getAll(user: User) {
    if (user.admin) {
      return await this.transactionRepository.findAll();
    }

    return await this.transactionRepository.findByCPF(user.cpf);
  }

  async getById(id: number) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new HttpError(404, 'Transação não encontrada');
    }

    return transaction;
  }

  async create(data: TransactionCreationAttributes) {
    if (!data.cpf || !data.status) {
      throw new HttpError(400, 'Campos obrigatórios ausentes');
    }

    return await this.transactionRepository.create(data);
  }
}

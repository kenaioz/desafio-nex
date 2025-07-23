import { Transaction } from '../models/Transactions';

export class TransactionRepository {
  async findAll(): Promise<Transaction[]> {
    return await Transaction.findAll();
  }

  async findById(id: number): Promise<Transaction | null> {
    return await Transaction.findByPk(id);
  }

  async create(data: Transaction): Promise<Transaction> {
    return await Transaction.create(data);
  }
}

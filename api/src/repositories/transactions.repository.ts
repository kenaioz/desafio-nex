import {
  Transaction,
  TransactionCreationAttributes,
} from '../models/Transactions';

export class TransactionRepository {
  async findAll(): Promise<Transaction[]> {
    return await Transaction.findAll();
  }

  async findByCPF(cpf: string): Promise<Transaction | null> {
    return await Transaction.findOne({ where: { cpf } });
  }

  async findById(id: number): Promise<Transaction | null> {
    return await Transaction.findByPk(id);
  }

  async create(data: TransactionCreationAttributes): Promise<Transaction> {
    return await Transaction.create(data);
  }
}

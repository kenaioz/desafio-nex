import { Router } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/Users';
import { Transaction, type TransactionStatus } from '../models/Transactions';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedCommonPassword = await bcrypt.hash('common123', 10);

    const adminUser = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      cpf: '12345678900',
      password: hashedAdminPassword,
      admin: true,
    });

    const commonUsersData = [
      {
        fullName: 'João Silva',
        email: 'joao@example.com',
        cpf: '11111111111',
        password: hashedCommonPassword,
        admin: false,
      },
      {
        fullName: 'Maria Souza',
        email: 'maria@example.com',
        cpf: '22222222222',
        password: hashedCommonPassword,
        admin: false,
      },
      {
        fullName: 'Pedro Oliveira',
        email: 'pedro@example.com',
        cpf: '33333333333',
        password: hashedCommonPassword,
        admin: false,
      },
      {
        fullName: 'Ana Lima',
        email: 'ana@example.com',
        cpf: '44444444444',
        password: hashedCommonPassword,
        admin: false,
      },
      {
        fullName: 'Lucas Rocha',
        email: 'lucas@example.com',
        cpf: '55555555555',
        password: hashedCommonPassword,
        admin: false,
      },
    ];

    const createdUsers = await User.bulkCreate(commonUsersData);

    const transactionsData = createdUsers.flatMap((user, index) => [
      {
        description: `Compra no mercado ${index + 1}`,
        status: 'Aprovado' as TransactionStatus,
        value: 100 + index * 10,
        cpf: user.cpf,
        date: new Date(),
        points: 100 + index * 5,
      },
      {
        description: `Assinatura de serviço ${index + 1}`,
        status: 'Reprovado' as TransactionStatus,
        value: 50 + index * 5,
        cpf: user.cpf,
        date: new Date(),
        points: 0,
      },
    ]);

    await Transaction.bulkCreate(transactionsData);

    return res.status(201).json({ message: 'Seed criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar seed:', error);
    return res.status(500).json({ error: 'Erro ao criar seed' });
  }
});

export default router;

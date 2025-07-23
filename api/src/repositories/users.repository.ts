import bcrypt from 'bcrypt';

import { User, UserCreationAttributes } from '../models/Users';

export class UserRepository {
  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  async createUser(data: UserCreationAttributes): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return User.create({
      ...data,
      password: hashedPassword,
    });
  }
}

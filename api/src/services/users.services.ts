import { User, UserCreationAttributes } from '../models/Users';
import { UserRepository } from '../repositories/users.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll() {
    return await this.userRepository.findAll();
  }

  async getById(id: number) {
    return await this.userRepository.findById(id);
  }

  async getByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async register(data: UserCreationAttributes) {
    const existing = await this.userRepository.findByEmail(data.email);

    if (existing) throw new Error('Usuário já existe');

    return this.userRepository.createUser(data);
  }
}

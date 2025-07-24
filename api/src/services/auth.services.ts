import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcrypt';

import { JWT_SECRET } from '../config/auth';
import { UserRepository } from '../repositories/users.repository';

import { HttpError } from '../utils/HttpError';

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) throw new HttpError(400, 'Usuário não encontrado');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new HttpError(400, 'Email ou senha inválidos');

    const user_data = {
      id: user.id,
      email: user.email,
      cpf: user.cpf,
      fullName: user.fullName,
      admin: user.admin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      token: await new SignJWT(user_data)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(JWT_SECRET),
      user: user_data,
    };
  }

  async verifyToken(token: string) {
    return jwtVerify(token, JWT_SECRET);
  }
}

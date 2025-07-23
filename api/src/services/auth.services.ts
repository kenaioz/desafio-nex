import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcrypt';

import { JWT_SECRET } from '../config/auth';
import { UserRepository } from '../repositories/users.repository';

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return new SignJWT({
      email: user.email,
      cpf: user.cpf,
      admin: user.admin,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(JWT_SECRET);
  }

  async verifyToken(token: string) {
    return jwtVerify(token, JWT_SECRET);
  }
}

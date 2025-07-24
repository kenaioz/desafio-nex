import { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services/auth.services';
import { UserRepository } from '../repositories/users.repository';

import { tryCatch } from '../utils/try-catch';
import { HttpError } from '../utils/HttpError';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export async function AuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new HttpError(401, 'Token JWT ausente ou inválido');
  }

  const token = authHeader.split(' ')[1];

  const [error, payload] = await tryCatch(authService.verifyToken(token));

  if (error) {
    throw new HttpError(403, 'Token inválido ou expirado');
  }

  (req as any).user = payload;
  next();
}

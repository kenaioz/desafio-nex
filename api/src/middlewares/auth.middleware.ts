import { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services/auth.services';
import { UserRepository } from '../repositories/users.repository';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token JWT ausente ou inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { payload } = await authService.verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

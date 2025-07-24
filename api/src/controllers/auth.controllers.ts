import { Request, Response } from 'express';

import { AuthService } from '../services/auth.services';
import { HttpError } from '../utils/HttpError';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);

    if (!token) {
      throw new HttpError(401, 'Usuário ou senha inválidos');
    }

    return res.json({ token });
  };
}

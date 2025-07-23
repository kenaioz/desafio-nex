import { Request, Response } from 'express';

import { AuthService } from '../services/auth.services';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);

    if (!token) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    return res.json({ token });
  };
}

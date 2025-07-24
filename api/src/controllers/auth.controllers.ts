import { Request, Response } from 'express';

import { AuthService } from '../services/auth.services';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = await this.authService.login(email, password);

    return res.json(data);
  };

  verify = async (req: Request, res: Response) => {
    const user = (req as any).user;

    return res.json(user);
  };
}

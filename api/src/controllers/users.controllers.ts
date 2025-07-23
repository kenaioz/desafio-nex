import { Request, Response } from 'express';

import { UserService } from '../services/users.services';

export class UsersController {
  constructor(private userService: UserService) {}
  getAll = async (req: Request, res: Response) => {
    const users = await this.userService.getAll();

    return res.status(200).json(users);
  };

  register = async (req: Request, res: Response) => {
    const { email, password, cpf, fullName, admin } = req.body;
    try {
      const user = await this.userService.register({
        email,
        password,
        cpf,
        fullName,
        admin: admin || false,
      });
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };
}

import { Request, Response } from 'express';

import { UserService } from '../services/users.services';

import { tryCatch } from '../utils/try-catch';
import { HttpError } from '../utils/HttpError';

export class UsersController {
  constructor(private userService: UserService) {}
  getAll = async (req: Request, res: Response) => {
    const users = await this.userService.getAll();

    return res.status(200).json(users);
  };

  getByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;

    const user = await this.userService.getByEmail(email);

    return res.status(200).json(user);
  };

  register = async (req: Request, res: Response) => {
    const { email, password, cpf, fullName, admin } = req.body;

    const [error, user] = await tryCatch(
      this.userService.register({
        email,
        password,
        cpf,
        fullName,
        admin: admin || false,
      }),
    );

    if (error) {
      throw new HttpError(400, error.message);
    }

    return res.status(201).json(user);
  };
}

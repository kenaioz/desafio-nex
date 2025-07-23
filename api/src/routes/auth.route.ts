import { Router } from 'express';

import { AuthController } from '../controllers/auth.controllers';
import { AuthService } from '../services/auth.services';
import { UserRepository } from '../repositories/users.repository';

const router = Router();
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const controller = new AuthController(authService);

router.post('/login', controller.login);

export default router;

import { Router } from 'express';

import { AuthController } from '../controllers/auth.controllers';
import { AuthService } from '../services/auth.services';
import { UserRepository } from '../repositories/users.repository';

import { AuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const controller = new AuthController(authService);

router.post('/login', controller.login);
router.post('/verify', AuthMiddleware, controller.verify);

export default router;

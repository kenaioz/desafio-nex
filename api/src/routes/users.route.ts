import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';

import { UserRepository } from '../repositories/users.repository';
import { UserService } from '../services/users.services';
import { UsersController } from '../controllers/users.controllers';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UsersController(userService);

router.get('/', AuthMiddleware, userController.getAll);
router.post('/register', userController.register);
router.get('/:email', AuthMiddleware, userController.getByEmail);

export default router;

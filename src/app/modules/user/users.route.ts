import express from 'express';
import { UserController } from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/:id', UserController.getSingleUsers);



router.get('/', UserController.getAllUsers);

router.delete('/:id', UserController.deleteUsers);
router.patch(
    '/:id',
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUsers
  );

export const UserRoutes = router;

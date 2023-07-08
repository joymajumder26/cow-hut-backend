import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();


router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);
router.get('/:id', AdminController.getSingleAdmins);
router.get('/', AdminController.getAllAdmins);

router.delete('/:id', AdminController.deleteAdmins);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmins
);

export const AdminRoutes = router;

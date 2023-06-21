import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';

// import { AcademicDepartmentValidation } from './cow.validation';
// import { AcademicDepartmentController } from './cow.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
 CowController.createCow
);

router.get('/:id', CowController.getSingleCow);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);
router.patch('/:id',  CowController.updateCow);
router.get('/', CowController.getAllCow);

router.delete('/:id', CowController.deleteCow);

export const CowRoutes = router;

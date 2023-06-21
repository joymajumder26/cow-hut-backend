import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/Orders',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get('/:id', OrderController.getSingleOrder);

router.patch(
  '/:id',
  validateRequest(OrderValidation.updateOrderZodSchema),
  OrderController.updateOrder
);
router.patch('/:id', OrderController.updateOrder);
router.get('/', OrderController.getAllOrder);

router.delete('/:id', OrderController.deleteOrder);

export const OrderRoutes = router;

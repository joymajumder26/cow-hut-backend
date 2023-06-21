import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'cow Id is required',
    }),
    buyer: z.string({
      required_error: 'buyer Id is required',
    }),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    cow: z.string().optional(),
    buyer: z.string().optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};

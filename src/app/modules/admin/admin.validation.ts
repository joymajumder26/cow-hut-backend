import { z } from 'zod';
import { role } from '../user/user.constant';

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      phoneNumber: z.string({
        required_error: 'contactNo is required',
      }),
      role: z.enum(['admin'], {
        required_error: 'role is required',
      }),

      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),

        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),

      address: z.string({
        required_error: 'Address is required',
      }),
    }),
  }),
});
const updateAdminZodSchema = z.object({
  body: z.object({
    admin: z.object({
      phoneNumber: z.string().optional(),
      role: z.enum([...role] as [string, ...string[]]).optional(),

      name: z.object({
        firstName: z.string().optional(),

        lastName: z.string().optional(),
      }),

      

      address: z.string().optional(),
      
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,updateAdminZodSchema
};

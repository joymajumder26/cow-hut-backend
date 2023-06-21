import { z } from 'zod';
import { role } from './user.constant';
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    user:z.object({
    role:z.enum(['buyer','seller'],{
        required_error:"role is required"
    }),
    
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),

        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),

      phoneNumber: z.string({
        required_error: 'contactNo is required',
      }),

      address: z.string({
        required_error: 'Address is required',
      }),
      budget: z.number({
        required_error: 'budget is required',
      }),
      income: z.number({
        required_error: 'income is required',
      }),
    }),
  })
})
const updateUserZodSchema = z.object({
    body: z.object({
      user:z.object({
        role:z.enum([...role] as [string, ...string[]]).optional(),
        
          name: z.object({
            firstName: z.string().optional(),
    
            lastName: z.string().optional(),
          }),
    
          phoneNumber: z.string().optional(),
    
          address: z.string().optional(),
          budget: z.number().optional(),
          income: z.number().optional(),
      
      })
    }),
  });



export const UserValidation = {
createUserZodSchema,updateUserZodSchema
};



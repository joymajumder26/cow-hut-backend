import {  z } from 'zod';
import { label, category, location, breed } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),

    age: z.number({
      required_error: 'age is required',
    }),

    price: z.number({
      required_error: 'price is required',
    }),

    location: z.enum(
      [
        'Dhaka',
        'Chittagong',
        'Rajshahi',
        'Khulna',
        'Barisal',
        'Sylhet',
        'Rangpur',
        'Mymensingh',
      ],
      {
        required_error: 'location is required',
      }
    ),
    breed: z.enum(
      [
        'Brahman',
        'Nellore',
        'Sahiwal',
        'Gir',
        'Indigenous',
        'Tharparkar',
        'Kankrej',
      ],
      {
        required_error: 'breed is required',
      }
    ),
    weight: z.string({
      required_error: 'weight is required',
    }),
    label: z.enum(['for sale', 'sold out'], {
      required_error: 'label is required',
    }),
    category: z.enum(['Dairy', 'Beef', 'DualPurpose'], {
      required_error: 'category is required',
    }),
    seller:z.string({
      required_error: 'seller Id is required',
    })
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    age: z.number().optional(),

    price: z.number().optional(),

    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),

    weight: z.string().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller:z.string().optional()
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};

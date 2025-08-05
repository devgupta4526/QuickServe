import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(2),
  gender: z.string().min(1),
  phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
  spent: z.preprocess(
    (val) => typeof val === 'string' || typeof val === 'number' ? +val : undefined,
    z.number().min(0)
  ),
  address: z.string().min(2),
  orders: z.preprocess(
    (val) => typeof val === 'string' || typeof val === 'number' ? +val : undefined,
    z.number().min(0)
  ).optional()
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

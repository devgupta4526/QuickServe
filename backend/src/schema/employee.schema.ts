// schema/employee.schema.ts

import { z } from "zod";

export const createEmployeeSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  outlet: z.string().min(1, "Outlet is required"),
  business: z.string().min(1, "Business is required"),
  position: z.string().max(50).optional(),
  avatar: z.string().url().optional(),
  roles: z.array(z.string().min(1)).nonempty("At least one role is required"),
});

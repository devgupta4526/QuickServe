import { z } from "zod";

export const businessCreationSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.enum(["restaurant", "retail", "vendor"]),
  address: z.string().max(200).optional(),
  gstNumber: z.preprocess(
  (val) => (val === "" ? undefined : val),
  z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number")
    .optional()
),
  logoUrl: z.string().url().optional(),
  currency: z.string().length(3).optional(),
  taxPercentage: z.number().min(0).max(100).optional(),
  settings: z
    .object({
      theme: z.enum(["light", "dark", "custom"]).optional(),
      modules: z.array(z.string()).optional(),
    })
    .optional(),
});

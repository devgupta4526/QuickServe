import { z } from "zod";

export const variantSchema = z.object({
  name: z.string().min(1),
  price: z.preprocess(
    (val) => (typeof val === "string" || typeof val === "number" ? +val : undefined),
    z.number().min(0)
  ),
  stock: z.preprocess(
    (val) => (typeof val === "string" || typeof val === "number" ? +val : undefined),
    z.number().min(0)
  ),
  sku: z.string().optional(),
});

export const recipeSchema = z.object({
  inventoryId: z.string().min(1),
  quantity: z.preprocess(
    (val) => (typeof val === "string" || typeof val === "number" ? +val : undefined),
    z.number().min(0)
  ),
  unit: z.string().min(1),
});

export const createProductSchema = z.object({
  name: z.string().min(2),
  menuItemId: z.string().min(1),
  outletId: z.string().min(1),
  unit: z.string().min(1),
  quantity: z.preprocess(
    (val) => (typeof val === "string" || typeof val === "number" ? +val : undefined),
    z.number().min(0)
  ),
  threshold: z
    .preprocess(
      (val) => (typeof val === "string" || typeof val === "number" ? +val : undefined),
      z.number().min(0)
    )
    .optional(),
  category: z.string().optional(),
  imageUrl: z.string().optional(),

  variants: z
    .preprocess((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return [];
        }
      }
      return Array.isArray(val) ? val : [];
    }, z.array(variantSchema))
    .optional(),

  recipe: z
    .preprocess((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return [];
        }
      }
      return Array.isArray(val) ? val : [];
    }, z.array(recipeSchema))
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

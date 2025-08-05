import { z } from "zod";

// Variant schema
const variantSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return {};
    }
  }
  return val;
}, z.object({
  name: z.string().min(1, "Variant name is required"),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().nonnegative("Variant price must be >= 0")
  ),
}));

// Addon schema
const addonSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return {};
    }
  }
  return val;
}, z.object({
  name: z.string().min(1, "Addon name is required"),
  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().nonnegative("Addon price must be >= 0")
  ),
}));

export const createMenuItemSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters"),
  description: z.string().optional(),

  price: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().positive("Price must be a positive number")
  ),

  category: z.string().min(1, "Category is required"),

  available: z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val;
  }, z.boolean().default(true)),

  // Handle variants from FormData - supports both single/multiple stringified entries
  variants: z.preprocess((val) => {
    if (!val) return [];
    if (typeof val === "string") return [val];
    if (Array.isArray(val)) return val;
    return [];
  }, z.array(variantSchema)).optional(),

  // Handle addons from FormData - supports both single/multiple stringified entries
  addons: z.preprocess((val) => {
    if (!val) return [];
    if (typeof val === "string") return [val];
    if (Array.isArray(val)) return val;
    return [];
  }, z.array(addonSchema)).optional(),

  outletId: z.string().min(1, "Outlet ID is required"),
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;

import { z } from "zod";

// Item schema
export const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
  notes: z.string().optional(),
  variants: z.array(z.object({ name: z.string(), price: z.number() })).optional(),
  addons: z.array(z.object({ name: z.string(), price: z.number() })).optional(),
});

// Create order schema
export const createOrderSchema = z.object({
  outletId: z.string(),
  source: z.enum(["qr", "staff"]),
  table: z.string().optional(),
  items: z.array(orderItemSchema).nonempty(),
  tax: z.number().default(0),
  charges: z.number().default(0),
  total: z.number(),
  paymentId: z.string().optional(),
  paymentStatus: z.enum(["Pending", "Paid", "Failed"]).optional(),
  estimatedDeliveryTime: z.string().optional(), // ISO format or human string
  staffNotes: z.string().optional(),
  customer: z.object({
    name: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    gender: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const updateOrderSchema = z.object({
  status: z.string().optional(),
  estimatedDeliveryTime: z.string().optional(),
  staffNotes: z.string().optional(),
  paymentStatus: z.enum(["Pending", "Paid", "Failed"]).optional(),
  paymentMethod: z.enum(["Cash", "UPI", "Card","InApp"]).optional(),
  paymentProvider: z.string().optional(),
paymentReference: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;


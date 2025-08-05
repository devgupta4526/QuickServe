import { z } from "zod";

export const createInventorySchema = z.object({
    name: z.string().min(2),
    outletId: z.string(),
    unit: z.string().min(1),
    quantity: z.preprocess(
        (v) => typeof v === "string" || typeof v === "number" ? +v : undefined,
        z.number().min(0)
    ),
    threshold: z
        .preprocess(
            (v) => typeof v === "string" || typeof v === "number" ? +v : undefined,
            z.number().min(0)
        )
        .optional(),
});

export const stockAdjustmentSchema = z.object({
    outletId: z.string(),
    itemName: z.string().min(1),
    type: z.enum(["increase", "decrease"]),
    quantity: z.preprocess(
        (v) => typeof v === "string" || typeof v === "number" ? +v : undefined,
        z.number().min(1)
    ),
    reason: z.string().optional(),
});

export type StockAdjustmentInput = z.infer<typeof stockAdjustmentSchema>;
export type CreateInventoryInput = z.infer<typeof createInventorySchema>;

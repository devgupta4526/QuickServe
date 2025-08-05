import mongoose, { Schema, Document, Types } from "mongoose";

export interface InventoryDocument extends Document {
    name: string;
    outletId: Types.ObjectId;  // ✅ Change here
    unit: string;
    quantity: number;
    threshold: number;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    createdAt: Date;
    updatedAt: Date;
}


const inventorySchema = new Schema<InventoryDocument>(
    {
        name: { type: String, required: true, trim: true },
        outletId: { type: Schema.Types.ObjectId, ref: "Outlet", required: true },
        unit: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        threshold: { type: Number, default: 10 },
        status: {
            type: String,
            enum: ["In Stock", "Low Stock", "Out of Stock"],
            default: "In Stock",
        },
    },
    { timestamps: true }
);

inventorySchema.pre("save", function (next) {
    const item = this as InventoryDocument;
    if (item.quantity === 0) item.status = "Out of Stock";
    else if (item.quantity <= (item.threshold || 10)) item.status = "Low Stock";
    else item.status = "In Stock";
    next();
});

const InventoryModel = mongoose.model<InventoryDocument>("Inventory", inventorySchema);
export default InventoryModel;

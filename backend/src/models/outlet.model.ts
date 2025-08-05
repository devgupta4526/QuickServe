import mongoose, { Schema, Document, Types } from "mongoose";

export interface OutletDocument extends Document {
    business: Types.ObjectId;
    name: string;
    address: string;
    phone?: string;
    manager?: Types.ObjectId; // optional: for outlet-level manager
    createdAt: Date;
    updatedAt: Date;
}

const outletSchema = new Schema<OutletDocument>(
    {
        business: {
            type: Schema.Types.ObjectId,
            ref: "Business",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, "Outlet name must be at least 2 characters."],
        },
        address: {
            type: String,
            required: true,
            maxlength: [200, "Address must not exceed 200 characters."],
        },
        phone: {
            type: String,
            maxlength: 20,
        },
        manager: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const OutletModel = mongoose.model<OutletDocument>("Outlet", outletSchema);
export default OutletModel;

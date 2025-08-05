import mongoose, { Document, Schema } from "mongoose";

export interface AppDocument extends Document {
    id: string; // e.g., "pos"
    label: string; // e.g., "Point of Sale"
    category: "core" | "addon" | "custom";
    iconUrl?: string;
    description?: string;
    isActive?: boolean;
}

const appSchema = new Schema<AppDocument>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        label: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["core", "addon", "custom"],
            default: "core",
        },
        iconUrl: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const AppModel = mongoose.model<AppDocument>("App", appSchema);
export default AppModel;

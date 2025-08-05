import mongoose, { Document, Schema } from "mongoose";

export interface TemplateDocument extends Document {
  title: string;
  type: "restaurant" | "retail" | "vendor";
  description?: string;
  iconUrl?: string;
  defaultModules: string[];
  recommendedSettings?: {
    theme: "light" | "dark" | "custom";
    currency?: string;
    taxPercentage?: number;
  };
}

const templateSchema = new Schema<TemplateDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["restaurant", "retail", "vendor"],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    iconUrl: {
      type: String,
      default: "",
    },
    defaultModules: {
      type: [String],
      required: true,
    },
    recommendedSettings: {
      theme: {
        type: String,
        enum: ["light", "dark", "custom"],
        default: "light",
      },
      currency: {
        type: String,
        match: [/^[A-Z]{3}$/, "Must be a valid ISO currency code"],
        default: "INR",
      },
      taxPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const TemplateModel = mongoose.model<TemplateDocument>("Template", templateSchema);
export default TemplateModel;

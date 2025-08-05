import mongoose, { Document, Schema, Types } from "mongoose";

export interface BusinessDocument extends Document {
  name: string;
  type: "restaurant" | "retail" | "vendor";
  logoUrl?: string;
  address?: string;
  gstNumber?: string;
  owner: Types.ObjectId;
  currency?: string;
  taxPercentage?: number;
  settings?: {
    theme?: string;
    modules?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const businessSchema = new Schema<BusinessDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Business name must be at least 2 characters."],
      maxlength: [100, "Business name must not exceed 100 characters."],
    },
    type: {
      type: String,
      enum: ["restaurant", "retail", "vendor"],
      required: true,
    },
    logoUrl: {
      type: String,
      default: "https://cdn.quickserve360.com/business-logo-default.png",
    },
    address: {
      type: String,
      maxlength: [200, "Address must not exceed 200 characters."],
      default: "",
    },
    gstNumber: {
      type: String,
      match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number format"],
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      match: [/^[A-Z]{3}$/, "Currency must be a valid 3-letter ISO code"],
    },
    taxPercentage: {
      type: Number,
      min: [0, "Tax percentage cannot be negative."],
      max: [100, "Tax percentage cannot exceed 100%."],
      default: 0,
    },
    settings: {
      theme: {
        type: String,
        enum: ["light", "dark", "custom"],
        default: "light",
      },
      modules: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

const BusinessModel = mongoose.model<BusinessDocument>("Business", businessSchema);
export default BusinessModel;

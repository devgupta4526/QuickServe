import mongoose, { Document, Schema, Types } from "mongoose";

export interface Variant {
  name: string;
  price: number;
}

export interface Addon {
  name: string;
  price: number;
}

export interface MenuItemDocument extends Document {
  name: string;
  description?: string;
  outletId: Types.ObjectId;
  price: number;
  category?: string;
  imageUrl?: string;
  variants?: Variant[];
  addons?: Addon[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Variant subdocument schema
const variantSchema = new Schema<Variant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [30, "Variant name must not exceed 30 characters."],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Variant price cannot be negative."],
    },
  },
  { _id: false }
);

// Addon subdocument schema
const addonSchema = new Schema<Addon>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [30, "Addon name must not exceed 30 characters."],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Addon price cannot be negative."],
    },
  },
  { _id: false }
);

// Main Menu Item schema
const menuItemSchema = new Schema<MenuItemDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Menu item name must not exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description too long."],
      default: "",
    },
    outletId: {
      type: Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number."],
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, "Category too long."],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    addons: {
      type: [addonSchema],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const MenuItemModel = mongoose.model<MenuItemDocument>("MenuItem", menuItemSchema);
export default MenuItemModel;

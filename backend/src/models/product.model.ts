// src/models/product.model.ts
import mongoose, { Document, Schema, Types } from "mongoose";

interface Variant {
  name: string;
  price: number;
  stock: number;
  sku?: string;
}

interface RecipeIngredient {
  inventoryId: Types.ObjectId;
  quantity: number;
  unit: string;
}

export interface ProductDocument extends Document {
  name: string;
  menuItemId: Types.ObjectId;
  outletId: Types.ObjectId;
  unit: string;
  quantity: number;
  threshold?: number;
  category?: string;
  imageUrl?: string;
  variants?: Variant[];
  recipe?: RecipeIngredient[];
  status: "In Stock" | "Low Stock" | "Out of Stock";
  createdAt: Date;
  updatedAt: Date;
}

const variantSchema = new Schema<Variant>(
  {
    name: { type: String, required: true, trim: true, maxlength: 30 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    sku: { type: String, trim: true, maxlength: 30 },
  },
  { _id: false }
);

const recipeIngredientSchema = new Schema<RecipeIngredient>(
  {
    inventoryId: { type: Schema.Types.ObjectId, ref: "Inventory", required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Menu item name must not exceed 100 characters."],
    },
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    outletId: {
      type: Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },
    unit: { type: String, required: true, trim: true, maxlength: 20 },
    quantity: { type: Number, required: true, min: 0 },
    threshold: { type: Number, default: 10, min: 0 },
    category: { type: String, trim: true, maxlength: 50 },
    imageUrl: { type: String, default: "" },
    variants: { type: [variantSchema], default: [] },
    recipe: { type: [recipeIngredientSchema], default: [] },
    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  { timestamps: true }
);

// Automatically update stock status
productSchema.pre("save", function (next) {
  const product = this as ProductDocument;
  if (product.quantity === 0) {
    product.status = "Out of Stock";
  } else if (product.quantity <= (product.threshold ?? 10)) {
    product.status = "Low Stock";
  } else {
    product.status = "In Stock";
  }
  next();
});

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;

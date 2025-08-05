import mongoose, { Document, Schema } from "mongoose";

export interface CustomerDocument extends Document {
  name: string;
  gender: string;
  phone?: string;
  spent: number;
  address: string;
  imageUrl?: string;
  orders: number;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<CustomerDocument>(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"],
      default: "",
    },
    spent: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    orders: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model<CustomerDocument>("Customer", customerSchema);
export default CustomerModel;

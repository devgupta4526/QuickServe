import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
  notes: String,
  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Card"],
    default: "Cash",
  },
  paymentProvider: String,
paymentReference: String,
  variants: [
    {
      name: String,
      price: Number,
    },
  ],
  addons: [
    {
      name: String,
      price: Number,
    },
  ],
});


const orderSchema = new mongoose.Schema(
  {
    outletId: { type: String, required: true },
    source: { type: String, enum: ["qr", "staff"], required: true },
    table: String,
    items: [orderItemSchema],
    customer: {
      name: String,
      phone: String,
      email: String,
      gender: String,
      address: String,
    },
    tax: { type: Number, default: 0 },
    charges: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Placed",
    },
    paymentId: String,
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card","InApp"],
      default: "Cash",
    },
    paymentProvider: String,
    paymentReference: String,
    estimatedDeliveryTime: String,
    staffNotes: String,
  },
  { timestamps: true }
);


export default mongoose.model("Order", orderSchema);

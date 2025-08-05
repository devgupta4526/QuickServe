import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  outletId: { type: String, required: true },
  tableNo: { type: String, required: true },
  seats: { type: Number, default: 4 },
  status: {
    type: String,
    enum: ["Available", "Booked"],
    default: "Available",
  },
  reservedBy: {
    customerId: String,
    name: String,
    phone: String,
  },
  reservedAt: Date,
}, { timestamps: true });

export default mongoose.model("Table", tableSchema);

// models/employee.model.ts

import mongoose, { Document, Schema } from "mongoose";

export interface EmployeeDocument extends Document {
  user?: mongoose.Types.ObjectId; // Optional link to User
  outlet: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  fullName: string;
  email?: string;
  phone?: string;
  position?: string; // Dynamic
  roles: mongoose.Types.ObjectId[];
  avatar?: string;
  status: "ACTIVE" | "SUSPENDED" | "TERMINATED";
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<EmployeeDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    outlet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"],
    },
    position: {
      type: String,
      trim: true,
      default: "", // Optional dynamic title like "Lead Barista", "Night Manager"
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
    ],
    avatar: {
      type: String,
      default: "https://cdn.quickserve360.com/avatar-default.png",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "TERMINATED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model<EmployeeDocument>("Employee", employeeSchema);
export default EmployeeModel;

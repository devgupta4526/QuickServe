import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
   role: "SUPER_ADMIN" | "BUSINESS_OWNER" | "EMPLOYEE";
  business?: mongoose.Types.ObjectId;
  outlet?: mongoose.Types.ObjectId | null;
  verified: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Omit<this, "password" | "refreshToken">;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long."],
      maxlength: [20, "Username must be at most 20 characters long."],
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Full name must be at least 2 characters long."],
      maxlength: [50, "Full name cannot exceed 50 characters."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long."],
    },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"],
      default: "",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio must not exceed 250 characters."],
      default: "",
    },
    avatar: {
      type: String,
      default: "https://cdn.quickserve360.com/avatar-default.png",
    },
    coverImage: {
      type: String,
      default: "https://cdn.quickserve360.com/cover-default.jpg",
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN",
        "BUSINESS_OWNER",
        "EMPLOYEE",],
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false,
    },
    outlet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlet",
      default: null,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashValue(this.password);
  return next();
});

// 🔍 Password comparison
userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

// 🔎 Omit sensitive data
userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  return user;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;

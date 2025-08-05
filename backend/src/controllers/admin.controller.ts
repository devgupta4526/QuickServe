import { RequestHandler } from "express";
import UserModel from "../models/user.model";
import { CREATED, OK, NOT_FOUND } from "../constants/http";
import appAssert from "../utils/appAssert";
import ApiResponse from "../utils/ApiResponse";
import { hashValue } from "../utils/bcrypt";

// ✅ List all users
export const listUsersHandler: RequestHandler = async (req, res) => {
  const users = await UserModel.find().select("-password -refreshToken");
  return res.status(OK).json(new ApiResponse(OK, users, "Users fetched"));
};

// ✅ Create a new user (by admin)
export const createUserHandler: RequestHandler = async (req, res) => {
  const { fullName, email, password, role, username, phone } = req.body;

  const existing = await UserModel.findOne({ email });
  appAssert(!existing, 409, "Email already exists");

  const hashedPassword = await hashValue(password);

  const user = await UserModel.create({
    fullName,
    email,
    password: hashedPassword,
    username,
    role,
    phone,
    verified: true, // assume verified when created by admin
  });

  return res.status(CREATED).json(new ApiResponse(CREATED, user.omitPassword(), "User created"));
};

// ✅ Update user role
export const updateUserRoleHandler: RequestHandler = async (req, res) => {
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(new ApiResponse(OK, user.omitPassword(), "Role updated"));
};

// ✅ Toggle active/inactive (optional: use a field like `active: boolean`)
export const toggleUserActiveHandler: RequestHandler = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  appAssert(user, NOT_FOUND, "User not found");

  user.verified = !user.verified;
  await user.save();

  return res.status(OK).json(new ApiResponse(OK, user.omitPassword(), "User status toggled"));
};

// ✅ Delete user
export const deleteUserHandler: RequestHandler = async (req, res) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json(new ApiResponse(OK, null, "User deleted"));
};

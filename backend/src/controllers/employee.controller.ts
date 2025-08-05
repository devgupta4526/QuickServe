// controllers/employee.controller.ts

import { RequestHandler } from "express";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import { createEmployeeSchema } from "../schema/employee.schema";
import EmployeeModel from "../models/employee.model";
import RoleModel from "../models/role.model";
import ApiResponse from "../utils/ApiResponse";
import { CREATED, BAD_REQUEST } from "../constants/http";

export const createEmployeeHandler: RequestHandler = catchErrors(async (req, res) => {
  const payload = createEmployeeSchema.parse(req.body);

  // 🛑 Optional: Validate role IDs exist
  const rolesExist = await RoleModel.find({
    _id: { $in: payload.roles },
    business: payload.business, // Ensure role is scoped to business
  });

  appAssert(
    rolesExist.length === payload.roles.length,
    BAD_REQUEST,
    "One or more roles are invalid or unauthorized"
  );

  const employee = await EmployeeModel.create(payload);

  return res
    .status(CREATED)
    .json(new ApiResponse(CREATED, employee, "Employee created successfully"));
});


// In employee.controller.ts
export const listEmployeesHandler: RequestHandler = catchErrors(async (req, res) => {
  const employees = await EmployeeModel.find()
    .populate("user", "fullName email")
    .populate("outlet", "name")
    .populate("roles", "name");

  return res.status(200).json(new ApiResponse(200, employees, "Employees fetched"));
});

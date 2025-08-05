// middleware/authorizeEntityAccess.ts

import { RequestHandler } from "express";
import UserModel from "../models/user.model";
import EmployeeModel from "../models/employee.model";
import OutletModel from "../models/outlet.model";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

const authorizeEntityAccess = ({
  outletCheck = true,
  businessCheck = true,
} = {}): RequestHandler =>
  catchErrors(async (req, res, next) => {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select("role business");
    appAssert(user, UNAUTHORIZED, "User not found", AppErrorCode.InvalidUser);

    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    console.log("req.query", req.query);

    const isSuperAdmin = user.role === "SUPER_ADMIN";
    const isBusinessOwner = user.role === "BUSINESS_OWNER";

    console.log("user role:", user.role);
    console.log("isSuperAdmin:", isSuperAdmin);
    console.log("isBusinessOwner", isBusinessOwner);

    let currentBusiness = user.business;
    let currentOutlet = null;

    if (user.role === "EMPLOYEE") {
      const employee = await EmployeeModel.findOne({ user: userId }).select("business outlet");
      console.log("employee:", employee);
      appAssert(employee, UNAUTHORIZED, "Employee context not found", AppErrorCode.Forbidden);
      currentBusiness = employee.business;
      currentOutlet = employee.outlet;
    }

    // 🔒 Business-level access check
    if (businessCheck) {
      const resourceBusinessId =
        req.params.businessId ||
        req.body.businessId ||
        req.query.businessId;

      console.log("resourcebusinessid", resourceBusinessId);
      appAssert(resourceBusinessId, UNAUTHORIZED, "Business ID is required", AppErrorCode.Forbidden);
      console.log("Comparing business IDs:");
      console.log("From user (currentBusiness):", currentBusiness?.toString?.());
      console.log("From request (resourceBusinessId):", String(resourceBusinessId));

      if (!isSuperAdmin) {
        appAssert(
          currentBusiness?.toString?.() === String(resourceBusinessId),
          UNAUTHORIZED,
          "Business access denied",
          AppErrorCode.Forbidden
        );
      }
    }

    // 🔒 Outlet-level access check
    if (outletCheck) {
      const resourceOutletId =
        req.params.outletId ||
        req.body.outletId ||
        req.query.outletId;

      console.log("outletId", resourceOutletId);
      appAssert(resourceOutletId, UNAUTHORIZED, "Outlet ID is required", AppErrorCode.Forbidden);

      if (!isSuperAdmin) {
        const outlet = await OutletModel.findById(resourceOutletId).select("business");
        appAssert(outlet, UNAUTHORIZED, "Outlet not found", AppErrorCode.Forbidden);

        // Owner can access any outlet of their business
        if (isBusinessOwner) {
          appAssert(
            outlet.business?.toString() === currentBusiness?.toString(),
            UNAUTHORIZED,
            "Outlet access denied",
            AppErrorCode.Forbidden
          );
        }

        // Employee must be tied to the exact outlet
        if (user.role === "EMPLOYEE") {
          appAssert(
            currentOutlet?.toString() === resourceOutletId,
            UNAUTHORIZED,
            "Outlet access denied for employee",
            AppErrorCode.Forbidden
          );
        }
      }
    }

    next();
  });

export default authorizeEntityAccess;

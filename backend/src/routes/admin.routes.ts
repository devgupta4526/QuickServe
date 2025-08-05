import { Router } from "express";
import {
  listUsersHandler,
  createUserHandler,
  updateUserRoleHandler,
  toggleUserActiveHandler,
  deleteUserHandler,
} from "../controllers/admin.controller";

const adminRoutes = Router();

// prefix: /admin

adminRoutes.get("/users", listUsersHandler); // GET /admin/users
adminRoutes.post("/users", createUserHandler); // POST /admin/users
adminRoutes.patch("/users/:id/role", updateUserRoleHandler); // PATCH /admin/users/:id/role
adminRoutes.patch("/users/:id/active", toggleUserActiveHandler); // PATCH /admin/users/:id/active
adminRoutes.delete("/users/:id", deleteUserHandler); // DELETE /admin/users/:id

export default adminRoutes;

import express from "express";
import { createEmployeeHandler, listEmployeesHandler } from "../controllers/employee.controller";
import authenticate from "../middleware/authenticate";


const employeeRouter = express.Router();

employeeRouter.post("/", authenticate, createEmployeeHandler);
employeeRouter.get("/", authenticate, listEmployeesHandler);

export default employeeRouter;
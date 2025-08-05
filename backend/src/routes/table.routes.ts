import { Router } from "express";
import { createTableHandler, getTablesHandler, makeTableAvailableHandler, reserveTableHandler } from "../controllers/table.controller";

const tableRouter = Router();

tableRouter.get("/:outletId", getTablesHandler);
tableRouter.post("/", createTableHandler);  
tableRouter.post("/:tableId/reserve", reserveTableHandler);
tableRouter.post("/:tableId/available", makeTableAvailableHandler);


export default tableRouter;

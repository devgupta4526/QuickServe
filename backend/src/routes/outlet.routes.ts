// src/routes/outlet.routes.ts
import express from "express";
import {
    createOutlet,
    createMultipleOutlets,
    getBusinessOutlets,
} from "../controllers/outlet.controller";

const outletRouter = express.Router();

outletRouter.post("/", createOutlet); // POST /outlets
outletRouter.post("/bulk", createMultipleOutlets); // POST /outlets/bulk
outletRouter.get("/:businessId", getBusinessOutlets); // GET /outlets/:businessId

export default outletRouter;

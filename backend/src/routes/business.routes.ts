import express from "express";
import { createBusinessHandler, getBusinessHandler } from "../controllers/business.controller";
import multer from "multer";
import authenticate from "../middleware/authenticate";
import upload from "../middleware/multer.middleware";

const businessRouter = express.Router();

businessRouter.post(
  "/create",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  createBusinessHandler
);

businessRouter.get("/me", getBusinessHandler);

export default businessRouter;

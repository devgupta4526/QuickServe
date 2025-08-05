import { Router } from "express";
import {
  sendPasswordResetHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} from "../controllers/auth.controller";
import upload from "../middleware/multer.middleware";

const authRoutes = Router();

// prefix: /auth
authRoutes.post("/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]), registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResetHandler);
authRoutes.post("/password/reset", resetPasswordHandler);

export default authRoutes;

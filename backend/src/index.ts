import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import errorHandler from "./middleware/errorHandler";
import authenticate from "./middleware/authenticate";
import authorizeRoles from "./middleware/authorizeRoles";
import authorizeEntityAccess from "./middleware/authorizeEntityAccess";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import employeeRoutes from "./routes/employee.routes";
import businessRoutes from "./routes/business.routes";
import outletRoutes from "./routes/outlet.routes";
import menuRoutes from "./routes/menu.routes";
import productRoutes from "./routes/product.routes";
import customerRoutes from "./routes/customer.routes";
import orderRoutes from "./routes/order.routes";
import inventoryRoutes from "./routes/inventory.routes";
import tableRoutes from "./routes/table.routes";
import adminRoutes from "./routes/admin.routes";

import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";

const app = express();

// global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

// health check
app.get("/", (_, res) => res.status(200).json({ status: "healthy" }));

// ------------------
// ⚙️ PUBLIC ROUTES
// ------------------
app.use("/auth", authRoutes);

// ------------------
// 🔐 AUTHENTICATED ROUTES
// ------------------
app.use("/sessions", authenticate, sessionRoutes);
app.use("/user", authenticate, userRoutes);

// ------------------
// 🧑‍💼 ADMIN-ONLY ROUTES (UserModel-based)
// ------------------
app.use("/admin", authenticate, authorizeRoles("SUPER_ADMIN", "BUSINESS_OWNER"), adminRoutes);
app.use("/business", authenticate, authorizeRoles("SUPER_ADMIN", "BUSINESS_OWNER"), businessRoutes);
app.use("/outlets", authenticate, authorizeRoles("SUPER_ADMIN", "BUSINESS_OWNER"), outletRoutes);
app.use("/employees", authenticate, authorizeRoles("SUPER_ADMIN", "BUSINESS_OWNER"), employeeRoutes);

// ------------------
// 👨‍🍳 EMPLOYEE & ADMIN SHARED ROUTES
// ------------------

// these check whether the user (employee or owner) belongs to outlet/business
app.use("/menu", authenticate, menuRoutes);
app.use("/products", authenticate, authorizeEntityAccess({ outletCheck: true }), productRoutes);
app.use("/orders", authenticate, authorizeEntityAccess({ outletCheck: true }), orderRoutes);
app.use("/inventory", authenticate, authorizeEntityAccess({ outletCheck: true }), inventoryRoutes);
app.use("/customers", authenticate, authorizeEntityAccess({ outletCheck: true }), customerRoutes);
app.use("/tables", authenticate, authorizeEntityAccess({ outletCheck: true }), tableRoutes);

// ------------------
// 🛑 ERROR HANDLER
// ------------------
app.use(errorHandler);

// ------------------
// 🚀 SERVER INIT
// ------------------
app.listen(PORT, async () => {
  console.log(`✅ Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});

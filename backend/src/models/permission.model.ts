// models/permission.model.ts
import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'MENU_VIEW'
  description: String,
});

export default mongoose.model("Permission", permissionSchema);

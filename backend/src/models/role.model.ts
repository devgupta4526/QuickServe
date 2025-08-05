import mongoose from "mongoose";


const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  outlet: { type: mongoose.Schema.Types.ObjectId, ref: "Outlet" }, // optional
});

export default mongoose.model("Role", roleSchema);

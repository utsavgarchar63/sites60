import mongoose from "mongoose";
const aiLogSchema = new mongoose.Schema({
  website_key: {
    type:  String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timeTaken: { type: String },
  timeLog: { type: Object },
  is_del: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },

  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

export default mongoose.models.AiLog || mongoose.model("AiLog", aiLogSchema);

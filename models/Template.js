import mongoose from "mongoose";

const templatesSchema = new mongoose.Schema({
  
  key: { type: String, required: true, unique: true },
  status: { type: String, default: "published" }, // coming_soon
  title: { type: String },
  description: { type: String },
  thumbnail: { type: String },
  category: { type: String, default: "" },
  sections: { type: String, default: "" },
  color: {
    type: String,
  },
  font: {
    type: String,
    default: "Raleway",
  },

  is_del: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },

  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

export default mongoose.models.Template ||
  mongoose.model("Template", templatesSchema);

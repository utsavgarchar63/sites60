import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  smartsite_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Smartsite",
    required: true,
  },

  name: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },

  is_del: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },

  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);




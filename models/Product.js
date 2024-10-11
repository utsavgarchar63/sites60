import mongoose from "mongoose";
const prodSchema = new mongoose.Schema({
  stripe_product_id: { type: String },
  description: { type: String },
  name: { type: String },
  price: { type: String },
  short_code: { type: String },
  currency: { type: String },
  frequency: { type: String },
  is_del: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },

  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

export default mongoose.models.Product || mongoose.model("Product", prodSchema);

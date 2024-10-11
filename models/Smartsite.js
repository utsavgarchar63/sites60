import mongoose from "mongoose";

const SmartsiteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  key: { type: String, required: true, unique: true },
  siteKey: { type: String, required: true, unique: true },
  status: { type: String, default: "unpublished" },
  title: { type: String },
  company: { type: String },
  template_html: { type: String },
  templateThumbnail: {
    type: String,
    default: "https://www.svgrepo.com/show/431189/pic.svg",
  },
  category: { type: String },
  description: { type: String },
  promo_code: { type: String },
  subscription_start: { type: Date }, //paid subscription
  subscription_end: { type: Date }, //paid subscription
  thumbnail: {
    type: String,
    // default: "https://www.svgrepo.com/show/431189/pic.svg",
  },
  favicon: { type: String, default: "" },
  domain: { type: String },
  sections: { type: String, default: "" },
  color: {
    type: String,
  },
  primaryColor: {
    type: String,
  },
  secondaryColor: {
    type: String,
  },
  tertiaryColor: {
    type: String,
  },
  font: {
    type: String,
    default: "Raleway",
  },
  last_updated: [{ type: Date }],

  is_del: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },

  is_paid: { type: Boolean, default: false },
  stripe_cust_id: { type: String },
  plan_id: { type: String, default: "free" },
  trial_expires: {
    type: Date,
    default: () => Date.now() + 14 * 24 * 60 * 60 * 1000, // add 14 days to current date
  },

  link_domain: { type: String },
  ip_address: { type: String },

  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

export default mongoose.models.Smartsite ||
  mongoose.model("Smartsite", SmartsiteSchema);

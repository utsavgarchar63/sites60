import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  uid: { type: String, minlength: 6, unique: true },
  first_name: { type: String, trim: true, minlength: 3 },
  last_name: { type: String, trim: true, minlength: 1 },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    sparse: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/,
      "Please enter a valid email address",
    ],
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
  },
  mobile_country: { type: String },
  password: { type: String, minlength: 6 },
  pic: { type: String },
  role: { type: String, default: "owner" }, // owner or member

  brand_name: { type: String },
  brand_category: { type: String },
  brand_pic: { type: String },
  belief: { type: String },
  brand_other :{ type: String },
  verification_key: { type: String, unique: true },
  verification_expires: { type: Date },

  signup_from: { type: String, default: "form" }, // form google facebook instagram
  country: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  profile_pic: { type: String },
  access_revoke: { type: Boolean, default: false },

  is_del: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});



export default mongoose.models.User || mongoose.model('User', UserSchema)
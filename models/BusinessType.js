import mongoose from 'mongoose'

 const BusinessTypeSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  is_del: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

export default mongoose.models.BusinessType ||
  mongoose.model("BusinessType", BusinessTypeSchema);
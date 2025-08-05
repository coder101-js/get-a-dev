import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 30 },
}, { timestamps: false });

export default mongoose.models.Reviews || mongoose.model('Reviews', reviewSchema);

import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true },
  Name: { type: String, required: true },
  ImageURL: { type: String, default: '' },
  Skills: { type: String, required: true },
  Role: { type: String, required: true },
  Projects: { type: String, required: true },
  Portfolio: { type: String, required: true },
  Price: { type: String, required: true },
  Contact_Details: { type: String, required: true },
});

export default mongoose.models.Profile || mongoose.model('Profile', profileSchema);

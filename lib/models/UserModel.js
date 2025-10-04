import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Hashed for credentials provider
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Fields for Google OAuth
  image: String, // Optional: Profile picture from Google
  emailVerified: Date, // Optional: For OAuth verification
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
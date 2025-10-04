import { connectDB } from '@/lib/config/db';
import UserModel from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return Response.json({ success: false, message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });
    await user.save();

    return Response.json({ success: true, message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
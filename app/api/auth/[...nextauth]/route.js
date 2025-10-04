import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectDB } from '@/lib/config/db';
import UserModel from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';

export const authOptions = {
  adapter: MongoDBAdapter({
    async db() {
      await connectDB();
      return mongoose.connection.db;
    },
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await UserModel.findOne({ email: credentials.email });

        // Hardcoded admin check
        if (credentials.email === 'admin@gmail.com' && credentials.password === 'admin123') {
          if (!user) {
            // Create admin user if it doesn't exist
            const hashedPassword = await bcrypt.hash('admin123', 12);
            const adminUser = new UserModel({
              name: 'Admin',
              email: 'admin@gmail.com',
              password: hashedPassword,
              role: 'admin',
            });
            await adminUser.save();
            return { id: adminUser._id, email: adminUser.email, name: adminUser.name, role: adminUser.role };
          }
          return { id: user._id, email: user.email, name: user.name, role: user.role };
        }

        // Regular user password check
        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }
        return { id: user._id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
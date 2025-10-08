'use client';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { assets } from '@/Assets/assets';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect after session is updated
  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirect
      email,
      password,
    });
    if (result?.ok) {
      toast.success('Signed in successfully');
      // Session will be updated, and useEffect will handle redirect
    } else {
      toast.error(result?.error || 'Login failed');
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { redirect: false });
    // Session update will trigger useEffect for redirect
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Link href={"/"} className="flex items-center justify-center">
          <Image src={assets.logo1} alt="logo" width={150} height={50} className="w-[130px] sm:w-auto" />
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-black">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#f7a900] focus:border-[#f7a900] sm:text-sm"
              placeholder="Email address"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#f7a900] focus:border-[#f7a900] sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f7a900] hover:bg-[#e69500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f7a900]"
          >
            Sign in
          </button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-gray-50">Or continue with</span>
          </div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f7a900]"
        >
          Sign in with Google
        </button>
        <div className="text-center">
          <a href="/auth/signup" className="font-medium text-[#f7a900] hover:text-[#e69500]">
            Create a new account
          </a>
        </div>
      </div>
    </div>
  );
}


/*'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      toast.success('Signed in successfully');
      router.push('/'); // Redirect to home
    } else {
      toast.error(result?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2c3966]">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#f7a900] focus:border-[#f7a900] sm:text-sm"
              placeholder="Email address"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#f7a900] focus:border-[#f7a900] sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f7a900] hover:bg-[#e69500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f7a900]"
          >
            Sign in
          </button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-gray-50">Or continue with</span>
          </div>
        </div>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f7a900]"
        >
          Sign in with Google
        </button>
        <div className="text-center">
          <a href="/auth/signup" className="font-medium text-[#f7a900] hover:text-[#e69500]">
            Create a new account
          </a>
        </div>
      </div>
    </div>
  );
}*/
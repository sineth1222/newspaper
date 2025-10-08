/*"üse client";

import { assets } from '@/Assets/assets'
import React, { useState } from 'react'
import Image from "next/image";
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import BusinessNewsTicker from './BussnesTicket';


// Simple SVG component for hamburger menu icon
const HamburgerIcon = ({ isOpen }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {isOpen ? (
      // X icon for close (when menu is open)
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </>
    ) : (
      // Hamburger lines for open menu
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </>
    )}
  </svg>
);

const Header = () => {

  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility
  const { data: session } = useSession();

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const res = await axios.post("/api/email", formData);
    if(res.data.success){
      toast.success("Email Subcribed")
      setEmail("");
    }
    else{
      toast.error("Something went wrong")
      //console.log(res);
    }
  }


  return (
    <div className='px-5 py-5 md:px-12 lg:px-28 '>
        <div className='flex items-center justify-between'>
            <Image src={assets.logo1} alt="logo" width={150} height={50} className='w-[130px] sm:w-auto'/>
            {/*<Link href='auth/signin' className='flex items-center gap-2 font-medium py-1 px-2 sm:px-6 active:bg-gray-600 active:text-white border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-2xl'>Get Started <Image src={assets.arrow}/></Link>/}
            {/* Menu Button for Mobile View /}
            <button
              className="flex items-center justify-center p-2 md:hidden" // Visible only on mobile (hidden on md and above)
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>

            {/* Session Buttons (Hidden on Mobile by Default, Shown on Click) /}
            <div
              className={`${
                isMenuOpen ? 'flex' : 'hidden'
              } md:flex items-center gap-4 absolute md:static top-16 right-5 bg-white md:bg-transparent p-4 md:p-0 rounded-md shadow-md md:shadow-none`} // Conditional styling for mobile
            >
            {session ? (
              <>
                <span className="font-medium text-[#0002086a]">{session.user.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  className="flex items-center gap-2 font-medium py-1 px-1 sm:px-6  border border-black shadow-[-7px_7px_0px_#000000] hover:shadow-2xl active:bg-gray-600" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
                >
                  ඉවත්වන්න <Image src={assets.arrow} alt=''/>
                </button>
              </>
            ) : (
              <Link href="/auth/signin">
                <button className="flex items-center gap-2 font-medium py-1 px-2 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] hover:shadow-2xl active:bg-gray-600" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
                  ආරම්බ කරන්න <Image src={assets.arrow} alt=''/>
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className='my-8 text-center'>
            <h1 className='text-2xl font-semibold sm:text-5xl' style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>සිරස් තල</h1>
            <BusinessNewsTicker />
            <p className='mt-10 max-w-[740px] m-auto text-base sm:text-lg' style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>"පත්තරේ, විශ්වසනීය තොරතුරු, ඔබේ ලෝකයට එක්වන්න!"</p>
            <form onSubmit={onSubmitHandler} className='flex justify-between h-10 max-w-[500px] scale-75 sm:scale-100 mx-auto  mt-10 border border-black  shadow-2xl rounded-xl hover:shadow-2xl' action="">
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='ඔබගේ විද්‍යුත් තැපෑල ඇතුළත් කරන්න ' className="flex-1 min-w-0 pl-4 font-sans text-base outline-none" // Added flex-1 and min-w-0
                  style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}/>
                {/*<button className='px-4 py-4 text-black bg-red-100 border-l border-black rounded-xl sm:px-8 active:bg-gray-600 active:text-white hover:bg-black hover:text-white hover:rounded-xl'>Subcribe</button>/}
                <button type='submit' className='px-6 text-white bg-black border-0 rounded-xl sm:px-8 active:bg-gray-600 active:text-white hover:bg-white hover:text-black hover:rounded-xl'>Subcribe</button>
            </form>
        </div>   
         
    </div>
  )
}

export default Header*/


"use client";

import { assets } from '@/Assets/assets';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import BusinessNewsTicker from './BussnesTicket';
import { FaArrowRight } from 'react-icons/fa';

const Header = () => {
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle menu visibility
  const { data: session } = useSession();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    const res = await axios.post('/api/email', formData);
    if (res.data.success) {
      toast.success('Email Subscribed');
      setEmail('');
    } else {
      toast.error('Something went wrong');
    }
  };

  // Hamburger button with Tailwind
  const HamburgerButton = () => (
    <button
      className="z-20 flex flex-col items-center justify-center w-16 h-16 space-y-1 md:hidden"
      onClick={() => {
        console.log("Toggling menu"); // Debug log
        setIsMenuOpen(!isMenuOpen);
      }}
      aria-label="Toggle menu"
    >
      <span className="block w-6 h-0.5 bg-black transition-transform" />
      <span className="block w-6 h-0.5 bg-black" />
      <span className="block w-6 h-0.5 bg-black transition-transform" />
    </button>
  );

  return (
    <div className="relative px-5 py-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <Image src={assets.logo1} alt="logo" width={150} height={50} className="w-[130px] sm:w-auto" />
        
        {/* Menu Button */}
        <HamburgerButton />

        {/* Menu Dropdown (Mobile) and Inline Buttons (Desktop) */}
        <div
          className={`
            ${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-4
            absolute md:static top-16 right-5 z-20 bg-white md:bg-transparent p-4 md:p-0 rounded-md shadow-md md:shadow-none 
          `}
        >
          {isMenuOpen ? (
            // Mobile View: Comment + Buttons
            <div className="flex flex-col gap-4 w-full max-w-[300px]">
              <div className="p-4 text-center bg-gray-100 border border-gray-300 rounded-lg">
                <p className="text-sm" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
                  ආයුබෝවන්! ඔබේ තේරීම තෝරන්න.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {session ? (
                  <>
                    <div className="p-2 border border-gray-200 rounded-md bg-gray-50">
                      <span className="font-medium text-[#0002086a]">{session.user.name}</span>
                    </div>
                    <div className="p-2 border border-gray-200 rounded-md bg-gray-50">
                      <button
                        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                        className="flex items-center gap-2 font-medium w-full justify-center py-1 px-2 border border-black shadow-[-3px_3px_0px_#000000] hover:shadow-md active:bg-gray-600"
                        style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
                      >
                        ඉවතලන්න <Image src={assets.arrow} alt="" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">
                    <Link href="/auth/signin">
                      <button
                        className="flex items-center gap-2 font-medium w-full justify-center py-1 px-2 border border-black shadow-[-3px_3px_0px_#000000] hover:shadow-md active:bg-gray-600"
                        style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
                      >
                        ආරම්බ කරන්න <Image src={assets.arrow} alt="" />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Desktop View: Direct Buttons (no comment)
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <span className="font-medium text-[#0002086a]">{session.user.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                    className="flex items-center gap-2 font-medium py-1 px-1 sm:px-6 rounded-2xl bg-red-500 text-white shadow-[-7px_7px_0px_#FAA6A7] hover:shadow-2xl active:bg-gray-600"
                    style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
                  >
                    ඉවතලන්න <FaArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <Link href="/auth/signin">
                  <button
                    className="flex items-center gap-2 font-medium py-2 px-2 sm:px-6 rounded-2xl bg-red-500 text-white shadow-[-7px_7px_17px_#FAA6A7] hover:shadow-2xl active:bg-gray-600"
                    style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
                  >
                    ආරම්බ කරන්න <FaArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="my-8 text-center">
        {/*<h1 className="text-2xl font-semibold sm:text-5xl" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
          සිරස් තල
        </h1>*/}
        <BusinessNewsTicker />
        <p className="mt-10 max-w-[740px] m-auto text-base sm:text-lg" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
          " පත්තරේ, වෙබ් අඩවි යනු ශ්‍රී ලංකාවේ සිංහල භාෂාව කතා කරන බහුතර ජනතාවට සහ විදෙස්ගත සිංහල ජනතාවට සිංහල අකුරු භාවිතයෙන් පුවත් ලබා දෙන ඩිජිටල් වේදිකාවන් ය. මෙම අඩවි දේශීය දේශපාලනය, ජාත්‍යන්තර සිදුවීම්, ක්‍රීඩා, විනෝදාස්වාදය, සංස්කෘතිය ආදී විවිධ මාතෘකා ආවරණය කරමින් තත්කාලීන තොරතුරු සපයයි. "
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between h-10 max-w-[600px] scale-100 sm:scale-100 mx-auto mt-10 border border-black shadow-2xl rounded-xl hover:shadow-2xl"
          action=""
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="ඔබගේ විද්‍යුත් තැපෑල ඇතුළත් කරන්න"
            className="flex-1 min-w-0 pl-4 font-sans text-sm outline-none"
            style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
          />
          <button
            type="submit"
            className="px-6 text-white bg-black border-0 rounded-xl sm:px-8 active:bg-gray-600 active:text-white hover:bg-white hover:text-black hover:rounded-xl"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
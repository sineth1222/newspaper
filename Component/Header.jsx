"üse client";

import { assets } from '@/Assets/assets'
import React, { useState } from 'react'
import Image from "next/image";
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import BusinessNewsTicker from './BussnesTicket';

const Header = () => {

  const [email, setEmail] = useState("");

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
            {/*<Link href='auth/signin' className='flex items-center gap-2 font-medium py-1 px-2 sm:px-6 active:bg-gray-600 active:text-white border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-2xl'>Get Started <Image src={assets.arrow}/></Link>*/}
            <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="font-medium text-[#0002086a]">{session.user.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  className="flex items-center gap-2 font-medium py-1 px-2 sm:px-6  border border-black shadow-[-7px_7px_0px_#000000] hover:shadow-2xl active:bg-gray-600" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
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
            <h1 className='text-3xl font-semibold sm:text-5xl' style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>ප්‍රධාන පුවත්</h1>
            <BusinessNewsTicker />
            <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>දෙස් විදෙස් ප්‍රමුඛතම පුවත් සන්නාමය පත්තරේ , පත්තරේ වෙබ් අඩවියේ ශීර්ෂය ලස්සන සිංහල අකුරු සහිත ලාංඡනයකින් හා සරල මෙනුවකින් යුක්තයි. උණුසුම් වර්ණ හා පැහැදිලි බව එක්ව, පුවත් හා තොරතුරු වෙත ආදරයෙන් මඟ පෙන්වයි. පත්තරේ
 සමග එක් වී දෙස් විදෙස් සියලූම පුවත් පහසුවෙන් දැනගන්න .</p>
            <form onSubmit={onSubmitHandler} className='flex justify-between h-10 max-w-[500px] scale-75 sm:scale-100 mx-auto  mt-10 border border-black  shadow-2xl rounded-xl hover:shadow-2xl' action="">
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='ඔබගේ විද්‍යුත් තැපෑල ඇතුළත් කරන්න ' className="flex-1 min-w-0 pl-4 font-sans text-base outline-none" // Added flex-1 and min-w-0
                  style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}/>
                {/*<button className='px-4 py-4 text-black bg-red-100 border-l border-black rounded-xl sm:px-8 active:bg-gray-600 active:text-white hover:bg-black hover:text-white hover:rounded-xl'>Subcribe</button>*/}
                <button type='submit' className='px-4 text-white bg-black border-0 rounded-xl sm:px-8 active:bg-gray-600 active:text-white hover:bg-white hover:text-black hover:rounded-xl'>Subcribe</button>
            </form>
        </div>   
         
    </div>
  )
}

export default Header

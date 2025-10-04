import { assets } from '@/Assets/assets'
import React from 'react'
import Image from "next/image";

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-around gap-2 py-5 bg-black sm:flex-row sm:gap-0'>
      <Image src={assets.logo2} alt="logo" width={120} />
      <p className='text-sm text-white'>© 2025 PraDha (PVT) LTD. All Rights Reserved.</p>
        <div className='flex'>
            <Image src={assets.facebook_icon} alt="facebook" width={40} />  
            <Image src={assets.twitter_icon} alt="twiter" width={40} />  
            <Image src={assets.googleplus_icon} alt="google" width={40} />  
        </div>
    </div>
  )
}

export default Footer

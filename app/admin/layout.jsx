"use client";
//import Sidebar from "@/Component/AdminComponnet/sidebar";

import { assets } from "@/Assets/assets";
import Sidebar from "@/Component/AdminComponnet/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }) {
    return (
      <>
        <div className="flex">
            <SessionProvider>
              <ToastContainer theme="light" />
              <Sidebar />
              <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                      <h3 className="font-medium">Admin Panel</h3>
                      <Image src={assets.profile_icon} alt="adminProfile" width={40}  />
                  </div>
                  {children}
              </div>
            </SessionProvider>
        </div>
      </>
    )
  }
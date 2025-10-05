/*'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Component/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'

const page = ({params}) => {
    const { id } = use(params);

    const [data,setData] = useState(null);

    /*const fetchBlogData = async () => {
        const response = await axios.get('/api/blog',{
            params: { id }
        });
        //const response = await axios.get(`/api/blog?id=${params.id}`);
        console.log(response.data);
        setData(response.data);
    }/

        
    const fetchBlogData = async () => {
        try {
        const response = await axios.get("/api/blog", {
            params: { id },
        });
        console.log(response.data);
        setData(response.data);
        } catch (error) {
        console.error("Error fetching blog data:", error);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, [])

    /*if(!data){
        return <div>Loading...</div>
    }/
  return (data?<>
    <div className='px-5 py-5 bg-gray-200 md:px-12 lg:px-28'>
        <div className='flex items-center justify-between'>
            <Link href={"/"}>
            <Image src={assets.logo1} alt="blog" width={180} className='w-[130px] sm:w-auto'/>
            </Link>
            {/*<button className='flex items-center gap-2 font-medium py-1 px-3 sm:px-6 sm:py-3 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} alt=''/></button>/}
        </div>  
        <div className='my-24 text-center'>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data?.blog?.title}</h1>
            <Image src={data?.blog?.authorImg} alt="blog" width={60} height={60} className='mx-auto mt-6 border border-white rounded-full'/>
            <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data?.blog?.author}</p>
        </div>   
    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image src={data?.blog?.image} alt="blog" width={1280} height={720} className='border-4 border-white'/>
        {/*<h1 className='my-8 text-[26px] font-semibold'>Introduction</h1>
        <p>{data?.blog?.description}</p>/}
        <div className='blog-content' dangerouslySetInnerHTML={{__html:data?.blog?.description}}></div>
        {/*<h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Reflection and Goal Setting</h3>
        <p className='my-3'>sdfdfgf fdgfhg dsdgd xdsdfgf svfgfg cdffggf dgfgh bgfbgffvfdgcdv csddff cdfd f  f</p>
        <p className='my-3'>Take time to gather information, explore resources, and create a roadmap for your goals. Planning ahead increases your chances of success and helps you stay organized.</p>
        <h3 className='my-5 text-[18px] font-semibold'>Step 2: Research and Planning</h3>
        <p className='my-3'>Take time to gather information, explore resources, and create a roadmap for your goals. Planning ahead increases your chances of success and helps you stay organized.</p>
        <p className='my-3'>Take time to gather information, explore resources, and create a roadmap for your goals. Planning ahead increases your chances of success and helps you stay organized.</p>
        <h3 className='my-5 text-[18px] font-semibold'>Step 3: Execution and Review</h3>
        <p className='my-3'>Put your plan into action, monitor your progress, and make adjustments as needed. Regularly reviewing your steps ensures continuous improvement and achievement.</p>
        <p className='my-3'>Take time to gather information, explore resources, and create a roadmap for your goals. Planning ahead increases your chances of success and helps you stay organized.</p>/}
        <div className='my-24'>
            <p className='my-4 font-semibold text-black font'>Share this article in social media</p>
            <div className='flex'>
                <Image src={assets.facebook_icon} alt="facebook" width={50} />
                <Image src={assets.twitter_icon} alt="twitter" width={50} />
                <Image src={assets.googleplus_icon} alt="google" width={50} />
            </div>
        </div>
    </div>
    <Footer/>
    </>:<div className='flex justify-center items-center h-[80vh]'>Loading...</div>
  )
}

export default page*/




"use client";

import { assets } from "@/Assets/assets";
import Footer from "@/Component/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useSession, signOut } from 'next-auth/react';

const Page = ({ params }) => {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [blogIds, setBlogIds] = useState([]); // Store sorted blog IDs
  const [currentIndex, setCurrentIndex] = useState(-1); // Current blog's index in the list
  const { data: session } = useSession();

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: { id },
      });
      setData(response.data);

      // Fetch all blogs for the "Local" category, sorted by createdAt
      const allBlogsResponse = await axios.get("/api/blog");
      const localBlogs = allBlogsResponse.data.blogs
        .filter((item) => item.category)
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest first
        .map((blog) => blog._id); // Extract IDs
      setBlogIds(localBlogs);

      // Find the index of the current blog
      const index = localBlogs.indexOf(id);
      setCurrentIndex(index);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]); // Re-run when `id` changes

  // Determine previous and next blog IDs
  const prevBlogId = currentIndex > 0 ? blogIds[currentIndex - 1] : null;
  const nextBlogId =
    currentIndex >= 0 && currentIndex < blogIds.length - 1
      ? blogIds[currentIndex + 1]
      : null;

  return data ? (
    <>
      <div className="px-5 py-5 bg-gray-200 md:px-12 lg:px-28">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={assets.logo1}
              alt="blog"
              width={180}
              className="w-[130px] sm:w-auto"
            />
          </Link>
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
        <div className="my-24 text-center">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data?.blog?.title}
          </h1>
          <Image
            src={data?.blog?.authorImg}
            alt="author"
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data?.blog?.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data?.blog?.image}
          alt="blog"
          width={1280}
          height={720}
          className="border-4 border-white"
        />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data?.blog?.description }}
        ></div>
        <div className="my-24">
          <p className="my-4 font-semibold text-black">Share this article on social media</p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="facebook" width={50} />
            <Image src={assets.twitter_icon} alt="twitter" width={50} />
            <Image src={assets.googleplus_icon} alt="google" width={50} />
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <div>
            {prevBlogId && (
              <Link href={`/blogs/${prevBlogId}`}>
                <button className="px-4 py-2 text-white transition-colors duration-200 bg-black rounded-full hover:bg-gray-700">
                  පෙර පුවත
                </button>
              </Link>
            )}
          </div>
          <div>
            {nextBlogId && (
              <Link href={`/blogs/${nextBlogId}`}>
                <button className="px-4 py-2 text-white transition-colors duration-200 bg-black rounded-full hover:bg-gray-700">
                  ඊලග පුවත
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div className="flex justify-center items-center h-[80vh]">Loading...</div>
  );
};

export default Page;
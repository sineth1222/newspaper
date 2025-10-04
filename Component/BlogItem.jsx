import { assets, blog_data } from '@/Assets/assets'
import React from 'react'
import Image from "next/image";
import Link from 'next/link';

const BlogItem = ({title,image,description,category,id,date}) => {

  // Map English category names to Sinhala
  const categoryMap = {
    All: 'සියල්ල',
    Politics: 'දේශපාලන',
    Sport: 'ක්‍රීඩා',
    International: 'ජාත්‍යන්තර',
    Other: 'වෙනත්',
  };

  // Get the Sinhala category name or fallback to the English name
  const displayCategory = categoryMap[category] || category;

  // Format the date to YYYY-MM-DD
  const formattedDate = date ? new Date(date).toLocaleDateString("si-LK", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).split('T')[0] : '12 Aug 2025';


  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] p-5'
    style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
    >
      <Link href={`/blogs/${id}`}>
      <Image src={image} alt="blog" width={400} height={400} className='max-h-[300px] border-b border-black'/>
      </Link>
      <p className='inline-block px-1 mt-5 ml-5 text-sm text-white bg-black'>{displayCategory}</p>
      <div>
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
        <p className='mb-2 text-sm tracking-tight text-gray-700'
        dangerouslySetInnerHTML={{__html:description.slice(0,120) + '...'}}
        ></p>
        <p className='mb-3 text-xs font-medium tracking-tight text-gray-500'>{formattedDate}</p>
        <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>
            තව කියවන්න <Image src={assets.arrow} alt="arrow" width={12} className='inline-block ml-2'/>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem;


/*"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogItem = ({ id, title, image, description, category, createdAt }) => {
  // Determine if the blog is "latest" (e.g., posted within the last 7 days)
  const isLatest = createdAt
    ? (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24) <= 7
    : false;

  return (
    <Link href={`/blog/${id}`} className="block w-full max-w-sm mx-auto">
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image /}
        <div className="relative w-full h-48">
          <Image
            src={image || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
            priority={isLatest}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
          {/* Latest Badge /}
          {isLatest && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              Latest
            </div>
          )}
        </div>
        {/* Content /}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500 uppercase">{category}</span>
            {createdAt && (
              <span className="text-xs text-gray-500">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;*/

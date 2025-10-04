"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const NewBlogItem = ({ id, title, image, description, category, createdAt, date }) => {
  // Determine if the blog is "latest" (posted within the last 7 days)
  const isLatest = createdAt
    ? (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24) <= 7
    : false;

    // Format the date to YYYY-MM-DD
  const formattedDate = date ? new Date(date).toLocaleDateString("si-LK", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).split('T')[0] : '12 Aug 2025';

  return (
    <Link href={`/blog/${id}`} className="block w-full">
      <div className="max-w-[330px] sm:max-w-[300px] mx-auto bg-white text-black bg-opacity-50 backdrop-blur-md rounded-xl overflow-hidden border border-black hover:border-gray-900 transition-all duration-300 hover:scale-105 p-5">
        {/* Image */}
        <div className="relative w-full h-48">
          <Image
            src={image || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, 400px"
            priority={isLatest}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
          {/* Latest Badge */}
          {isLatest && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              නවතම
            </div>
          )}
        </div>
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
          <p className="text-sm text- mt-2 line-clamp-2 text-gray-700"
          dangerouslySetInnerHTML={{__html:description.slice(0,120) + '...'}}></p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500 uppercase">දේශීය පුවත් - {formattedDate}</span>
            {createdAt && (
              <span className="text-xs text-gray-400">
                {new Date(createdAt).toLocaleDateString("si-LK", {
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

export default NewBlogItem;
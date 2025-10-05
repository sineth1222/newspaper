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
    <Link href={`/blogs/${id}`} className="block w-full">
      <div className="max-w-[330px] sm:max-w-[300px] mx-auto bg-white text-black bg-opacity-50 backdrop-blur-md rounded-xl overflow-hidden border border-black hover:border-gray-900 transition-all duration-300 hover:scale-105 p-5">
        {/* Image */}
        <div className="relative w-full h-48">
          <Image
            src={image || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300 opacity-90 hover:opacity-100"
            sizes="(max-width: 640px) 100vw, 400px"
            priority={isLatest}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
          {/* Latest Badge */}
          {isLatest && (
            <div className="absolute px-3 py-1 text-xs font-bold text-white rounded-full shadow-md top-3 left-3 bg-gradient-to-r from-red-500 to-pink-600">
              නවතම
            </div>
          )}
        </div>
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
          <p className="mt-2 text-sm text-gray-700 text- line-clamp-2"
          dangerouslySetInnerHTML={{__html:description.slice(0,120) + '...'}}></p>
          <div className="flex items-center justify-between mt-3">
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
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const BusinessNewsTicker = () => {
  const [businessNews, setBusinessNews] = useState([]);

  // Fetch Business news from the API
  const fetchBusinessNews = async () => {
    try {
      const response = await axios.get("/api/blog");
      const blogs = response.data.blogs;
      const businessBlogs = blogs
      .filter((blog) => blog.category )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
      setBusinessNews(businessBlogs);
    } catch (error) {
      console.error("Error fetching business news:", error);
    }
  };

  useEffect(() => {
    fetchBusinessNews();
  }, []);

  return (
    <div className="my-8">
      {/* Business Title 
      <h2 className="mb-4 text-2xl font-bold text-center">Business News</h2>*/}

      {/* Ticker Container */}
      <div className="relative py-1 overflow-hidden bg-gray-200">
        {/* News Label */}
        <div className="absolute top-0 left-0 z-10 px-4 py-1 text-xs font-medium text-white bg-[#f32f2ff9] rounded-sm">
          එසැණ පුවත් :
        </div>
        <div className="ticker-wrapper">
          {businessNews.length > 0 ? (
            <div className="ticker">
              {businessNews.map((news, index) => (
                <Link
                  href={`/blog/${news._id}`}
                  key={news._id}
                  className="inline-block mx-4 text-xs font-medium text-gray-800 ticker-item hover:underline"
                >
                  {news.title}
                </Link>
                /*<div
                  key={news._id}
                  className="inline-block mx-4 text-lg font-medium text-gray-800 ticker-item"
                >
                  {news.title}
                </div>*/
              ))}
              {/* Duplicate items for seamless looping */}
              {businessNews.map((news, index) => (
                <Link
                  href={`/blog/${news._id}`}
                  key={`duplicate-${news._id}`}
                  className="inline-block mx-4 text-xs font-medium text-gray-800 ticker-item hover:underline"
                >
                  {news.title}
                </Link>
                /*<div
                  key={`duplicate-${news._id}`}
                  className="inline-block mx-4 text-lg font-medium text-gray-800 ticker-item"
                >
                  {news.title}
                </div>*/
              ))}
            </div>
          ) : (
            <div className="text-xs text-center text-gray-500">
              No news available
            </div>
          )}
        </div>
      </div>

      {/* CSS for Ticker Animation */}
      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .ticker {
          display: flex;
          animation: ticker 20s linear infinite;
          white-space: nowrap;
        }
        .ticker-item {
          transition: transform 0.3s ease-in-out;
        }
        .ticker-item:hover {
          transform: translateY(-5px); /* Simulate vertical rotation effect */
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Move to left, half for seamless loop */
          }
        }
        /* Pause animation on hover */
        .ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BusinessNewsTicker;
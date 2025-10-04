/*"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BusinessBlogList = () => {
  const [businessBlogs, setBusinessBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of blogs per page

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      const businessBlogs = response.data.blogs.filter(
        (item) => item.category === "Business"
      );
      setBusinessBlogs(businessBlogs);
      console.log(businessBlogs);
    } catch (error) {
      console.error("Error fetching business blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Calculate total pages and the blogs to display on the current page
  const totalPages = Math.ceil(businessBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = businessBlogs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    }
  };

  return (
    <div>
      {/* Title /}
      <h2 className="text-2xl font-bold text-center my-8">දේශීය පුවත්</h2>

      {/* Blog List /}
      <div className="flex flex-wrap justify-around gap-1 mb-16 gap-y-10 xl:mx-24">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              title={item.title}
              image={item.image}
              description={item.description}
              category={item.category}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 w-full">
            No Business blogs available
          </div>
        )}
      </div>

      {/* Pagination Controls /}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 my-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-1 px-4 rounded-sm ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`py-1 px-4 rounded-sm ${
                currentPage === page ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-1 px-4 rounded-sm ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessBlogList;*/


"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
import NewBlogItem from "./NewBlogItem";

const BusinessBlogList = () => {
  const [businessBlogs, setBusinessBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of blogs per page

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      const businessBlogs = response.data.blogs.filter(
        (item) => item.category === "Business"
      );
      setBusinessBlogs(businessBlogs);
      console.log(businessBlogs);
    } catch (error) {
      console.error("Error fetching business blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Calculate total pages and the blogs to display on the current page
  const totalPages = Math.ceil(businessBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = businessBlogs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
    
      {/* Title */}
      <h2 className="text-xl font-semibold text-center mb-12 my-6 bg-black text-white py-1 px-4 max-w-5xl mx-auto rounded-md shadow-md">
        දේශීය පුවත්
      </h2>

      {/* Blog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-6 sm:gap-6 mb-16 max-w-5xl mx-auto justify-items-center">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((item) => (
            <NewBlogItem
              key={item._id}
              id={item._id}
              title={item.title}
              image={item.image}
              description={item.description}
              category={item.category}
              createdAt={item.createdAt}
              date={item.date}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            දේශීය පුවත් නොමැත
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 my-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-1 rounded-full font-medium transition-colors duration-200 ${
              currentPage === 1
                ? "bg-black text-white cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            පෙර
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-1 rounded-full font-medium transition-colors duration-200 ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 rounded-full font-medium transition-colors duration-200 ${
              currentPage === totalPages
                ? "bg-black text-white cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            ඊළඟ
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessBlogList;
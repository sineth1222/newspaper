"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const Blog_list = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of blogs per page

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on the selected category
  const filteredBlogs = blogs.filter((item) =>
    menu === "All" ? item.category !== "Local" : item.category === menu
    //menu === "All" ? true : item.category === menu
  );

  // Calculate total pages and the blogs to display on the current page
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: Scroll to top
    }
  };

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [menu]);

  return (
    <div style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 my-10 sm:gap-6">
        <button
          onClick={() => setMenu("All")}
          className={menu === "All" ? 
            "bg-black text-white py-1 px-4 rounded-sm" 
            : "bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300"}
        >
          සියල්ල
        </button>
        <button
          onClick={() => setMenu("Politics")}
          className={menu === "Politics" ? 
            "bg-black text-white py-1 px-4 rounded-sm" 
            : "bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300"}
        >
          දේශපාලන
        </button>
        <button
          onClick={() => setMenu("Sport")}
          className={menu === "Sport" ? 
            "bg-black text-white py-1 px-4 rounded-sm" 
            : "bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300"}
        >
        ක්‍රීඩා
        </button>
        <button
          onClick={() => setMenu("International")}
          className={
            menu === "International" ? 
            "bg-black text-white py-1 px-4 rounded-sm" 
            : "bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300"
          }
        >
          ජාත්‍යන්තර
        </button>
        <button
          onClick={() => setMenu("Other")}
          className={menu === "Other" ? 
            "bg-black text-white py-1 px-4 rounded-sm" 
            : "bg-gray-200 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-300"
          }
        >
          වෙනත්
        </button>
      </div>

      {/* Blog List */}
      <div className="flex flex-wrap justify-around gap-1 mb-16 gap-y-10 xl:mx-24">
        {currentBlogs.map((item, index) => (
          <BlogItem
            key={item._id}
            id={item._id}
            title={item.title}
            image={item.image}
            description={item.description}
            category={item.category}
            date={item.date}
          />
        ))}
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

export default Blog_list;



/*"use client";

import { blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';
import { set } from 'mongoose';

const Blog_list = () => {

    const [menu,setMenu] = useState("All");
    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
        //const data = await response.json();
        //setBlogs(data);
    }

    useEffect(()=>{
        fetchBlogs();
    },[])

  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
        <button onClick={()=>setMenu('All')} className={menu==="All"?'bg-black text-white py-1 px-4 rounded-sm ':""}>All</button>
        <button onClick={()=>setMenu('Politics')} className={menu==="Politics"?'bg-black text-white py-1 px-4 rounded-sm':""}>Politics</button>
        <button onClick={()=>setMenu('Sport')} className={menu==="Sport"?'bg-black text-white py-1 px-4 rounded-sm':""}>Sport</button>
        {/*<button onClick={()=>setMenu('Business')} className={menu==="Business"?'bg-black text-white py-1 px-4 rounded-sm':""}>Business</button>/}
        <button onClick={()=>setMenu('International')} className={menu==="International"?'bg-black text-white py-1 px-4 rounded-sm':""}>International</button>
        <button onClick={()=>setMenu('Other')} className={menu==="Other"?'bg-black text-white py-1 px-4 rounded-sm':""}>Other</button>
      </div>
      <div className='flex flex-wrap justify-around gap-1 mb-16 gap-y-10 xl:mx-24'>
        {blogs.filter((item)=> menu==="All"?true:item.category===menu).map((item, index)=>{
            return <BlogItem key={index} id={item._id} title={item.title} image={item.image} description={item.description} category={item.category}/>
        })}
      </div>
    </div>
  )
}

export default Blog_list*/

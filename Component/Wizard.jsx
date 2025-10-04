"use client";

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Wizard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please enter a news title to search');
      return;
    }
    try {
      const response = await axios.get('/api/blog', {
        params: { title: searchQuery },
      });
      setSearchResults(response.data.blogs || []);
      if (response.data.blogs.length === 0) {
        toast.info('No news found matching your query');
      }
    } catch (error) {
      toast.error('Failed to fetch news');
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      {/* News Wizard Button */}
      <button
      className="fixed bottom-60 right-0 z-50 h-36 w-10 rounded-none rounded-l-lg bg-[#0b0801ef] text-[#f8f9fc] font-bold text-xs tracking-wider hover:bg-[#e69500] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
        //className="fixed bottom-60 right-0 z-50 h-36 w-10 rounded-none rounded-l-lg bg-[#f7a900] text-[#2c3966] font-bold text-xs tracking-wider hover:bg-[#e69500] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
        style={{ writingMode: 'vertical-rl' }}
        role="button"
        aria-label="Open News Wizard"
        onClick={openModal}
      >
        <div className="flex items-center justify-center gap-3" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span>News Wizard</span>
          <FaSearch className="text-base" style={{ transform: 'rotate(180deg)' }} />
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold text-[#2c3966] mb-4">
              Welcome to the News Wizard!
            </h2>
            <p className="mb-4 text-gray-600">What news do you want to find?</p>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter news title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#f7a900]"
              />
              <button
                type="submit"
                className="bg-[#f7a900] text-[#2c3966] font-bold py-2 px-4 rounded hover:bg-[#e69500] transition-all"
              >
                Search
              </button>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6 overflow-y-auto max-h-64">
                <h3 className="text-lg font-semibold text-[#2c3966] mb-2">Search Results</h3>
                <ul className="space-y-2">
                  {searchResults.map((blog) => (
                    <li key={blog._id} className="pb-2 border-b border-gray-200">
                      <Link href={`/blogs/${blog._id}`} onClick={closeModal}>
                        <span className="text-[#2c3966] hover:text-[#f7a900] cursor-pointer">
                          {blog.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 font-semibold text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wizard;



/*import React from 'react'
import { FaNewspaper, FaSearch } from 'react-icons/fa';

const Wizard = () => {
  return (
    <div>
        <button 
            className="fixed bottom-40 right-0 z-50 h-45 w-8 rounded-none rounded-l-lg bg-[#f7a900] text-[#2c3966] font-bold text-sm tracking-widest hover:bg-[#e69500] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            style={{ writingMode: 'vertical-rl' }}
            role="button"
            aria-label="Open AnybanQ Product Wizard">
                <div className="flex items-center justify-center gap-3" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    <span>News  Wizard</span>
                    <FaSearch className="text-base" style={{transform: 'rotate(180deg)'}} />
                </div>
        </button>
    </div>
  )
}

export default Wizard*/

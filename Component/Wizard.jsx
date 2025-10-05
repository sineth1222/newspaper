"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Wizard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'bot',
      content: 'පුවත් විස්මකරු වෙත සාදරයෙන් පිළිගනිමු! ඔබ සොයන පුවත් මාතෘකාව කුමක්ද?',
    },
  ]);
  const chatContainerRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery('');
    setChatHistory([
      {
        role: 'bot',
        content: 'පුවත් විස්මකරු වෙත සාදරයෙන් පිළිගනිමු! ඔබ සොයන පුවත් මාතෘකාව කුමක්ද?',
      },
    ]);
  };

  // Check if the title is an exact or near-exact match
  const isExactMatch = (query, title) => {
    const cleanQuery = query.toLowerCase().trim();
    const cleanTitle = title.toLowerCase().trim();
    // Exact match or title contains query as a substring
    return cleanTitle === cleanQuery || cleanTitle.includes(cleanQuery);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('කරුණාකර සෙවීමට පුවත් මාතෘකාවක් ඇතුළත් කරන්න');
      return;
    }

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: 'user', content: searchQuery }]);

    try {
      const response = await axios.get('/api/blog', {
        params: { title: searchQuery },
      });
      let results = response.data.blogs || [];

      // Filter for exact or near-exact matches
      results = results.filter((blog) => isExactMatch(searchQuery, blog.title));

      // Add bot response with results
      let botContent = '';
      if (results.length > 0) {
        botContent = 'සෙවුම් ප්‍රතිඵල:\n';
        results.forEach((blog) => {
          botContent += `- <a href="/blogs/${blog._id}" class="text-blue-600 hover:underline">${blog.title}</a>\n`;
        });
      } else {
        botContent = 'ඔබේ විමසුමට ගැලපෙන නිශ්චිත පුවත් සොයාගත නොහැක. තවත් මාතෘකාවක් උත්සාහ කරන්න.';
        toast.info('ඔබේ විමසුමට ගැලපෙන නිශ්චිත පුවත් සොයාගත නොහැක');
      }

      setChatHistory((prev) => [
        ...prev,
        { role: 'bot', content: botContent },
        { role: 'bot', content: 'ඔබට තවත් පුවත් සෙවීමට අවශ්‍යද?' },
      ]);

      setSearchQuery(''); // Clear input for next query
    } catch (error) {
      const errorMessage = 'පුවත් ලබාගැනීම අසාර්ථක විය';
      setChatHistory((prev) => [...prev, { role: 'bot', content: errorMessage }]);
      toast.error(errorMessage);
      console.error('Search error:', error);
    }
  };

  // Scroll to bottom of chat on history update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
      {/* News Wizard Button */}
      <button
        className="fixed bottom-60 right-0 z-50 h-36 w-10 rounded-none rounded-l-lg bg-[#0b0801ef] text-[#f8f9fc] font-bold text-xs tracking-wider hover:bg-[#e69500] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
        style={{ writingMode: 'vertical-rl' }}
        role="button"
        aria-label="පුවත් විස්මකරු විවෘත කරන්න"
        onClick={openModal}
      >
        <div className="flex items-center justify-center gap-3" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span>පුවත්  විස්මකරු</span>
          <FaSearch className="text-base" style={{ transform: 'rotate(180deg)' }} />
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl" style={{ maxHeight: '80vh' }}>
            <h2 className="text-xl font-semibold text-[#2c3966] mb-4">
              පුවත් විස්මකරු වෙත සාදරයෙන් පිළිගනිමු!
            </h2>

            {/* Chat History */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-2 mb-4 space-y-2 overflow-y-auto bg-gray-100 border border-gray-300 rounded"
            >
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}
                  dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }}
                />
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="පුවත් මාතසකාව ඇතුළත් කරන්න"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#f7a900]"
              />
              <button
                type="submit"
                className="bg-[#f7a900] text-[#2c3966] font-bold py-2 px-4 rounded hover:bg-[#e69500] transition-all"
              >
                සොයන්න
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 font-semibold text-gray-500 hover:text-gray-700"
            >
              ඉවත් වන්න
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wizard;



/*"use client";

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
      {/* News Wizard Button /}
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

      {/* Modal /}
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

            {/* Search Results /}
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

            {/* Close Button /}
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

export default Wizard;*/



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

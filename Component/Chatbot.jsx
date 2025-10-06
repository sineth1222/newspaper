"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaPaperPlane, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { assets } from '@/Assets/assets';

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'bot',
      content: 'පුවත් විස්මකරු වෙත සාදරයෙන් පිළිගනිමු! ඔබට සොයා ගැනීමට අවශ්‍ය පුවත් මාතෘකාව කුමක්ද?',
    },
  ]);
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    if (isChatOpen) {
      setSearchQuery('');
      setChatHistory([
        {
          role: 'bot',
          content: 'පුවත් විස්මකරු වෙත සාදරයෙන් පිළිගනිමු! ඔබට සොයා ගැනීමට අවශ්‍ය පුවත් මාතෘකාව කුමක්ද?',
        },
      ]);
    }
    setIsChatOpen(!isChatOpen);
  };

  const isExactMatch = (query, title) => {
    const cleanQuery = query.toLowerCase().trim();
    const cleanTitle = title.toLowerCase().trim();
    return cleanTitle === cleanQuery || cleanTitle.includes(cleanQuery);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('කරුණාකර සෙවීමට පුවත් මාතෘකාවක් ඇතුළත් කරන්න');
      return;
    }

    setChatHistory((prev) => [...prev, { role: 'user', content: searchQuery }]);

    try {
      const response = await axios.get('/api/blog', {
        params: { title: searchQuery },
      });
      let results = response.data.blogs || [];

      results = results.filter((blog) => isExactMatch(searchQuery, blog.title));

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

      setSearchQuery('');
    } catch (error) {
      const errorMessage = 'පුවත් ලබාගැනීම අසාර්ථක විය';
      setChatHistory((prev) => [...prev, { role: 'bot', content: errorMessage }]);
      toast.error(errorMessage);
      console.error('Search error:', error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed z-50 flex items-center justify-center transition-all duration-300 ease-in-out transform w-26 h-26 bottom-4 right-4 sm:h-40 sm:w-40 hover:scale-110"
      >
        <Image
          src={assets.chatbot}
          alt="Chatbot logo"
          width={180}
          height={180}
          className="w-26 sm:w-36"
        />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-5 z-80 w-[90%] max-w-[400px] left-4 right-auto sm:left-auto sm:right-4 h-[80vh] sm:h-[70vh] bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
          isChatOpen ? 'translate-y-0' : 'translate-y-[150%]'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-3 sm:p-4 bg-[#f7a900] text-[#2c3966]">
            <h2 className="text-base font-semibold sm:text-xl">පුවත් විස්මකරු</h2>
            <button
              onClick={toggleChat}
              className="text-[#2c3966] hover:text-[#e69500] transition-colors"
              aria-label="Close chat"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Chat History */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-3 space-y-3 overflow-y-auto text-sm bg-gray-100 sm:p-4 sm:space-y-4 sm:text-base"
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`p-2 sm:p-3 rounded-lg max-w-[85%] text-sm sm:text-base ${
                  msg.role === 'user'
                    ? 'bg-blue-100 ml-auto text-right'
                    : 'bg-gray-200 mr-auto text-left'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }}
              />
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSearch}
            className="flex items-center p-3 bg-white border-t border-gray-300 sm:p-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="පුවත් මාතෘකාව ඇතුළත් කරන්න"
              className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#f7a900] text-sm sm:text-base"
            />
            <button
              type="submit"
              className="sm:p-3 p-2.5 bg-[#f7a900] text-[#2c3966] rounded-r hover:bg-[#e69500] transition-all"
              aria-label="Send message"
            >
              <FaPaperPlane size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
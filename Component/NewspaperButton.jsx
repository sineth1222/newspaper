/*"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { assets } from '@/Assets/assets';

const NewspaperButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [today, setToday] = useState("අද පත්තරේ");

  // Update the button text with today's date
  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setToday(`අද පත්තරේ - ${date.toLocaleDateString('si-LK', options)}`);
  }, []);

  const newspapers = [
    {
      name: "Daily Mirror",
      logo: "https://www.dailymirror.lk/themes/dailymirror/images/logo.png",
      website: "https://www.dailymirror.lk/"
    },
    {
      name: "Daily News",
      logo: "https://www.dailynews.lk/sites/default/files/logo.png",
      website: "https://www.dailynews.lk/"
    },
    {
      name: "The Island",
      logo: "https://island.lk/wp-content/uploads/2020/07/logo.png",
      website: "https://island.lk/"
    },
    {
      name: "Daily FT",
      logo: "https://www.ft.lk/resources/images/logo.png",
      website: "https://www.ft.lk/"
    },
    {
      name: "The Sunday Times",
      logo: "https://sundaytimes.lk/images/logo.png",
      website: "https://sundaytimes.lk/"
    },
    {
      name: "Lankadeepa",
      logo: "https://lankadeepa.lk/public/images/logo.png",
      website: "https://lankadeepa.lk/"
    },
    {
      name: "Divaina",
      logo: "https://divaina.lk/public/images/logo.png",
      website: "https://divaina.lk/"
    },
    {
      name: "Virakesari",
      logo: "https://www.virakesari.lk/images/logo.png",
      website: "https://www.virakesari.lk/"
    },
    {
      name: "Thinakaran",
      logo: "https://thinakaran.lk/public/images/logo.png",
      website: "https://thinakaran.lk/"
    }
  ];

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openWebsite = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsPopupOpen(false);
  };

  return (
    <>

      {/* News Wizard Button /}
      <button
        className="fixed bottom-60 right-0 z-50 h-36 w-8 rounded-none rounded-l-lg bg-[#f01212f3] text-[#f8f9fc] font-bold text-xs tracking-wider hover:bg-[#e69500] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
        style={{ writingMode: 'vertical-rl' }}
        role="button"
        aria-label="පුවත් විස්මකරු විවෘත කරන්න"
        onClick={openPopup}
      >
        <div className="flex items-center justify-center gap-3" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span>අද පත්තරේ</span>
          {/*<FaSearch className="text-base" style={{ transform: 'rotate(180deg)' }} />/}
        </div>
      </button>

      {/* Popup Modal /}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">බලන්න {today}</h2>
              <button
                onClick={closePopup}
                className="text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {newspapers.map((paper, index) => (
                <button
                  key={index}
                  onClick={() => openWebsite(paper.website)}
                  className="w-full p-2 text-left transition-colors duration-200 rounded hover:bg-gray-100"
                >
                  {/*<img
                    src={paper.logo}
                    alt={`${paper.name} logo`}
                    className="object-contain w-full h-16 mb-2 border rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />/}
                  <div className="text-sm font-medium text-gray-800">
                    {paper.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewspaperButton;*/



// NewspaperButton.jsx (updated)
"use client";

import React, { useState, useEffect } from "react";
import { FaNewspaper, FaVideo, FaSearch } from "react-icons/fa";
import NewsEcho from "./NewsEcho"; // Adjust path as needed
import Image from 'next/image';
import { assets } from '@/Assets/assets';

const NewspaperButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [today, setToday] = useState("");
  const [activeTab, setActiveTab] = useState("news");
  const [showEcho, setShowEcho] = useState(false); // New state for NewsEcho

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setToday(`${date.toLocaleDateString('si-LK', options)}`);
  }, []);

  const newspapers = [
    // Your existing newspapers array (unchanged)
    { name: "Daily Mirror", website: "https://www.dailymirror.lk/" },
    { name: "Daily News", website: "https://www.dailynews.lk/" },
    { name: "The Island", website: "https://island.lk/" },
    { name: "Daily FT", website: "https://www.ft.lk/" },
    { name: "The Sunday Times", website: "https://sundaytimes.lk/" },
    { name: "Lankadeepa", website: "https://lankadeepa.lk/" },
    { name: "Divaina", website: "https://divaina.lk/" },
    { name: "Virakesari", website: "https://www.virakesari.lk/" },
    { name: "Thinakaran", website: "https://thinakaran.lk/" },
    { name: "Ada Derana Sinhala", website: "https://sinhala.adaderana.lk/" },
    { name: "Dinamina", website: "https://dinamina.lk/" },
    { name: "Rivira", website: "https://rivira.lk/" },
    { name: "Silumina", website: "https://silumina.lk/" },
    { name: "Uthayan", website: "https://www.uthayan.com/" },
    { name: "Ceylon Today", website: "https://www.ceylontoday.lk/" },
    { name: "Mawbima", website: "https://mawbima.lk/" },
    { name: "Aruna", website: "https://aruna.lk/" },
    { name: "Ada.lk", website: "https://ada.lk/" },
    { name: "Lankaenews", website: "https://www.lankaenews.com/" },
    { name: "Lakbima", website: "https://www.lakbima.lk/" },
  ];

  const videoSources = [
    // Your existing video sources (unchanged)
    { name: "Newsfirst", website: "https://english.newsfirst.lk/" },
    { name: "Ada Derana Videos", website: "http://www.adaderana.lk/video-news" },
    { name: "Hiru TV", website: "https://www.hirutv.lk/" },
    { name: "Sirasa TV", website: "https://sirasatv.lk/" },
    { name: "Lankaenews Videos", website: "https://www.lankaenews.com/video" },
    { name: "ITN News", website: "https://www.itn.lk/" },
  ];

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openWebsite = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  const handleOpenNewsEcho = () => {
    setIsPopupOpen(false); // Close news popup
    setShowEcho(true); // Open NewsEcho chat
  };

  return (
    <>
      {/* News Wizard Button */}
      <button
        className="fixed bottom-60 right-0 z-50 h-26 w-7 rounded-none rounded-l-lg bg-[#f01212f3] text-[#f8f9fc] font-bold text-xs tracking-wider hover:bg-[#e69500] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
        style={{ writingMode: 'vertical-rl' }}
        role="button"
        aria-label="පුවත් විස්මකරු විවෘත කරන්න"
        onClick={openPopup}
      >
        <div className="flex items-center justify-center gap-3" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span>අද පත්තරේ</span>
        </div>
      </button>

      {/* NewsEcho Modal */}
      {showEcho && <NewsEcho onClose={() => setShowEcho(false)} />}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-l">අද පත්තරේ විශේෂාංගය සමග එක් වී {today} පත්තර වල විස්තර දැනගන්න </h2>
              <button
                onClick={closePopup}
                className="text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* News Echo Button */}
            {/*<button
              onClick={() => {
                setIsPopupOpen(false); // Close main popup
                setShowEcho(true); // Open NewsEcho
              }}
              className="flex items-center justify-center w-full gap-2 py-2 mb-4 text-white bg-purple-600 rounded"
            >
              <FaSearch className="text-white" />
              News Echo: Find Similar Stories
            </button>*/}
            <button
              onClick={handleOpenNewsEcho}
              className="flex items-center justify-center w-full gap-2 py-2 mb-4 text-white transition-colors bg-[#f7a900] rounded hover:hover:bg-[#e69500]"
            >
              {/*<FaSearch className="text-white" />*/}
              පුවත් විස්මකරු සමග පුවත් සොයන්න
              <Image
                        src={assets.chatbot}
                        alt="Chatbot logo"
                        width={50}
                        height={50}
                        className="w-5 sm:w-10"
                      />
            </button>

            {/* Tab Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("news")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "news" ? "bg-black text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <FaNewspaper className="text-white" />
                පුවත්පත්
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "videos" ? "bg-black text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <FaVideo className="text-white" />
                වීඩියෝ පුවත්
              </button>
            </div>

            {/* Content Based on Active Tab */}
            <div className="grid grid-cols-1 gap-4">
              {(activeTab === "news" ? newspapers : videoSources).map((item, index) => (
                <button
                  key={index}
                  onClick={() => openWebsite(item.website)}
                  className="flex items-center w-full gap-3 p-2 text-left transition-colors duration-200 rounded hover:bg-gray-100"
                >
                  <div className="text-sm font-medium text-gray-800">
                    {item.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewspaperButton;
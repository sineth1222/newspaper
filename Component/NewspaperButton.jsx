"use client";

import React, { useState, useEffect } from "react";

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
      {/* Fixed Button in Lower Right Corner */}
      <button
        onClick={openPopup}
        className="fixed bottom-8 right-8 z-50 h-10 w-60 rounded-lg bg-[#f32f2ff9] text-[#e6e7ed] font-bold text-l tracking-wider hover:bg-[#e69500] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center"
        //className="fixed bottom-8 right-8 z-[50] ease-in-out bg-red-600 hover:bg-blue-700 text-white font-bold py-1 px-18 text-xl rounded-lg shadow-lg transition-colors duration-200"
         // z-50 font interpreted as large font size
      >
        අද පත්තරේ
      </button>

      {/* Popup Modal */}
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
                  />*/}
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

export default NewspaperButton;
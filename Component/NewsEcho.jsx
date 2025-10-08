/*"use client";
import React, { useState } from 'react';

const NewsEcho = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('කරුණාකර පුවතක් ටයිප් කරන්න (උදා: "පැතුම් නිස්සංක" හෝ "cricket")');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/news-similar?q=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error + (data.rawError ? ` (${data.rawError})` : ''));
        setArticles([]);
      } else {
        setArticles(Array.isArray(data.articles) ? data.articles : []);
        setMessage(data.message || null);
      }
    } catch (err) {
      setError('පුවත් සොයාගැනීමේ දෝෂයක් – නැවත උත්සාහ කරන්න.');
      setArticles([]);
    }
    setLoading(false);
  };

  const openWebsite = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    // Don't close modal on fallback search to let user refine query
    if (!url.includes('google.com')) onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-sinhala">News Echo: සමාන පුවත් සොයන්න</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        {/* Input /}
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="පුවත ටයිප් කරන්න (උදා: 'පැතුම් නිස්සංක' හෝ 'cricket')"
            className="w-full p-2 text-sm border rounded font-sinhala"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="w-full py-2 mt-2 text-white bg-blue-600 rounded disabled:opacity-50 hover:bg-blue-700 font-sinhala"
          >
            {loading ? 'සොයමින්...' : 'සමාන පුවත් සොයන්න'}
          </button>
        </div>

        {/* Error /}
        {error && <p className="mb-4 text-sm text-center text-red-500 font-sinhala">{error}</p>}

        {/* Results /}
        {Array.isArray(articles) && articles.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium font-sinhala">සමාන පුවත් ({articles.length}):</p>
            {articles.map((article, index) => (
              <div key={index} className="p-3 border rounded bg-gray-50">
                <h3 className="mb-1 text-sm font-medium font-sinhala">{article.title}</h3>
                <p className="mb-2 text-xs text-gray-600 font-sinhala">{article.description}</p>
                <div className="flex justify-between mb-2 text-xs text-gray-500">
                  <span>{article.source}</span>
                  <span>{new Date(article.published).toLocaleDateString('si-LK')}</span>
                </div>
                <button
                  onClick={() => openWebsite(article.url)}
                  className="w-full py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700 font-sinhala"
                >
                  {article.source.includes('Google') ? 'Google සෙවුමට යන්න' : 'වෙබ් අඩවියට යන්න'} →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Loading/No Results /}
        {loading && <p className="text-center text-gray-500 font-sinhala">සමාන පුවත් සොයමින්...</p>}
        {!loading && Array.isArray(articles) && articles.length === 0 && query && (
          <p className="text-center text-gray-500 font-sinhala">
            {message || 'සමාන පුවත් හමු නොවීය. "ක්‍රිකට්" හෝ "election" වැනි පුළුල් යෙදුම් උත්සාහ කරන්න.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsEcho;*/

"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NewsEcho = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'bot',
      content: 'පුවත් විස්මකරු වෙත සාදරයෙන් පිළිගනිමු! ඔබට සොයා ගැනීමට අවශ්‍ය පුවත් මාතෘකාව කුමක්ද?',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('කරුණාකර සෙවීමට පුවත් මාතෘකාවක් ඇතුළත් කරන්න');
      return;
    }

    // Add user query to chat
    setChatHistory((prev) => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    try {
      const res = await fetch(`/api/news-similar?q=${encodeURIComponent(query)}`, {
        method: 'GET',
      });
      const data = await res.json();

      let botContent = '';
      if (data.error) {
        botContent = `පුවත් සොයාගැනීමේ දෝෂයක්: ${data.error}`;
        toast.error(botContent);
      } else if (data.articles && data.articles.length > 0) {
        botContent = 'සමාන පුවත් (පසුගිය දින 7 ඇතුළත):\n';
        data.articles.forEach((article) => {
          botContent += `- <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">${article.title}</a> (${article.source})<br/>${article.description}<br/>`;
        });
      } else {
        botContent = data.message || 'සමාන පුවත් හමු නොවීය. "ක්‍රිකට්" හෝ "election" වැනි පුළුල් යෙදුම් උත්සාහ කරන්න.';
        toast.info(botContent);
      }

      // Add bot response and follow-up question
      setChatHistory((prev) => [
        ...prev,
        { role: 'bot', content: botContent },
        { role: 'bot', content: 'තවත් පුවත් සෙවීමට අවශ්‍යද?' },
      ]);
      setQuery('');
    } catch (err) {
      const errorMessage = 'පුවත් සොයාගැනීමේ දෝෂයක් – නැවත උත්සාහ කරන්න.';
      setChatHistory((prev) => [...prev, { role: 'bot', content: errorMessage }]);
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}>
      {/* Chat Window */}
      <div
        className={`fixed bottom-5 z-80 w-[90%] max-w-[400px] left-4 right-auto sm:left-auto sm:right-4 h-[80vh] sm:h-[70vh] bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
          onClose ? 'translate-y-0' : 'translate-y-[150%]'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-3 sm:p-4 bg-[#f7a900] text-[#2c3966]">
            <h2 className="text-base font-semibold sm:text-xl">පුවත් විස්මකරු</h2>
            <button
              onClick={onClose}
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="කරුණාකර සෙවීමට පුවත් මාතෘකාවක් ඇතුළත් කරන්න"
              className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#f7a900] text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="p-2.5 sm:p-3 bg-[#f7a900] text-[#2c3966] rounded-r hover:bg-[#e69500] transition-all disabled:opacity-50"
              aria-label="Search news"
            >
              <FaPaperPlane size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsEcho;
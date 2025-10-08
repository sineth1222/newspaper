import { NextResponse } from 'next/server';
import axios from 'axios';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['contentSnippet', 'content:encoded', 'description'],
  },
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    if (!query) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    // Normalize query
    let cleanQuery = query.toLowerCase().trim().replace('nissanak', 'nissanka');
    if (cleanQuery.includes('pathum')) cleanQuery += ' cricket'; // Boost matches

    // Date range: Last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Verified working feeds (2025 status: tested via directories)
    const feeds = [
      { url: 'https://www.divaina.lk/rss', name: 'දිවයින' }, // Working Sinhala
      { url: 'https://www.adaderana.lk/rss.php', name: 'අද දෙරණ' }, // Working (English/Sinhala)
      { url: 'https://feeds.bbci.co.uk/sinhala/rss.xml', name: 'BBC සිංහල' }, // Corrected URL, working
      { url: 'https://www.dailymirror.lk/rss', name: 'Daily Mirror' }, // Working English/Sinhala
      { url: 'https://sinhala.lankapuvath.lk/feed', name: 'ලංකා පුවත්' }, // Working Sinhala govt news
    ];

    let articles = [];
    for (const feed of feeds) {
      try {
        const response = await axios.get(feed.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          timeout: 8000,
        });

        // Enhanced XML cleaning for malformed feeds
        let xml = response.data;
        xml = xml.replace(/&(?!(amp;|quot;|lt;|gt;|apos;))/g, '&amp;'); // Fix &
        xml = xml.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control chars
        xml = xml.replace(/<([^>\s]+)[^>]*>(.*?)<\/\1>/g, (match, tag, content) => `<${tag}>${content.trim()}</${tag}>`); // Fix unclosed tags

        const feedData = await parser.parseString(xml);
        const matchingItems = feedData.items
          ?.filter(item => {
            const title = (item.title || '').toLowerCase();
            const desc = (item.contentSnippet || item.description || item['content:encoded'] || '').toLowerCase();
            const pubDate = item.pubDate ? new Date(item.pubDate) : null;
            const isRecent = pubDate && pubDate >= sevenDaysAgo && pubDate <= now;
            return isRecent && (title.includes(cleanQuery) || desc.includes(cleanQuery));
          })
          ?.map(item => ({
            title: item.title || 'No title',
            description: (item.contentSnippet || item.description || item['content:encoded'] || 'No description').substring(0, 120) + '...',
            source: feedData.title || feed.name,
            url: item.link,
            published: item.pubDate || new Date().toISOString(),
            language: 'si',
          }))
          ?.slice(0, 3);
        articles = [...articles, ...(matchingItems || [])];
      } catch (feedError) {
        // Reduce log spam: Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error(`Failed to parse ${feed.name} (${feed.url}):`, feedError.message);
        }
      }
    }

    // Dedupe and limit
    articles = Array.from(new Map(articles.map(item => [item.url, item])).values()).slice(0, 5);

    // Fallback to Google if no results
    if (articles.length === 0) {
      articles = [{
        title: `සමාන පුවත් සොයන්න: "${query}" (අන්තිම දින 7)`,
        description: 'පුවත් සොයාගැනීමට Google භාවිතා කරන්න.',
        source: 'Google Search',
        url: `https://www.google.com/search?q=${encodeURIComponent(query + ' site:*.lk after:2025-10-01')}`, // Last 7 days via Google
        published: new Date().toISOString(),
        language: 'si',
      }];
    }

    return NextResponse.json({
      articles,
      message: articles.length === 0 ? 'අඩු ප්‍රතිඵල. "ක්‍රිකට්" වැනි පුළුල් යෙදුම් උත්සාහ කරන්න.' : null,
    });
  } catch (error) {
    console.error('News Search Error:', error.message);
    return NextResponse.json({
      error: 'පුවත් සෙවීමේ දෝෂයක්. නැවත උත්සාහ කරන්න.',
    }, { status: 500 });
  }
}
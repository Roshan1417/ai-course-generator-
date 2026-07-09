export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query is required', items: [] });
  }

  try {
    // Fetch YouTube search results page directly (no API key needed)
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIQAQ%3D%3D`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const html = await response.text();

    // Extract ytInitialData JSON from the page
    const match = html.match(/var ytInitialData\s*=\s*({.+?});\s*<\/script>/s);
    if (!match) {
      return res.status(200).json({ items: [] });
    }

    const data = JSON.parse(match[1]);
    const contents = data?.contents?.twoColumnSearchResultsRenderer
      ?.primaryContents?.sectionListRenderer?.contents?.[0]
      ?.itemSectionRenderer?.contents || [];

    const videos = [];
    for (const item of contents) {
      if (item.videoRenderer) {
        const v = item.videoRenderer;
        videos.push({ id: v.videoId });
        if (videos.length >= 3) break;
      }
    }

    return res.status(200).json({ items: videos });
  } catch (error) {
    console.error('YouTube search error:', error.message);
    return res.status(200).json({ items: [] }); // Return empty instead of 500
  }
}

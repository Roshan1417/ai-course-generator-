/**
 * Server-side image resolver — fetches a topic-specific image from Unsplash
 * (no API key needed) and returns the resolved CDN URL so Next.js Image can use it.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { topic = '', category = '' } = req.query;

  // Extract clean keywords from the topic
  const stopWords = /\b(for|the|a|an|and|or|of|in|to|with|on|by|is|are|beginners?|advanced|complete|guide|tutorial|course|introduction|basics?|fundamentals?|mastery|pro|professional)\b/gi;
  const keywords = topic
    .replace(stopWords, ' ')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 2)
    .slice(0, 3)
    .join(',');

  const searchTerms = keywords || category || 'education,learning';

  try {
    // Follow the Unsplash redirect server-side to get a stable CDN URL
    const unsplashUrl = `https://source.unsplash.com/640x360/?${encodeURIComponent(searchTerms)}`;
    const response = await fetch(unsplashUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AI-Course-Generator/1.0)',
      },
    });

    const resolvedUrl = response.url;

    // Verify it's a real image URL (not back to unsplash homepage)
    if (resolvedUrl && resolvedUrl.includes('images.unsplash.com')) {
      return res.status(200).json({ imageUrl: resolvedUrl });
    }

    // Fallback: loremflickr with topic keywords
    const flickrUrl = `https://loremflickr.com/640/360/${encodeURIComponent(searchTerms.replace(/,/g, ','))}`;
    return res.status(200).json({ imageUrl: flickrUrl });
  } catch (error) {
    // Final fallback
    return res.status(200).json({
      imageUrl: `https://loremflickr.com/640/360/${encodeURIComponent(category || 'education')}`
    });
  }
}

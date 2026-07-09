import axios from "axios";

/**
 * Search YouTube videos via our server-side API route (no API key needed)
 */
const getVideos = async (query) => {
  try {
    const resp = await axios.get('/api/youtube-search', {
      params: { query }
    });
    // Map to the same format the app expects: resp[0]?.id?.videoId
    const items = resp.data?.items || [];
    // Map to format: [{ id: { videoId: '...' } }]
    return items.map(item => ({
      id: { videoId: item.id }
    }));
  } catch (error) {
    console.error('Video search failed:', error.message);
    return [];
  }
};

export default {
  getVideos
};
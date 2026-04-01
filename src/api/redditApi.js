import axios from 'axios';

// Create an Axios instance targeting the Vite proxy
const apiClient = axios.create({
  baseURL: '/api/reddit'
});

/**
 * Format communities from "r/reactjs; r/javascript" to "reactjs+javascript"
 */
const formatCommunities = (communitiesStr) => {
  if (!communitiesStr) return 'all';
  
  const formatted = communitiesStr
    .split(';')
    .map(c => c.trim().replace(/^r\//, ''))
    .filter(c => c.length > 0)
    .join('+');
    
  return formatted || 'all';
};

/**
 * Perform a search query against Reddit endpoints
 */
export const searchReddit = async ({ communities, keyword, sort = 'new', nsfw = false, after = null }) => {
  const subreddits = formatCommunities(communities);
  
  // Need keyword, otherwise /search.json might throw error without a query
  // Usually if no keyword, it's better to hit /new.json but spec says search.json
  const params = {
    q: keyword || '""', 
    sort: sort,
    include_over_18: nsfw ? 'on' : 'off',
    restrict_sr: 1, // restricts search only to specified subreddits
  };

  if (after) {
    params.after = after;
  }

  try {
    const response = await apiClient.get(`/r/${subreddits}/search.json`, { params });
    // Normalize return so client always gets consistent data
    return response.data;
  } catch (error) {
    console.error("Reddit API search error:", error);
    throw error;
  }
};

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchReddit } from '../api/redditApi';
import ResultCard from '../components/ResultCard';
import { ArrowLeft } from 'lucide-react';

const ResultList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [after, setAfter] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchPosts(after);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, after]);

  const fetchPosts = async (currentAfter = null) => {
    if (!config) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await searchReddit({ ...config, after: currentAfter });
      
      const newPosts = data.data?.children || [];
      setPosts(prev => currentAfter ? [...prev, ...newPosts] : newPosts);
      
      setAfter(data.data?.after || null);
      setHasMore(data.data?.after != null);
    } catch (err) {
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!config) {
      navigate('/');
      return;
    }
    fetchPosts(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    // Navigate back to Home with previous config if needed, or just normal history back
    navigate(-1);
  };

  if (!config) return null;

  return (
    <div className="result-list-page">
      <header className="results-header">
        <button className="back-btn primary-btn" onClick={handleBack}>
          <ArrowLeft size={18} className="lucide-icon" />
          <span>뒤로 가기</span>
        </button>
        <div className="search-info">
          <h2>커뮤니티: {config.communities || '전체 검색'}</h2>
          <p>
            키워드: {config.keyword || '없음'} | 
            정렬: {config.sort} | 
            NSFW: {config.nsfw ? '포함' : '제외'}
          </p>
        </div>
      </header>

      <main className="results-main">
        {posts.length === 0 && !loading && !error && (
          <div className="no-results card">결과가 없습니다.</div>
        )}

        {error && <div className="error-message card">{error}</div>}

        <div className="posts-container">
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return <div ref={lastPostElementRef} key={post.data.id}><ResultCard post={post} /></div>;
            } else {
              return <ResultCard key={post.data.id} post={post} />;
            }
          })}
        </div>

        {loading && (
          <div className="loading-state card">
            <div className="loading-spinner"></div>
            <p className="loading-text">데이터를 가져오는 중...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResultList;

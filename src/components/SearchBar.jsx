import React, { useState } from 'react';
import CommunitySelector from './CommunitySelector';

const SearchBar = ({ initialConfig, onSearch }) => {
  // Use initialConfig if navigating backward, otherwise default
  const [keyword, setKeyword] = useState(initialConfig?.keyword || '');
  const [communities, setCommunities] = useState(initialConfig?.communities || 'all');
  const [sort, setSort] = useState(initialConfig?.sort || 'new');
  const [nsfw, setNsfw] = useState(initialConfig?.nsfw || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, communities, sort, nsfw });
  };

  return (
    <form className="search-bar card" onSubmit={handleSubmit}>
      <div className="search-row">
        <CommunitySelector value={communities} onChange={setCommunities} />
        
        <div className="keyword-input-wrapper">
          <label className="input-label">검색어 (선택):</label>
          <input 
            type="text" 
            placeholder="키워드 입력" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="keyword-input"
          />
        </div>
      </div>
      
      <div className="options-row">
        <div className="options-left">
          <div className="option-group">
          <label className="input-label">정렬:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="new">최신순 (New)</option>
            <option value="top">인기순 (Top)</option>
            <option value="hot">추천순 (Hot)</option>
            <option value="relevance">관련도순 (Relevance)</option>
          </select>
        </div>
        
        <div className="option-group checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={nsfw} 
              onChange={(e) => setNsfw(e.target.checked)} 
            />
            <span className="checkbox-text">NSFW 포함</span>
          </label>
        </div>
        </div>
        
        <button type="submit" className="search-submit-btn primary-btn">
          검색하기
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

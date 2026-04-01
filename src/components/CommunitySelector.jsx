import React, { useState } from 'react';

const COMMON_SUBREDDITS = ['all', 'reactjs', 'javascript', 'webdev', 'python', 'korea'];

const CommunitySelector = ({ value, onChange }) => {
  const [isManual, setIsManual] = useState(false);

  const handleManualToggle = () => setIsManual(!isManual);

  return (
    <div className="community-selector">
      <label className="input-label">커뮤니티:</label>
      <div className="selector-controls">
        {isManual ? (
          <input 
            type="text" 
            placeholder="r/reactjs; r/javascript" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="manual-input"
          />
        ) : (
          <select value={value} onChange={(e) => onChange(e.target.value)} className="dropdown-select">
            <option value="all">전체 검색 (all)</option>
            {COMMON_SUBREDDITS.map(sub => (
              <option key={sub} value={`r/${sub}`}>r/{sub}</option>
            ))}
          </select>
        )}
        <button type="button" onClick={handleManualToggle} className="toggle-btn secondary-btn">
          {isManual ? '목록 선택' : '직접 입력'}
        </button>
      </div>
    </div>
  );
};

export default CommunitySelector;

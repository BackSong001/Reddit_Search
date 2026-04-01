import React from 'react';

const ResultCard = ({ post }) => {
  const { subreddit_name_prefixed, title, selftext, permalink } = post.data;
  
  // Format summary text to max 100 characters
  const summary = selftext ? (selftext.length > 100 ? selftext.substring(0, 100) + '...' : selftext) : '';
  const postUrl = `https://www.reddit.com${permalink}`;

  return (
    <div className="card result-card">
      <div className="card-header">
        <span className="community-name">{subreddit_name_prefixed}</span>
      </div>
      <h3 className="card-title">{title}</h3>
      {summary && <p className="card-summary">{summary}</p>}
      <div className="card-footer">
        <a href={postUrl} target="_blank" rel="noopener noreferrer" className="read-more-btn">
          원문 스레드 열기
        </a>
      </div>
    </div>
  );
};

export default ResultCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (config) => {
    navigate('/results', { state: config });
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="main-title">reddit_search</h1>
        <p className="subtitle">Explore Reddit communities easily.</p>
      </header>
      <main className="home-main">
        <SearchBar onSearch={handleSearch} />
      </main>
    </div>
  );
};

export default Home;

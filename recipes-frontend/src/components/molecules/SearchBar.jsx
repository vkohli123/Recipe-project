import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Search bar for filtering recipes by text
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length >= 3) {
      setErrorMsg('');
      onSearch(query.trim());
    } else {
      setErrorMsg('Please enter at least 3 characters');
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="flex items-center w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-4 border border-white/50 hover:shadow-purple-500/30 transition-all duration-300">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-3 shadow-lg">
          <Search className="text-white w-5 h-5" aria-hidden="true" />
        </div>
        <label htmlFor="recipe-search" className="sr-only">Search recipes</label>
        <input
          id="recipe-search"
          type="text"
          aria-label="Search recipes"
          placeholder="Search recipes by name, cuisine, or tags..."
          className="flex-1 outline-none text-gray-800 text-lg placeholder-gray-400 bg-transparent"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setErrorMsg('');
          }}
        />
        <button
          type="submit"
          className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full ml-3 font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${query.trim().length < 3 ? 'opacity-50 cursor-not-allowed' : 'animate-pulseGlow'}`}
          disabled={query.trim().length < 3}
        >
          Search
        </button>
      </form>
      <div aria-live="polite" className="h-6 mt-2">
        {errorMsg && (
          <div className="text-red-100 text-sm bg-red-500/30 backdrop-blur-sm px-4 py-2 rounded-full inline-block border border-red-300/30">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}
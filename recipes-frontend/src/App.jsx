import React, { useState, lazy, Suspense } from 'react';
import SearchBar from './components/SearchBar';
import FilterSortBar from './components/FilterSortBar';
import ErrorBoundary from './components/ErrorBoundary';
import api from './lib/api';
import { normalizeRecipes } from './lib/mapper';
import { useImagePreload } from './lib/useImagePreload';

const RecipeGrid = lazy(() => import('./components/RecipeGrid'));

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preload first 6 images for faster initial render
  useImagePreload(filtered, 6);

  const handleSearch = async (text) => {
    if (text.length < 3) return;
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await api.get('/recipes', { params: { query: text } });
      // normalize to app model
      // Always normalize then sort ascending by cook time (fastest first)
      const data = normalizeRecipes(res.data).sort((a, b) => {
        const aTime = a.cookTimeMinutes ?? Number.POSITIVE_INFINITY;
        const bTime = b.cookTimeMinutes ?? Number.POSITIVE_INFINITY;
        return aTime - bTime; // ascending => fastest first
      });
      setRecipes(data);
      setFiltered(data);
      // Ensure UI reflects we are currently in ascending (fast-first) mode
      setSortOrder('desc');
      // derive unique tags from recipes
      const tagSet = new Set();
      data.forEach((r) => {
        if (r.tags) r.tags.forEach((t) => tagSet.add(t));
      });
      setTags(Array.from(tagSet));
    } catch (err) {
      console.error('Search error', err);
      setErrorMessage(err?.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortOrder === 'asc'
        ? a.cookTimeMinutes - b.cookTimeMinutes
        : b.cookTimeMinutes - a.cookTimeMinutes
    );
    setFiltered(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = (tag) => {
    if (!tag) {
      setFiltered(recipes);
      setSelectedTag('');
      return;
    }
    const filteredData = recipes.filter((r) => {
      // Handle both array and string tags
      if (Array.isArray(r.tags)) {
        return r.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()));
      }
      return r.tags?.toLowerCase().includes(tag.toLowerCase());
    });
    setFiltered(filteredData);
    setSelectedTag(tag);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      {/* Hero Section with Gradient Title */}
      <div className="text-center mt-8 mb-8 sm:mt-12 sm:mb-10">
        <div className="inline-block animate-float">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-100 mb-3 drop-shadow-2xl tracking-tight">
            🍳 Recipe Finder
          </h1>
        </div>
        <p className="text-white/90 text-lg sm:text-xl font-light mt-2 drop-shadow-lg">
          Discover delicious recipes from around the world
        </p>
      </div>

      {/* Search Bar with Glassmorphism */}
      <div className="w-full max-w-3xl mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Filter Sort Bar */}
      <FilterSortBar
        onSort={handleSort}
        sortOrder={sortOrder}
        onFilter={handleFilter}
        selectedTag={selectedTag}
        tags={tags}
      />

      {/* Loading & Error States */}
      {loading && (
        <div className="mt-6 text-white/90 text-lg flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          Searching for recipes...
        </div>
      )}
      {errorMessage && (
        <div className="mt-6 text-red-100 bg-red-500/30 backdrop-blur-sm px-6 py-3 rounded-2xl border border-red-300/30">
          {errorMessage}
        </div>
      )}

      {/* Recipe Grid */}
      <Suspense fallback={
        <div className="mt-8 text-white/90 text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
          Loading recipes...
        </div>
      }>
        <ErrorBoundary>
          <RecipeGrid recipes={filtered} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

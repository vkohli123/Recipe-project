import React from 'react';

// Tag filter group for selecting recipe categories
export default function TagFilterGroup({ tags, selectedTag, onFilter, max = 8 }) {
  const defaultTags = ['Chicken', 'Vegan', 'Pasta', 'Curry', 'Dessert'];
  const availableTags = Array.isArray(tags) && tags.length ? tags : defaultTags;

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {availableTags.slice(0, max).map(tag => {
        const isActive = selectedTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onFilter(tag)}
            className={`group relative px-5 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 border ${
              isActive
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 border-white/50'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 shadow-md hover:shadow-lg border-white/50 hover:bg-white'
            }`}
            aria-pressed={isActive}
          >
            <span className="text-sm">{tag}</span>
            {isActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
            )}
          </button>
        );
      })}
    </div>
  );
}
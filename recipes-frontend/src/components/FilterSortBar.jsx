import React from 'react';
import TagFilterGroup from './molecules/TagFilterGroup';

export default function FilterSortBar({ onSort, sortOrder, onFilter, selectedTag, tags }) {
  // Tag rendering delegated to TagFilterGroup (molecule)

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4 mb-6 w-full max-w-5xl">
      <button
        onClick={onSort}
        className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/30"
      >
        <span className="text-sm">⏱️ Sort by Cook Time</span>
        <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded-lg">
             {sortOrder === 'asc' ? '↓ Slow' : '↑ Fast'}
        </span>
      </button>

      <TagFilterGroup tags={tags} selectedTag={selectedTag} onFilter={onFilter} />

      {selectedTag && (
        <button
          onClick={() => onFilter('')}
          className="px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-white/50 hover:bg-red-50 hover:text-red-600"
        >
          ✕ Clear Filter
        </button>
      )}
    </div>
  );
}

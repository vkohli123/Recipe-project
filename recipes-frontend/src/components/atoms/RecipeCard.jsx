import React from 'react';
import Button from './Button';
import Badge from './Badge';

// Default image for recipes without a provided image
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60';

// Card component for displaying a recipe summary
export default function RecipeCard({ recipe, onOpen, priority = false }) {
  // Ensure tags is always an array
  const tags = Array.isArray(recipe.tags) ? recipe.tags : [];
  const imageSrc = recipe.image || DEFAULT_IMAGE;

  return (
    <article className="group relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 border border-white/50 hover:border-purple-300/50 cursor-pointer"
      onClick={() => onOpen && onOpen(recipe)}
    >
      {/* Image with gradient overlay */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img 
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={priority ? "high" : "auto"}
          src={imageSrc} 
          alt={recipe.name} 
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          width="800"
          height="600"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating Badge */}
        {recipe.rating && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <span>★</span>
            <span>{recipe.rating}</span>
          </div>
        )}

        {/* Cook time badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
          <span>⏱️</span> <span>{recipe.cookTimeMinutes ?? recipe.cookTime ?? '—'} mins</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {recipe.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
            <span role="img" aria-label="cuisine">🌍</span> {recipe.cuisine}
          </p>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {Array.isArray(recipe.instructions) ? recipe.instructions.join(' ') : recipe.instructions}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-md"
            onClick={e => {
              e.stopPropagation();
              onOpen && onOpen(recipe);
            }}
            aria-label={`Open details for ${recipe.name}`}
          >
            View Recipe
          </button>
          {recipe.servings && (
            <div className="text-sm text-gray-600 font-medium flex items-center gap-1">
              <span role="img" aria-label="servings">👥</span> {recipe.servings}
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 0 40px rgba(147, 51, 234, 0.3)' }}
      ></div>
    </article>
  );
}

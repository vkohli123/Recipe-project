import React from 'react';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60';

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  const image = recipe.image || recipe.imageUrl || PLACEHOLDER;
  const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : (recipe.instructions ? [recipe.instructions] : []);
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : (recipe.ingredients ? recipe.ingredients.split(',').map(i => i.trim()) : []);
  const tags = Array.isArray(recipe.tags) ? recipe.tags : (recipe.tags ? recipe.tags.split(',').map(t => t.trim()) : []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto z-10 border border-white/50 transform animate-scaleIn">
        {/* Close Button */}
        <button 
          aria-label="close" 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center text-xl font-bold shadow-lg hover:shadow-xl hover:scale-110"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none bg-gradient-to-br from-purple-100 to-pink-100">
            <img 
              src={image} 
              alt={recipe.name} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Image Overlays */}
            {recipe.rating && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-lg font-bold shadow-xl flex items-center gap-2">
                ⭐ {recipe.rating}
                {recipe.reviewCount > 0 && (
                  <span className="text-sm font-normal">({recipe.reviewCount})</span>
                )}
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white drop-shadow-2xl mb-2">
                {recipe.name}
              </h2>
              <p className="text-white/90 text-lg font-medium drop-shadow-lg flex items-center gap-2">
                🌍 {recipe.cuisine}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8 overflow-y-auto max-h-[600px]">
            {/* Quick Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span className="font-semibold text-gray-800">{recipe.prepTimeMinutes ?? recipe.cookTimeMinutes ?? '—'} mins</span>
              </div>
              {recipe.servings && (
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  <span className="font-semibold text-gray-800">{recipe.servings} servings</span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <span className="font-semibold text-gray-800 capitalize">{recipe.difficulty}</span>
                </div>
              )}
              {recipe.caloriesPerServing && (
                <div className="bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span className="font-semibold text-gray-800">{recipe.caloriesPerServing} kcal</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span key={i} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                🥘 <span>Ingredients</span>
              </h3>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                <ul className="space-y-2">
                  {ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="text-purple-500 font-bold mt-0.5">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                📝 <span>Instructions</span>
              </h3>
              <div className="space-y-3">
                {instructions.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Type */}
            {recipe.mealType && recipe.mealType.length > 0 && (
              <div className="text-sm text-gray-600 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <span className="font-semibold">Meal Type:</span> {recipe.mealType.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

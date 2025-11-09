import React, { lazy, Suspense, useState } from 'react';
import RecipeCard from '../atoms/RecipeCard';

const RecipeModal = lazy(() => import('../RecipeModal'));

export default function RecipeGridView({ recipes }) {
  if (!recipes.length) {
    return (
      <div className="mt-12 text-center">
        <div className="inline-block bg-white/90 backdrop-blur-xl rounded-3xl px-12 py-8 shadow-2xl border border-white/50">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-700 text-xl font-medium">No recipes found</p>
          <p className="text-gray-500 mt-2">Try searching for your favorite dish!</p>
        </div>
      </div>
    );
  }
  const [selected, setSelected] = useState(null);
  const open = (r) => setSelected(r);
  const close = () => setSelected(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full max-w-7xl px-4 pb-12">
      {recipes.map((recipe, index) => (
        <RecipeCard key={recipe.id} recipe={recipe} onOpen={open} priority={index < 6} />
      ))}
      <Suspense fallback={null}>{selected ? <RecipeModal recipe={selected} onClose={close} /> : null}</Suspense>
    </div>
  );
}
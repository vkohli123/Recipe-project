import { useEffect } from 'react';

/**
 * Preload the first few recipe images for faster initial render
 */
export function useImagePreload(recipes, count = 6) {
  useEffect(() => {
    if (!recipes || recipes.length === 0) return;

    const imagesToPreload = recipes.slice(0, count)
      .map(recipe => recipe.image)
      .filter(Boolean);

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [recipes, count]);
}

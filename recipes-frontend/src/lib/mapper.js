// Converts various API response formats into a unified recipe object
export function normalizeRecipe(source = {}) {
  // Handles different field names and formats from multiple APIs
  const parseList = (val) => Array.isArray(val) ? val : (val ? String(val).split(',').map(item => item.trim()) : []);
  return {
    id: source.id,
    name: source.name || source.title || 'Untitled',
    ingredients: parseList(source.ingredients),
    instructions: Array.isArray(source.instructions) ? source.instructions : (source.instructions ? [source.instructions] : []),
    prepTimeMinutes: source.prepTimeMinutes ?? source.prepTime ?? null,
    cookTimeMinutes: source.cookTimeMinutes ?? source.cookTime ?? null,
    servings: source.servings ?? null,
    difficulty: source.difficulty ?? null,
    cuisine: source.cuisine ?? null,
    caloriesPerServing: source.caloriesPerServing ?? source.calories ?? null,
    tags: parseList(source.tags).filter(Boolean),
    image: source.image || source.imageUrl || source.thumbnail || null,
    rating: source.rating ?? null,
    reviewCount: source.reviewCount ?? source.reviews ?? null,
    mealType: parseList(source.mealType),
    userId: source.userId ?? null,
    raw: source, // retain original for debugging
  };
}

export function normalizeRecipes(responseData) {
  // Accept either an array or an object with { recipes: [...] }
  const arr = Array.isArray(responseData) ? responseData : (responseData?.recipes || []);
  return arr.map(normalizeRecipe);
}

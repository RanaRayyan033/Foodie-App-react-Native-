import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { seedRecipes } from '../data/recipesData';

const RecipeContext = createContext(null);

const USER_RECIPES_KEY = 'foodie_user_recipes';
const FAVORITES_KEY = 'foodie_favorites';

export function RecipeProvider({ children }) {
  const [userRecipes, setUserRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedUserRecipes = await AsyncStorage.getItem(USER_RECIPES_KEY);
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedUserRecipes) setUserRecipes(JSON.parse(storedUserRecipes));
      if (storedFavorites) setFavoriteIds(JSON.parse(storedFavorites));
    } catch (e) {
      console.warn('Failed to load stored data', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const persistUserRecipes = async (recipes) => {
    setUserRecipes(recipes);
    try {
      await AsyncStorage.setItem(USER_RECIPES_KEY, JSON.stringify(recipes));
    } catch (e) {
      console.warn('Failed to save recipes', e);
    }
  };

  const persistFavorites = async (ids) => {
    setFavoriteIds(ids);
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn('Failed to save favorites', e);
    }
  };

  const allRecipes = [...seedRecipes, ...userRecipes];

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: 'user_' + Date.now().toString(),
      isUserRecipe: true,
      category: recipe.category || 'My Food',
    };
    persistUserRecipes([...userRecipes, newRecipe]);
    return newRecipe;
  };

  const updateRecipe = (id, updates) => {
    const updated = userRecipes.map((r) => (r.id === id ? { ...r, ...updates } : r));
    persistUserRecipes(updated);
  };

  const deleteRecipe = (id) => {
    persistUserRecipes(userRecipes.filter((r) => r.id !== id));
    if (favoriteIds.includes(id)) {
      persistFavorites(favoriteIds.filter((fid) => fid !== id));
    }
  };

  const toggleFavorite = (id) => {
    if (favoriteIds.includes(id)) {
      persistFavorites(favoriteIds.filter((fid) => fid !== id));
    } else {
      persistFavorites([...favoriteIds, id]);
    }
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  const getRecipeById = (id) => allRecipes.find((r) => r.id === id);

  const getRecipesByCategory = (category) =>
    allRecipes.filter((r) => r.category === category);

  const favoriteRecipes = allRecipes.filter((r) => favoriteIds.includes(r.id));

  // Categories shown in the horizontal bar (from seed data only —
  // user-added recipes all live under the separate "My Food" section).
  const categories = Array.from(new Set(seedRecipes.map((r) => r.category)));

  const value = {
    isLoaded,
    allRecipes,
    userRecipes,
    favoriteIds,
    favoriteRecipes,
    categories,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    isFavorite,
    getRecipeById,
    getRecipesByCategory,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return ctx;
}

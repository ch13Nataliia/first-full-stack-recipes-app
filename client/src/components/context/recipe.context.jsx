import React, { createContext, useState, useCallback, useContext } from 'react';
import { STORAGE_KEY, RECIPES_ENDPOINT } from '../../settings';

// const RECIPES_ENDPOINT = `/api/v1/recipes`;

export const RecipesContext = createContext({
  fetchRecipes: () => [],
  addRecipe: () => {},
  updateRecipe: () => {},
  deleteRecipe: () => {},
  loaded: false,
  loading: false,
  error: null,
  recipes: [],
});

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      console.log(`fetching from ${RECIPES_ENDPOINT}`);
      const response = await fetch(RECIPES_ENDPOINT);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setRecipes(data);
    } catch (err) {
      console.log('Error', err);
      setError(`Failed to load recipes`);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading, setError, setRecipes, setLoaded, setLoading]);

  const addRecipe = useCallback(
    async (formData) => {
      console.log('about to add', formData);
      if (formData.image === '') {
        delete formData.image;
      }
      try {
        const response = await fetch(RECIPES_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedRecipe = await response.json();
        console.log('got data', savedRecipe);
        const newRecipes = [...recipes, savedRecipe];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes));
        setRecipes(newRecipes);
      } catch (err) {
        console.log(err);
      }
    },
    [recipes, setRecipes],
  );

  const updateRecipe = useCallback(
    async (id, formData) => {
      console.log('updating', id, formData);
      let updatedRecipe = null;

      const index = recipes.findIndex((recipe) => recipe._id === id);

      console.log(index);
      if (index === -1) throw new Error(`Recipe with index ${id} not found`);


      const oldRecipe = recipes[index];
      console.log('oldRecipe', oldRecipe);

      const updates = {};

      for (const key of Object.keys(oldRecipe)) {
        if (key === '_id') continue;
        if (oldRecipe[key] !== formData[key]) {
          updates[key] = formData[key];
        }
      }

      try {
        const response = await fetch(`${RECIPES_ENDPOINT}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });

        if (response.status !== 200) {
          throw response;
        }

        updatedRecipe = {
          ...oldRecipe,
          ...formData,
        };
        console.log('updatedRecipe', updatedRecipe);

        const updatedRecipes = [
          ...recipes.slice(0, index),
          updatedRecipe,
          ...recipes.slice(index + 1),
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
      } catch (err) {
        console.log(err);
      }
    },
    [recipes, setRecipes],
  );

  const deleteRecipe = useCallback(
    async (id) => {
      let deletedRecipe = null;
      try {
        const response = await fetch(`${RECIPES_ENDPOINT}/${id}`, {
          method: 'DELETE',
          headers: {},
        });
        if (response.status !== 204) {
          throw response;
        }
        const index = recipes.findIndex((recipe) => recipe._id === id);
        deletedRecipe = recipes[index];
        const updatedRecipes = [
          ...recipes.slice(0, index),
          ...recipes.slice(index + 1),
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
        console.log(`Deleted ${deletedRecipe.title}`);
      } catch (err) {
        console.log(err);
      }
    },
    [recipes, setRecipes],
  );

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        loading,
        error,
        fetchRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

import React, { Children, createContext, useReducer } from "react";

export const RecipeContext = createContext();
const initialState = {
  loading: false,
  recipes: [],
  error: null,
  selectedRecipe: null,
  selectedCategory: "All Recipes",
  favoriteRecipes: null,
};
const recipeReducer = (state, action) => {
  switch (action.type) {
    case "RECIPE_FETCH_REQ":
      return { ...state, loading: true };
    case "RECIPE_FETCH_SUCCESS":
      return { ...state, loading: false, recipes: action.payload };
    case "RECIPE_FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SELECTED_RECIPE_FETCH":
      return { ...state, loading: false, selectedRecipe: action.payload };
    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "FETCH_FAV_RECIPE":
      return { ...state, loading: false, favoriteRecipes: action.payload };
    default:
      return state;
  }
};
export const RecipeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  console.log(state);
  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

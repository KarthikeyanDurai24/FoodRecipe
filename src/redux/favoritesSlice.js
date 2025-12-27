import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Stores favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriterecipes.findIndex(
        (fav) => fav.idMeal === recipe.idMeal // Use idMeal to uniquely identify recipes
      );

      if (existingIndex >= 0) {
        // Recipe already exists, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Recipe does not exist, add it
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;

      const exists = state.favoriterecipes.find(
        (item) => item.idMeal === recipe.idMeal
      );

      if (exists) {
        // ❌ Remove if already favorite
        state.favoriterecipes = state.favoriterecipes.filter(
          (item) => item.idMeal !== recipe.idMeal
        );
      } else {
        // ✅ Add to favorites
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

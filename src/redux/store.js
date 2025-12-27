import { configureStore, createSlice } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

// Define myFood slice directly here
const myFoodSlice = createSlice({
  name: "myFood",
  initialState: {
    myRecipes: [], // stores custom recipes
  },
  reducers: {
    addRecipe: (state, action) => {
      state.myRecipes.push(action.payload);
    },
  },
});

// Export actions
export const { addRecipe } = myFoodSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    myFood: myFoodSlice.reducer, // include myFood slice
  },
});

export default store;

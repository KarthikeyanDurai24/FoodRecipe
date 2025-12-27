import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function RecipeDetailScreen({ route }) {
    const recipe = route.params;
  
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const favoriterecipes = useSelector(
      (state) => state.favorites.favoriterecipes
    );
  
    const isFavourite = favoriterecipes?.some(
      (fav) => fav.idMeal === recipe.idMeal
    );
  
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View testID="imageContainer">
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={styles.recipeImage}
          />
        </View>
  
        {/* Buttons */}
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={() => dispatch(toggleFavorite(recipe))}>
            <Text style={styles.favText}>{isFavourite ? "♥" : "♡"}</Text>
          </TouchableOpacity>
        </View>
  
        {/* Content */}
        <View style={styles.contentContainer}>
          <Text testID="recipeTitle" style={styles.recipeTitle}>
            {recipe.strMeal}
          </Text>
  
          <Text testID="recipeCategory" style={styles.recipeCategory}>
            {recipe.recipeCategory}
          </Text>
  
          {/* Misc Info */}
          <View testID="miscContainer" style={styles.miscContainer}>
            <Text style={styles.miscText}>⏱ {recipe.cookingTime}</Text>
            <Text style={styles.miscText}>🍽 {recipe.servings}</Text>
            <Text style={styles.miscText}>🔥 {recipe.calories}</Text>
          </View>
  
          {/* Ingredients */}
          <View testID="sectionContainer">
            <Text style={styles.sectionTitle}>Ingredients</Text>
  
            <View testID="ingredientsList">
              {recipe.ingredients.map((item, index) => (
                <Text key={index} style={styles.ingredientText}>
                  • {item.ingredientName} - {item.measure}
                </Text>
              ))}
            </View>
          </View>
  
          {/* Instructions */}
          <View testID="sectionContainer">
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructionsText}>
              {recipe.recipeInstructions}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    recipeImage: {
      width: wp(100),
      height: hp(35),
    },
    topButtonsContainer: {
      position: "absolute",
      top: hp(4),
      left: wp(4),
      right: wp(4),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    backButton: {
        padding: 10,
        backgroundColor: "#FFFFFF", // ✅ white background
        borderRadius: 20,
      },
    backButtonText: {
        fontSize: hp(2),
        fontWeight: "bold",
      },
    favoriteButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#FFFFFF", // ✅ white background
      },
      favoriteButtonText: {
        fontSize: hp(2),
        color: "red",
      },
    backText: {
      fontSize: hp(2),
      fontWeight: "bold",
    },
    favText: {
      fontSize: hp(2.5),
      color: "red",
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(3),
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      marginBottom: hp(1),
    },
    recipeCategory: {
      fontSize: hp(2),
      color: "#6B7280",
      marginBottom: hp(2),
    },
    miscContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: hp(2),
    },
    miscText: {
      fontSize: hp(1.8),
      fontWeight: "600",
    },
    sectionTitle: {
      fontSize: hp(2.4),
      fontWeight: "bold",
      marginBottom: hp(1),
    },
    ingredientText: {
      fontSize: hp(1.8),
      marginBottom: hp(0.5),
    },
    instructionsText: {
      fontSize: hp(1.8),
      lineHeight: hp(3),
    },
  });
  

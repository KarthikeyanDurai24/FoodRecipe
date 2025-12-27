import { 
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const recipes = useSelector((state) => state.myFood.myRecipes); // get from store

  // Navigate to form to add new recipe
  const handleAddRecipe = () => {
    navigation.navigate("RecipesFormScreen", {
      onRecipeSaved: () => {}, // optional callback
    });
  };

  // Handle click on recipe card to view details
  const handleRecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  // Edit recipe
  const editRecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      onRecipeSaved: () => {},
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"Back"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddRecipe} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {recipes.length === 0 ? (
          <Text style={styles.norecipesText}>No recipes added yet.</Text>
        ) : (
          recipes.map((recipe, index) => (
            <View key={index} style={styles.recipeCard} testID="recipeCard">
              <TouchableOpacity
                testID="handleRecipeBtn"
                onPress={() => handleRecipeClick(recipe)}
              >
                {recipe.image && (
                  <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                )}
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDescription} testID="recipeDescp">
                  {recipe.description.length > 50
                    ? recipe.description.substring(0, 50) + "..."
                    : recipe.description}
                </Text>
              </TouchableOpacity>

              {/* Edit Button */}
              <View style={styles.actionButtonsContainer} testID="editDeleteButtons">
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editRecipe(recipe, index)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },
  backButton: {
    marginBottom: hp(1.5),
  },
  backButtonText: {
    fontSize: hp(2.2),
    color: "#4F75FF",
  },
  addButton: {
    backgroundColor: "#4F75FF",
    padding: wp(1),
    alignItems: "center",
    borderRadius: 5,
    width: 200,
    marginBottom: hp(2),
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },
  scrollContainer: {
    paddingBottom: hp(2),
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  norecipesText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },
  recipeCard: {
    width: wp(90),
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  recipeImage: {
    width: "100%",
    height: hp(20),
    borderRadius: 8,
    marginBottom: hp(1),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    marginBottom: hp(0.5),
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: "#34D399",
    padding: wp(1),
    borderRadius: 5,
    width: wp(40),
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});

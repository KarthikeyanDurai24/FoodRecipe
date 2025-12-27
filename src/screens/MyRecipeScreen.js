import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from AsyncStorage
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem("customRecipes");
        if (storedRecipes) {
          setRecipes(JSON.parse(storedRecipes));
        }
      } catch (error) {
        console.log("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // Navigate to form to add new recipe
  const handleAddRecipe = () => {
    navigation.navigate("RecipesFormScreen", {
      onrecipeEdited: handleRecipeSaved,
    });
  };

  // Handle click on recipe card to view details
  const handleRecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  // Save updated recipes after add/edit
  const handleRecipeSaved = async (newRecipe, index = null) => {
    let updatedRecipes = [...recipes];
    if (index !== null) {
      updatedRecipes[index] = newRecipe;
    } else {
      updatedRecipes.push(newRecipe);
    }
    setRecipes(updatedRecipes);
    await AsyncStorage.setItem("customRecipes", JSON.stringify(updatedRecipes));
  };

  // Delete recipe
  const deleteRecipe = async (index) => {
    let updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
    await AsyncStorage.setItem("customRecipes", JSON.stringify(updatedRecipes));
  };

  // Edit recipe
  const editRecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      onrecipeEdited: handleRecipeSaved,
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

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
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

                {/* Edit and Delete Buttons */}
                <View style={styles.actionButtonsContainer} testID="editDeleteButtons">
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editRecipe(recipe, index)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteRecipe(index)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
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
    justifyContent: "space-between",
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
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: wp(1),
    borderRadius: 5,
    width: wp(40),
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});

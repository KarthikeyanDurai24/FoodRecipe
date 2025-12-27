import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saveRecipe = async () => {
    if (!title || !description || !image) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const storedRecipes = await AsyncStorage.getItem("recipes");
      let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

      const newRecipe = { title, image, description };

      if (recipeToEdit && recipeIndex !== undefined) {
        // Editing an existing recipe
        recipes[recipeIndex] = newRecipe;
        if (onrecipeEdited) onrecipeEdited(newRecipe, recipeIndex);
      } else {
        // Adding a new recipe
        recipes.push(newRecipe);
      }

      await AsyncStorage.setItem("recipes", JSON.stringify(recipes));
      Alert.alert("Success", "Recipe saved successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving recipe:", error);
      Alert.alert("Error", "Failed to save recipe");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saveRecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "white",
  },
  input: {
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(2),
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: hp(25),
    marginVertical: hp(2),
    borderRadius: 10,
  },
  imagePlaceholder: {
    height: hp(25),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(2),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
    borderRadius: 10,
    color: "#6B7280",
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: hp(1.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: hp(2),
  },
});

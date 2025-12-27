import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("RecipeDetailScreen", item)}
    >
      <Image source={{ uri: item.recipeImage }} style={styles.recipeImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.recipeTitle}>{item.recipeName}</Text>
        {item.recipeCategory && (
          <Text style={styles.recipeCategory}>{item.recipeCategory}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.heading}>My Favorite Recipes</Text>
      <FlatList
        data={favoriteRecipesList}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.idFood.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  goBackButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  goBackButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  heading: {
    fontSize: hp(3.8),
    marginTop: hp(4),
    marginLeft: wp(4),
    fontWeight: "bold",
    color: "#4B5563",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    marginBottom: hp(0.5),
  },
  recipeCategory: {
    fontSize: hp(1.8),
    color: "#9CA3AF", // text-neutral-500
  },
});

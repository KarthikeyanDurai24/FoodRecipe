import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ArticleCard item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        testID="recipesDisplay"
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.idMeal || index.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const ArticleCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      testID="articleDisplay"
      onPress={() =>
        navigation.navigate("RecipeDetail", {
          idMeal: item.idMeal,
          strMeal: item.strMeal,
          strMealThumb: item.strMealThumb,

          // ✅ HARD-CODED DETAILS
          recipeCategory: "Home Style",
          cookingTime: "30 mins",
          servings: "2",
          calories: "250 kcal",

          ingredients: [
            { ingredientName: "Salt", measure: "1 tsp" },
            { ingredientName: "Oil", measure: "2 tbsp" },
            { ingredientName: "Vegetables", measure: "1 cup" },
            { ingredientName: "Spices", measure: "As needed" },
          ],

          recipeInstructions:
            "1. Prepare all ingredients.\n" +
            "2. Heat oil in a pan.\n" +
            "3. Add vegetables and spices.\n" +
            "4. Cook well and serve hot.",
        })
      }
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.articleImage} />
      <Text style={styles.articleText}>{item.strMeal}</Text>
      <Text style={styles.articleDescription} numberOfLines={2}>
        Simple and delicious homemade recipe.
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  cardContainer: {
    width: (wp(100) - wp(12)) / 2,
    margin: wp(1),
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: wp(2),
    elevation: 3,
  },
  articleImage: {
    width: "100%",
    height: hp(20),
    borderRadius: 10,
    marginBottom: hp(1),
  },
  articleText: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "#52525B",
  },
  articleDescription: {
    fontSize: hp(1.4),
    color: "#6B7280",
  },
});

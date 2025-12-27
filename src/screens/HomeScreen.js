import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Categories from "../components/categories";
import FoodItems from "../components/recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Chicken");

  // Hardcoded categories
  const [categories, setCategories] = useState([
    { idCategory: "1", strCategory: "Beef", strCategoryThumb: "https://www.themealdb.com/images/category/beef.png" },
    { idCategory: "2", strCategory: "Chicken", strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png" },
    { idCategory: "3", strCategory: "Dessert", strCategoryThumb: "https://www.themealdb.com/images/category/dessert.png" },
    { idCategory: "4", strCategory: "Lamb", strCategoryThumb: "https://www.themealdb.com/images/category/lamb.png" },
    { idCategory: "5", strCategory: "Miscellaneous", strCategoryThumb: "https://www.themealdb.com/images/category/miscellaneous.png" },
    { idCategory: "6", strCategory: "Pasta", strCategoryThumb: "https://www.themealdb.com/images/category/pasta.png" },
    { idCategory: "7", strCategory: "Pork", strCategoryThumb: "https://www.themealdb.com/images/category/pork.png" },
    { idCategory: "8", strCategory: "Seafood", strCategoryThumb: "https://www.themealdb.com/images/category/seafood.png" },
    { idCategory: "9", strCategory: "Side", strCategoryThumb: "https://www.themealdb.com/images/category/side.png" },
    { idCategory: "10", strCategory: "Starter", strCategoryThumb: "https://www.themealdb.com/images/category/starter.png" },
    { idCategory: "11", strCategory: "Vegan", strCategoryThumb: "https://www.themealdb.com/images/category/vegan.png" },
    { idCategory: "12", strCategory: "Vegetarian", strCategoryThumb: "https://www.themealdb.com/images/category/vegetarian.png" },
    { idCategory: "13", strCategory: "Breakfast", strCategoryThumb: "https://www.themealdb.com/images/category/breakfast.png" },
    { idCategory: "14", strCategory: "Goat", strCategoryThumb: "https://images.unsplash.com/photo-1619711667542-c049700dd9e0?q=80&w=1888&auto=format&fit=crop" },
  ]);

  // All food items
  const [allFood, setAllFood] = useState([
    // ... all your food items as in your current code ...
  ]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  // Filter foods by selected category
  const filteredfoods = allFood.filter(
    (food) => food.category === activeCategory
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        testID="scrollContainer"
      >
        {/* Header */}
        <View style={styles.headerContainer} testID="headerContainer">
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png' }}
            style={styles.avatar}
          />
          <Text style={styles.greetingText}>Hello, User!</Text>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Make your own food,</Text>
          <Text style={styles.subtitle}>
            stay at <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        {/* Category List */}
        <View testID="categoryList">
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            onCategoryPress={handleChangeCategory}
          />
        </View>

        {/* Food Items */}
        <View testID="foodList">
          <FoodItems foods={filteredfoods} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 50,
    paddingTop: hp(14),
  },
  headerContainer: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  greetingText: {
    fontSize: hp(1.7),
    color: "#52525B",
    fontWeight: "600",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 9999,
    textAlign: "center",
  },
  titleContainer: {
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3.8),
    fontWeight: "600",
    color: "#52525B",
  },
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: "600",
    color: "#52525B",
  },
  highlight: {
    color: "#F59E0B",
  },
});

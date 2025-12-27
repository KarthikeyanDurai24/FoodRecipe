import { View, Text, ScrollView, Image, StyleSheet } from "react-native"; 
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/categories";
import FoodItems from "../components/recipes";

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Chicken");
  const [foods, setFoods] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error(err));
  }, []);

  // Fetch foods whenever category changes
  useEffect(() => {
    if (activeCategory) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
        .then(res => res.json())
        .then(data => setFoods(data.meals))
        .catch(err => console.error(err));
    }
  }, [activeCategory]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

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
            handleChangeCategory={handleChangeCategory} // pass correct prop name
          />
        </View>

        {/* Food Items */}
        <View testID="foodList">
          <FoodItems foods={foods} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: { paddingBottom: 50, paddingTop: hp(14) },
  headerContainer: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  avatar: { height: hp(5), width: hp(5.5) },
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
  titleContainer: { marginHorizontal: wp(4), marginBottom: hp(2) },
  title: { fontSize: hp(3.8), fontWeight: "600", color: "#52525B" },
  subtitle: { fontSize: hp(3.8), fontWeight: "600", color: "#52525B" },
  highlight: { color: "#F59E0B" },
});

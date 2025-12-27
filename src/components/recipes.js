import { View, Text, Pressable, Image, StyleSheet, FlatList } from "react-native"; 
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
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
        contentContainerStyle={{ paddingBottom: hp(5) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const ArticleCard = ({ item, navigation }) => {
  return (
    <Pressable
      style={styles.cardContainer}
      testID="articleDisplay"
      onPress={() => navigation.navigate("RecipeDetail", item)}
    >
      {item.strMealThumb && (
        <Image source={{ uri: item.strMealThumb }} style={styles.articleImage} />
      )}
      <Text style={styles.articleText}>{item.strMeal}</Text>
      <Text style={styles.articleDescription} numberOfLines={2}>
        {item.strInstructions || "No description available."}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(2),
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: wp(2),
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  articleImage: {
    width: "100%",
    height: hp(25),
    borderRadius: 20,
    marginBottom: hp(1),
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#52525B",
    marginBottom: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.6),
    color: "#6B7280",
  },
});

import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import { useSelector } from "react-redux";
  import { useNavigation } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  export default function FavoriteScreen() {
    const navigation = useNavigation();
    const favorites = useSelector(
      (state) => state.favorites.favoriterecipes
    );
  
    return (
      <View style={styles.container}>
        {/* ===== Header ===== */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
  
          <Text style={styles.headerTitle}>My Favourite Recipes</Text>
  
          {/* Spacer to balance header */}
          <View style={{ width: wp(15) }} />
        </View>
  
        {/* ===== Empty State ===== */}
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorite recipes yet ❤️</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.idMeal}
            contentContainerStyle={{ padding: wp(4) }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("RecipeDetail", item)}
              >
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={styles.image}
                />
                <Text style={styles.title}>{item.strMeal}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  
    /* ===== Header Styles ===== */
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: wp(4),
      paddingTop: hp(5),
      paddingBottom: hp(2),
      justifyContent: "space-between",
    },
    headerTitle: {
      fontSize: hp(2.6),
      fontWeight: "bold",
      color: "#4B5563",
    },
    backButton: {
      padding: 10,
      backgroundColor: "#ffffff",
      borderRadius: 20,
      elevation: 2,
    },
    backButtonText: {
      fontSize: hp(2),
      fontWeight: "bold",
    },
  
    /* ===== Cards ===== */
    card: {
      backgroundColor: "#fff",
      borderRadius: 15,
      marginBottom: hp(2),
      padding: wp(2),
      elevation: 2,
    },
    image: {
      width: "100%",
      height: hp(25),
      borderRadius: 10,
    },
    title: {
      marginTop: hp(1),
      fontSize: hp(2),
      fontWeight: "600",
      color: "#52525B",
    },
  
    /* ===== Empty State ===== */
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      fontSize: hp(2),
      color: "#9CA3AF",
    },
  });

import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Alert } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import colors from "../config/colors";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import routes from "../navigation/routes";
import listingApi from "../api/foodListings";

function search(nameKey, myArray) {
  var a = new Array();
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].category === nameKey) {
      a.push(myArray[i]);
    }
  }
  return a;
}

function AdminEdit({ navigation }) {
  const handleDelete = (item) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure, you want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const response = await listingApi.deleteListing(item._id);
            if (!response.ok) {
              alert("Unable to delete." + "\n" + response.data);
            } else {
              alert("Deleted Successfully");
              setFoodItems(foodItems.filter((food) => food._id !== item._id));
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadFood();
  }, []);

  const loadFood = async () => {
    try {
      const response = await listingApi.getFoodItems();
      const food = response.data;
      setFoodItems(food);
      let temp = [];
      for (let i = 0; i < food.length; i++) {
        temp.push(food[i].category);
      }
      setCategories([...new Set(temp)]);
    } catch (error) {
      console.log(error);
    }
  };

  const ItemList = (category) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="caretright" color={colors.primary} size={20} />
        <AppText style={styles.category}>{category}</AppText>
      </View>
      <Collapsible collapsed={false}>
        <FlatList
          data={search(category, foodItems)}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.detailsContainer}>
              {(item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )) || (
                <Image
                  source={require("../assets/burger.jpg")}
                  style={styles.image}
                />
              )}
              <View style={styles.card}>
                <AppText style={styles.title}>{item.title}</AppText>
                <AppText style={styles.price}>₹{item.price}</AppText>
                {item.description && (
                  <AppText numberOfLines={2} style={styles.description}>
                    {item.description}
                  </AppText>
                )}
              </View>

              <Menu onSelect={(value) => alert(value)}>
                <MenuTrigger>
                  <MaterialCommunityIcons name="dots-vertical" size={35} />
                </MenuTrigger>
                <MenuOptions numberOfLines={2}>
                  <MenuOption
                    value={"Update"}
                    style={{
                      backgroundColor: colors.light,
                      borderBottomWidth: 0.5,
                      borderColor: colors.medium,
                    }}
                    onSelect={() =>
                      navigation.navigate(routes.ADMIN_LISTING_UPDATE, item)
                    }
                  >
                    <AppText style={{ margin: 5 }}>Update</AppText>
                  </MenuOption>
                  <MenuOption
                    value={"Delete"}
                    style={{ backgroundColor: colors.light }}
                    onSelect={() => handleDelete(item)}
                  >
                    <AppText style={{ margin: 5 }}>Delete</AppText>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          )}
        />
      </Collapsible>
    </View>
  );
  return (
    <Screen>
      <MenuProvider>
        <FlatList
          // data={["Snacks", "Veg", "NonVeg"]}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => ItemList(item)}
        />
      </MenuProvider>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    padding: 10,
  },
  detailsContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    borderRadius: 15,
    height: 70,
    marginRight: 10,
    width: 70,
  },
  price: {
    color: colors.secondary,
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: colors.medium,
    fontSize: 14,
  },
});

export default AdminEdit;

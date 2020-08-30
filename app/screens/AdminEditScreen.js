import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Text,
  Button,
  Settings,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import colors from "../config/colors";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import routes from "../navigation/routes";
import listingApi from "../api/foodListings";
import AuthContext from "../auth/context";

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
  const { user } = useContext(AuthContext);
  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
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
            setLoading(true);
            const response = await listingApi.deleteListing(item._id);
            setLoading(false);
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
  const loadFood = async () => {
    try {
      setLoading(true);
      const response = await listingApi.getFoodItems(user.hall);
      const food = await response.data;
      console.log(food);
      setLoading(false);
      setFoodItems(food);
      let set = new Set();
      // console.log(food);
      // console.log(food2);
      for (let i = 0; i < food.length; i++) {
        set.add(food[i].category);
      }
      setCategories(Array.from(set));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadFood();
    console.log("chl rha h");
  }, []);

  const ItemList = (category) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="caretright" color={colors.primary} size={20} />
        <AppText style={styles.category}>{category}</AppText>
      </View>
      <Collapsible collapsed={false}>
        <FlatList
          data={search(category, foodItems)}
          keyExtractor={(item) => item._id}
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
    <>
      {loading && <ActivityIndicator visible={loading} />}
      {!loading && (
        <Screen>
          <MenuProvider>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => ItemList(item)}
              refreshing={refreshing}
              onRefresh={() => {
                loadFood();
              }}
            />
          </MenuProvider>
        </Screen>
      )}
    </>
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

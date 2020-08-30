import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image as ImageReact,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "react-native-vector-icons/Entypo";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, addFromOtherHall } from "../store/actions/mealsaction";
import AppText from "./AppText";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";
function search(nameKey, myArray) {
  var a = new Array();
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].userEmail == nameKey) {
      a.push(myArray[i]);
    }
  }
  console.log(a)
  return a;
}

function FoodItemCollapsible({ foods, category }) {
  // const cartItems = useSelector((state) => state.meals.cart);
  const [collapsed, setCollapsed] = useState(true);
  const [icon, setIcon] = useState("caretright");
  const items = search(category, foods);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
    setIcon(collapsed ? "caretdown" : "caretright");
  };

  // const dispatch = useDispatch();
  // const addToCartHandler = (item) => {
  //   if (cartItems.length == 0 || cartItems[0].hall == item.hall) {
  //     dispatch(addToCart(item));
  //   } else {
  //     Alert.alert(
  //       "Replace cart item?",
  //       "Your cart contains items from other canteen. Do you want to discard the selection and add new item?",
  //       [
  //         {
  //           text: "No",
  //           onPress: () => {
  //             console.log("No pressed");
  //           },
  //         },
  //         {
  //           text: "Yes",
  //           onPress: () => {
  //             dispatch(addFromOtherHall(item));
  //           },
  //         },
  //       ]
  //     );
  //   }
  // };
  const renderItem = (item) => (
    <TouchableWithoutFeedback
      onPress={() =>
        console.log("aa")
      }
    >
      <View style={styles.Maincontainer}>
        <Text style={{ color: "#aaa" }}>Items</Text>

        <AppText style={{ fontSize: 15, fontWeight: "800" }}>
          {item.items[0].id}.... Click to view more items...
        </AppText>
        <Text style={{ color: "#aaa" }}>ORDERED ON</Text>
        {/* <AppText style={{ fontSize: 15, fontWeight: "800" }}>
          {item.time.split("T")[0]} {item.time.split("T")[1]}
        </AppText> */}
        <Text style={{ color: "#aaa" }}>Total Amount</Text>
        {/* <AppText style={{ fontSize: 15, fontWeight: "bold", color: "green" }}>
          ₹{item.totalPrice}
        </AppText> */}
        <Text style={{ color: "#aaa" }}>Payment Method</Text>
        {/* <AppText style={{ fontSize: 15, fontWeight: "bold" }}>
          {item.payment_method}
        </AppText> */}
        {/* {!item.isDineIn ? (
          <>
            <Text style={{ color: "#aaa" }}>Room</Text>
            <AppText style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.room}
            </AppText>
          </>
        ) : (
          <Text> dine in</Text>
        )}
        {(() => {
          switch (item.orderStatus) {
            case 0:
              return (
                <MaterialCommunityIcons
                  name="progress-clock"
                  size={30}
                  color={colors.medium}
                />
              );
            case 1:
              return (
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  color={colors.danger}
                />
              );
            case 2:
              return (
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={30}
                  color={colors.cashGreen}
                />
              );
            default:
              return null;
          }
        })()} */}
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCollapse}>
        <View style={styles.header}>
          <AntDesign name={icon} color={colors.primary} size={20} />
          <AppText style={styles.category}>{category}</AppText>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderItem(item)}
          // refreshing={refreshing}
          // onRefresh={() => getData()}
        />
      </Collapsible> 
    </View>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    borderRadius: 15,
    backgroundColor: colors.light,
    // borderWidth: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
    borderColor: "#ccc",
    margin: 10,

    overflow: "hidden",
    padding: 10,
  },
  card: {
    flex: 1,
    paddingBottom: 40,
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    padding: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    marginVertical: 1,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    borderRadius: 5,
    height: 60,
    marginRight: 10,
    width: 60,
  },
  price: {
    color: colors.secondary,
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: colors.medium,
    fontSize: 14,
  },
});

export default FoodItemCollapsible;

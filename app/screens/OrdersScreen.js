import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AuthContext from "../auth/context";
import orderApi from "../api/orders";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Entypo from 'react-native-vector-icons/Entypo';

import listings from "../Data/halls";

function OrderScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const history = [
    {
      items: [
        { id: "5f36ac1d11aadbd1d82da6e1", quantity: 1 },
        { id: "5f36ac2211aadbd1d82da6e2", quantity: 1 },
      ],
      // time: { $date: { $numberLong: "1598703953984" } },
      orderStatus: 0,
      _id:  "5f4a495b6a476ea06d3c4b66" ,
      isDelivery: false,
      payment_method: "account",
      room: "",
      totalPrice: 100,
      hall:2
    },
    {
      items: [
        { id: "5f36ac2211aadbd1d82da6e2", quantity: 1 },
        { id: "5f36ac1d11aadbd1d82da6e1", quantity: 1 },
      ],
      // time: { $date: { $numberLong: "1598700003950" } },
      orderStatus: 1,
      _id: "5f4a3dfec2d48495ff2a0345" ,
      isDelivery: false,
      payment_method: "account",
      room: "",
      totalPrice: 100,
      hall:1
    },
    {
      items: [
        { id: "5f36ac1d11aadbd1d82da6e1", quantity: 1 },
      ],
      // time: { $date: { $numberLong: "1598700003950" } },
      orderStatus: 2,
      _id: "5f4a3df1c2d48495ff2a0343" ,
      isDelivery: false,
      payment_method: "account",
      room: "",
      totalPrice: 50,
      hall:1
    }
  ]
  const renderItem = (item) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(routes.ORDERS_SUMMARY,item.items)}
    >
      <View style={styles.Maincontainer}>
        <View style={styles.detailsContainer}>
          <Image
            source={listings.find((element) => element.id === item.hall).image}
            style={styles.image}
          />

          <View style={styles.card}>
            <AppText style={styles.title}>Hall {item.hall}</AppText>
          </View>
        </View>
        <ListItemSeparator style={{ backgroundColor: colors.dark }} />
        <Text style={{ color: "#aaa" }}>Items</Text>
        <AppText style={{ fontSize: 15, fontWeight: "800" }}>
          Click to view more items...
        </AppText>
        {/* <Text style={{ color: "#aaa" }}>ORDERED ON</Text>
        <AppText style={{ fontSize: 15, fontWeight: "800" }}>
          {item.time.split("T")[0]},{item.time.split("T")[1]}
        </AppText> */}
        <Text style={{ color: "#aaa" }}>Total Amount</Text>
        <AppText style={{ fontSize: 15, fontWeight: "bold", color: "green" }}>
          ₹{item.totalPrice}
        </AppText>
        <Text style={{ color: "#aaa" }}>Payment Method</Text>
        <AppText style={{ fontSize: 15, fontWeight: "bold" }}>
          {item.payment_method}
        </AppText>
        {!item.isDineIn ? (
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
            return <Entypo name='circle-with-cross' size={30} color={colors.danger}/>;
          case 1:
            return  <MaterialCommunityIcons
            name="progress-clock"
            size={30}
            color={colors.medium}
          />;
          case 2:
            
            return <MaterialCommunityIcons
            name="check-decagram"
            size={30}
            color={colors.cashGreen}
          />;
          default:
            return null;
        }
      })()}
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView>
      
      <FlatList
        data={history}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => renderItem(item)}
        // refreshing={refreshing}
        // onRefresh={() => <Text>aba</Text>}
      />
    </SafeAreaView>
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

export default OrderScreen;
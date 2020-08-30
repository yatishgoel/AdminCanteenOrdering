import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "react-native-vector-icons/Entypo";
import url from "../keys/url";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import historyApi from "../api/history";
function OrderScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    var interval;
    interval = setInterval(() => {
      pendingOrders();
    }, 10000);
    return () => clearInterval(interval);
  }, [history]);

  const pendingOrders = async () => {
    setLoading(true);
    const response = await historyApi.getPendingOrders(user._id);
    setLoading(false);
    if (response.ok) setHistory(response.data);
  };

  const renderItem = (item) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(routes.ORDERS_SUMMARY, {
          data: item.items,
          ID: item._id,
        })
      }
    >
      <View style={styles.Maincontainer}>
        <Text style={{ color: "#aaa" }}>Items</Text>

        <AppText style={{ fontSize: 15, fontWeight: "800" }}>
          {item.items[0].title}.... Click to view more items...
        </AppText>
        <Text style={{ color: "#aaa" }}>ORDERED ON</Text>
        <AppText style={{ fontSize: 15, fontWeight: "800" }}>
          {/* {item.time.split("T")[0]} {item.time.split("T")[1]} */}
          {new Date(item.time).toLocaleString()}
        </AppText>
        <Text style={{ color: "#aaa" }}>Total Amount</Text>
        <AppText style={{ fontSize: 15, fontWeight: "bold", color: "green" }}>
          ₹{item.totalPrice}
        </AppText>
        <Text style={{ color: "#aaa" }}>Payment Method</Text>
        <AppText style={{ fontSize: 15, fontWeight: "bold" }}>
          {item.payment_method}
        </AppText>
        {item.isDelivery ? (
          <>
            <Text style={{ color: "#aaa" }}>Room</Text>
            <AppText style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.room}
            </AppText>
          </>
        ) : (
          <Text> Dine in</Text>
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
        })()}
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <Screen>
      <Text style={styles.title}>Hall {user.hall}</Text>
      {loading && <ActivityIndicator visible={loading} />}
      {!loading && (
        <FlatList
          data={history}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderItem(item)}
          refreshing={refreshing}
          onRefresh={() => pendingOrders()}
        />
      )}
    </Screen>
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

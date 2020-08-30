import React, { useState, useEffect, useContext } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import FoodItemListing from "../components/FoodItemListing";
import historyApi from "../api/history";
// import listingApi from "../api/foodListings";
// import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
// import { combineReducers } from "redux";
import AuthContext from "../auth/context";
function OnlineCheckBook({ route, navigation }) {
  useEffect(() => {
    loadHistory();
  }, []);

  // const hallNum = listing.title.match(/(\d+)/)[0];
  const [foodItems, setFoodItems] = useState([]);
  const { user } = useContext(AuthContext);
  const [Id, setID] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const loadHistory = async () => {
    setLoading(true);
    const response = await historyApi.getHistory(user._id);
    setLoading(false);
    if (response.ok) {
      setData(response.data);
      let k = response.data;
      let temp = [];
      for (let i = 0; i < k.length; i++) {
        temp.push(k[i].userEmail);
      }
      setID([...new Set(temp)]);
      console.log(Id);
    }
  };

  return (
    <>
      {error && (
        <View style={{ padding: 20, alignItems: "center" }}>
          <AppText style={{ textAlign: "center" }}>
            Unable to fetch data
          </AppText>
          <AppButton title="Retry" width="60%" onPress={() => loadFood()} />
        </View>
      )}
      {!error && (
        <>
          {loading && <ActivityIndicator visible={loading} />}
          {!loading && (
            <FoodItemListing
              data={data}
              categories={Id}
              // ListHeaderComponent={headerContent}
              refreshing={refreshing}
              onRefresh={() => loadHistory()}
            />
          )}
        </>
      )}
      {/* {Id!=null ?
      <Text>dcbdbc</Text>
      :
      <Text>no</Text>

      } */}
    </>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default OnlineCheckBook;

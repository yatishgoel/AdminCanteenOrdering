import React, { useState, useEffect, useContext } from "react";

import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Container, Content, Text, List } from "native-base";
import axios from "axios";
import colors from "../config/colors";
import AppText from "../components/AppText";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AuthContext from "../auth/context";

import listings from "../Data/halls";

import ngrokUrl from "../keys/url";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Entypo from "react-native-vector-icons/Entypo";

import Spinner from "react-native-loading-spinner-overlay";
import routes from "../navigation/routes";




export default function UserAdminHistory({navigation,route}) {
    const bnda = route.params;
  navigation.setOptions({
    title: bnda.name,
  });
  useEffect(() => {
    fetchData();
  }, []);
  const { user, setUser } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [showLoadingMore, setShowLoadingMore] = useState(false);
  const [data2, setData2] = useState([]);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [dataReceived, setDataReceived] = useState(false);

  const fetchData = () => {
    if (pageNo != 1) {
      setShowLoadingMore(true);
    }
    setLoading(true);

    console.log(ngrokUrl.ngrokUrl, user._id);
    var url =
      ngrokUrl.ngrokUrl +
      
      "admin_user/fetch-paginated-data/"+bnda.id+"/"+user.hall+"?pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.list);
          //add data to list and change the state to render new content
          let receivedDataList = response.data.list;
          console.log(response.data.list)
          let currentDataList = data2;
          //append to existing list
          let newDataList = currentDataList.concat(receivedDataList);
          //render new list
          //once new list is set we are ready to load more data if bottom is reached
          let loadMoreData = true;
          setPageNo(pageNo + 1);
          setData2(newDataList);
          setDataReceived(true);
          setLoadMoreData(loadMoreData);
          setShowLoadingMore(false);
        } else {
          //no more data to be loaded
          setShowLoadingMore(false);
        }
        setLoading(false);
        console.log(data2);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 40;
    let result =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    //true if the end is reached other wise false
    return result;
  };

  //initially display loader at the center
  let listSection = <></>;
  if (dataReceived) {
    if (data2.length > 0) {
      listSection = data2.map((record) => {
        return (
          <TouchableWithoutFeedback
            key={record._id}
            onPress={() =>
              navigation.navigate(routes.USER_ADMIN_HISTORY_DETAILS,record.items)
            // console.log(record.items)
            }
          >
            <View style={styles.Maincontainer}>
              {/* <View style={styles.detailsContainer}>
                <Image
                  source={
                    listings.find((element) => element.id === record.hall).image
                  }
                  style={styles.image}
                />

                <View style={styles.card}>
                  <AppText style={styles.title}>Hall {record.hall}</AppText>
                </View>
              </View>
              <ListItemSeparator style={{ backgroundColor: colors.dark }} /> */}
              <Text style={{ color: "#aaa" }}>Items</Text>
              <AppText style={{ fontSize: 15, fontWeight: "800" }}>
                Click to view more items...
              </AppText>
              <Text style={{ color: "#aaa" }}>ORDERED ON</Text>
              <AppText style={{ fontSize: 15, fontWeight: "800" }}>
                {new Date(record.time).toLocaleString()}
              </AppText>
              <Text style={{ color: "#aaa" }}>Total Amount</Text>
              <AppText
                style={{ fontSize: 15, fontWeight: "bold", color: "green" }}
              >
                ₹{record.totalPrice}
              </AppText>
              <Text style={{ color: "#aaa" }}>Payment Method</Text>
              <AppText style={{ fontSize: 15, fontWeight: "bold" }}>
                {record.payment_method}
              </AppText>
              {record.isDelivery ? (
                <>
                  <Text style={{ color: "#aaa" }}>Room</Text>
                  <AppText style={{ fontSize: 15, fontWeight: "bold" }}>
                    {record.room}
                  </AppText>
                </>
              ) : (
                <Text> Dine in</Text>
              )}
              {(() => {
                switch (record.orderStatus) {
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
      });
    } else {
      listSection = null;
    }
  }

  if (dataReceived && data2.length == 0) {
    return (
      <View style={styles.container}>
        <Text>No records to display</Text>
      </View>
    );
  } else {
    return (
      <Container style={{ marginTop: 1 }}>
        <Spinner
          visible={loading && pageNo === 1}
          size="large"
          animation="fade"
          cancelable={true}
        />
        <Content
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              //prevent multiple hits for same page number
              if (loadMoreData) {
                //bottom reached start loading data

                setLoadMoreData(false);
                fetchData();
              }
            }
          }}
        >
          <List>{listSection}</List>
          {showLoadingMore ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null}
        </Content>
      </Container>
    );
  }
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
  // container: {
  //   padding: 10,
  // },
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

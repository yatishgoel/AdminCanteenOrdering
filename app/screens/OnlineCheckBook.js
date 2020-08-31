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
import AuthContext from "../auth/context";


import Spinner from "react-native-loading-spinner-overlay";

import ngrokUrl from "../keys/url";
import AppText from "../components/AppText";
import { TouchableOpacity } from "react-native-gesture-handler";
import routes from "../navigation/routes";

function OnlineCheckBook({ route, navigation }) {
  useEffect(() => {
    fetchData();
  }, []);
  const { user, setUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(4);
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
      "admin/fetch-paginated-data/"+user.hall+"?pageNo=" +
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
          console.log("nb hjhbhuu",response.data.list)
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
         
          <TouchableOpacity key={record.id} onPress = {() => navigation.navigate(routes.USER_ADMIN_HISTORY,record)}>

          <View style={styles.detailsContainer} key={record.id}>
      {(record.image && (
        <Image source={{ uri: record.image }} style={styles.image} />
        )) || (
        <Image source={require("../assets/profile-pic-dummy.png")} style={styles.image} />
      )}
      <View style={{ flexDirection: "row-reverse", flex: 1 }}>
        <AppText style={{ paddingRight: 15 }}>
          {record.room}
        </AppText>
        <View style={styles.card}>
          <AppText style={styles.title}>
            {record.name}
          </AppText>
        
        </View>
        
      </View>
    </View>
        
          </TouchableOpacity>
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
  room:{
    paddingTop:10,
    fontWeight: "bold"
  },
  detailsContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    padding:10
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
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: colors.medium,
    fontSize: 14,
  },
});

export default OnlineCheckBook;

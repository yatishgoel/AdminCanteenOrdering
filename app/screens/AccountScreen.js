import React from "react";
import { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const menuItems = [
  {
    title: "Online Khata",
    icon: {
      name: "credit-card-multiple",
      backgroundColor: colors.cashGreen,
    },
    targetScreen: routes.ONLINE_CHECKBOOK,
  },
];

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          // image={require("../assets/mosh.jpg")}
          image={{ uri: user.imagePath }}
          onPress={() => navigation.navigate("AccountDetails")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;

import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import routes from "./routes";
import AccountDetails from "../screens/AccountDetailsScreen";
import OnlineCheckBook from "../screens/OnlineCheckBook";
import UserAdminHistory from "../screens/UserAdminHistory";
import AdminUserOrderDetails from "../screens/AdminUserOrderDetails";


const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    mode="card"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    <Stack.Screen name={routes.ONLINE_CHECKBOOK} component={OnlineCheckBook} />
    <Stack.Screen name={routes.USER_ADMIN_HISTORY_DETAILS} component={AdminUserOrderDetails} options={{
        title: "Details",
      }} />
    <Stack.Screen name={routes.USER_ADMIN_HISTORY} component={UserAdminHistory} options={{
        title: "",
      }} />
    <Stack.Screen
      name={routes.ACCOUNT_DETAILS}
      component={AccountDetails}
      options={{
        title: "Account Details",
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;

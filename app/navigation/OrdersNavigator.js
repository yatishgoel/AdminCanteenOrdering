import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import routes from "./routes";

import OrderSummaryScreen from "../screens/OrderSummaryScreen";
import OrderScreen from "../screens/OrdersScreen";

const Stack = createStackNavigator();

const OrderNavigator = () => (
  <Stack.Navigator
    mode="card"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen
      name={routes.ORDERS}
      component={OrderScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name={routes.ORDERS_SUMMARY}
      component={OrderSummaryScreen}
      options={{
        title: "Order Summary",
      }}
    />
  </Stack.Navigator>
);

export default OrderNavigator;

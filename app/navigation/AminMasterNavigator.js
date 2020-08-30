import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import AccountNavigator from "./AccountNavigator";
import routes from "./routes";

import { View, Text } from "react-native";
import colors from "../config/colors";

import AdminAdder from "../screens/AdminAdderScreen";

import AdminEditNavigator from "./AdminEditNavigtor";
import OrdersScreen from "../screens/OrdersScreen";
import OrderNavigator from "./OrdersNavigator";
import useNotifications from "../hooks/useNotifications";
const Tab = createBottomTabNavigator();

const AdminMasterNavigator = () => {
  useNotifications();
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name={routes.ORDERS}
        component={OrderNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="truck-delivery"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={AdminAdder}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="upload" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={AdminEditNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="square-edit-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminMasterNavigator;

import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";

import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    mode="card"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen
      name={routes.WELCOME}
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;

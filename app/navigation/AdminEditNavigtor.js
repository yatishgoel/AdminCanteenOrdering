import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import AdminAdder from "../screens/AdminAdderScreen";
import AdminEdit from "../screens/AdminEditScreen";
import AdminUpdate from "../screens/AdminUpdateScreen";

const Stack = createStackNavigator();

const AdminEditNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.ADMIN_LISTING_EDIT}
      component={AdminEdit}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.ADMIN_LISTING_UPDATE}
      component={AdminUpdate}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AdminEditNavigator;

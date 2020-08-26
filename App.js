import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import mealsReducer from "./app/store/reducers/meals";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import jwtDecode from "jwt-decode";

import AdminMasterNavigator from "./app/navigation/AminMasterNavigator";

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [user, setUser] = useState();

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    console.log(token, "retrived authToken");
    if (!token) return;
    setUser(jwtDecode(token));
  };

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Provider store={store}>
        <NavigationContainer theme={navigationTheme}>
          {user ? <AdminMasterNavigator /> : <AuthNavigator />}
          {/* <AuthNavigator /> */}
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
    // <View>
    //   <AppImageInput onChangeImage={setIm} imageUri={im}></AppImageInput>
    // </View>
  );
}

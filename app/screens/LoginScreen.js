import React, { useState } from "react";
import { useContext } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import authStorage from "../auth/storage";
import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppErrorMessage,
} from "../components/forms";
import Spinner from "react-native-loading-spinner-overlay";
import AuthContext from "../auth/context";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [loginFailed, SetLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (userDetails) => {
    setLoading(true);
    const response = await authApi.loginUser(JSON.stringify(userDetails));
    console.log(response);
    setLoading(false);
    if (!response.ok) {
      setErrorMessage(response.data);
      return SetLoginFailed(true);
    }
    const userData = response.data;
    SetLoginFailed(false);
    const user = jwtDecode(userData);
    authContext.setUser(user);
    console.log(user);
    authStorage.storeToken(userData);
  };

  return (
    <Screen style={styles.container}>
      <Spinner
        visible={loading}
        size="large"
        animation="fade"
        cancelable={true}
      />
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <AppErrorMessage error={errorMessage} visible={loginFailed} />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;

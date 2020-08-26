import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import registerApi from "../api/auth";
import Spinner from "react-native-loading-spinner-overlay";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  hall: Yup.number().required().label("Hall"),
  room: Yup.string()
    .required()
    .matches(/[A-G]{1}[0-9]{3}/)
    .min(1)
    .label("Room"),
  mobile: Yup.string()
    .length(10)
    .matches(/^[0-9]*$/, "Enter a valid mobile number")
    .required()
    .label("Mobile"),
  image: Yup.object().nullable().label("User Image"),
});

function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={loading}
        size="large"
        animation="fade"
        cancelable={true}
      />
      <AppForm
        initialValues={{
          name: "",
          rollNo: "",
          hall: "",
          room: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          image: null,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          const response = await registerApi.registerUser(values);
          setLoading(false);
          if (response.ok) navigation.navigate("OTP", response.data);
          else alert(response.data);
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <AppFormImagePicker name="image" />
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          keyboardType="phone-pad"
          maxLength={255}
          name="mobile"
          placeholder="Mobile"
          icon="phone-classic"
        />
        <FormField maxLength={255} name="hall" placeholder="Hall" icon="home" />
        <FormField
          maxLength={255}
          name="room"
          placeholder="Room"
          icon="room-service"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </AppForm>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;

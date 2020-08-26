import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import AuthContext from "../auth/context";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().email().required().label("Email"),
  mobile: Yup.string()
    .length(10)
    .matches(/^[0-9]*$/, "Enter a valid mobile number")
    .required()
    .label("Mobile"),
  hall: Yup.number().required().label("Hall"),
  image: Yup.object().nullable().label("User Image"),
  room: Yup.string().required().min(1).label("Room"),
  // image: Yup.object().nullable().label("Image"),
});

function AccountDetails() {
  const { user, setUser } = useContext(AuthContext);
  const [editMobile, setEditMobile] = useState(false);
  const handleEdit = (current, handler) => {
    handler(!current);
  };

  return (
    <ScrollView style={styles.container}>
      <Form
        initialValues={{
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          hall: user.hall,
          room: user.room,
          image: user.imagePath,
        }}
        onSubmit={async (values) => {
          const newUser = await authApi.updateUser(values);
          setUser(newUser.data);
        }}
        validationSchema={validationSchema}
      >
        <AppFormImagePicker name="image" />
        {/* <Picker items={Halls} name="hall" placeholder="Hall" /> */}
        <FormField
          defaultValue={user.name}
          maxLength={255}
          name="name"
          placeholder="Full Name"
          editable={false}
          icon="account"
        />
        <FormField
          defaultValue={user.email}
          maxLength={255}
          name="email"
          placeholder="Email"
          icon="email"
          editable={false}
        />
        <FormField
          defaultValue={"Hall " + user.hall}
          maxLength={255}
          name="hall"
          placeholder="Hall"
          icon="home"
          editable={false}
        />
        <FormField
          defaultValue={user.room}
          maxLength={255}
          name="room"
          placeholder="Room"
          icon="room-service"
          editable={false}
        />
        <View>
          <TouchableOpacity
            onPress={() => handleEdit(editMobile, setEditMobile)}
            style={{ position: "absolute", zIndex: 10, top: 27, right: 25 }}
          >
            {!editMobile && (
              <AppText style={{ color: "dodgerblue" }}>Edit</AppText>
            )}
            {editMobile && (
              <MaterialCommunityIcons
                name="close-circle"
                color={colors.medium}
                size={20}
              />
            )}
          </TouchableOpacity>
          <FormField
            defaultValue={user.mobile}
            keyboardType="phone-pad"
            maxLength={255}
            name="mobile"
            placeholder="Mobile"
            icon="phone-classic"
            editable={editMobile}
          />
        </View>
        <SubmitButton title="update" />
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default AccountDetails;

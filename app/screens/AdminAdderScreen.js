import React from "react";
import { StyleSheet, Button, Alert, ScrollView } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import listingApi from "../api/foodListings";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("description"),
  hall: Yup.object().required().nullable().label("Category"),
  image: Yup.object().nullable().label("Image"),
});

const Halls = [
  { label: "Hall 1", value: 1 },
  { label: "Hall 2", value: 2 },
  { label: "Hall 3", value: 3 },
  { label: "Hall 4", value: 4 },
  { label: "Hall 5", value: 5 },
  { label: "Hall 6", value: 6 },
  { label: "Hall 7", value: 7 },
  { label: "Hall 8", value: 8 },
  { label: "Hall 9", value: 9 },
  { label: "Hall 10", value: 10 },
  { label: "Hall 11", value: 11 },
  { label: "Hall 12", value: 12 },
  { label: "Hall 13", value: 13 },
];

// var data;
// import url from "../keys/url";
// let putMethod = async (c) => {
//   try {
//     let result = await fetch(url.ngrokurl + "/menu", {
//       method: "PUT", // Method itself
//       headers: {
//         "Content-type": "application/json; charset=UTF-8", // Indicates the content
//       },
//       body: JSON.stringify(c), // We send data in JSON format
//     });
//     const data2 = await result.json();
//     console.log(data2);
//   } catch (e) {
//     console.log(e);
//   }
// };
// let postData = async (c) => {
//   try {
//     let result = await fetch(url.ngrokurl + "/menu", {
//       method: "post",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(c),
//     });
//     console.log(JSON.stringify(c));
//     data = await result.json();
//     putMethod(data);
//     console.log(data);
//     console.log("done");
//   } catch (e) {
//     console.log(e);
//   }
// };

const postFood = async (c) => {
  try {
    const response = await listingApi.addFoodListing(c);
    console.log(c);
    if (!response.ok) {
      alert("Unable to post." + "\n" + response.data);
    } else {
      alert("Posted Successfully");
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

function AdminAdder({ navigation }) {
  return (
    <ScrollView>
      <Screen style={styles.container}>
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            hall: null,
            category: "",
            image: null,
          }}
          onSubmit={(values) => {
            values.hall = values.hall.value;
            postFood(values);
            console.log("posted");
          }}
          validationSchema={validationSchema}
        >
          <AppFormImagePicker name="image" />
          <Picker items={Halls} name="hall" placeholder="Hall" />
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField maxLength={255} name="category" placeholder="Category" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
          />

          <FormField
            maxLength={255}
            name="description"
            placeholder="Description"
          />
          <SubmitButton title="add" />
        </Form>
        {/* <AppButton
          color="secondary"
          onPress={() => navigation.navigate("AdminEdit")}
          title="View all items"
        /> */}
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default AdminAdder;

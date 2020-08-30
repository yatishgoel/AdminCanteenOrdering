import React, { useState } from "react";
import { StyleSheet, Button, Image } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import listingApi from "../api/foodListings";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.string().required().label("Category"),
  // hall: Yup.object().required().nullable().label("Category"),
  // image: Yup.object().nullable().label("Image"),
});

// const Halls = [
//   { label: "Hall 1", value: 1 },
//   { label: "Hall 2", value: 2 },
//   { label: "Hall 3", value: 3 },
//   { label: "Hall 4", value: 4 },
//   { label: "Hall 5", value: 5 },
//   { label: "Hall 6", value: 6 },
//   { label: "Hall 7", value: 7 },
//   { label: "Hall 8", value: 8 },
//   { label: "Hall 9", value: 9 },
//   { label: "Hall 10", value: 10 },
//   { label: "Hall 11", value: 11 },
//   { label: "Hall 12", value: 12 },
//   { label: "Hall 13", value: 13 },
// ];

function AdminUpdate({ navigation, route }) {
  const item = route.params;
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (value) => {
    value.hall = item.hall;
    try {
      setLoading(false);
      const response = await listingApi.updateListing(item._id, value);
      if (!response.ok) {
        alert("Unable to update." + "\n" + response.data);
      } else {
        alert("Updated Successfully");
        navigation.reset({
          index: 0,
          routes: [{ name: "AdminEdit" }],
        });
        navigation.navigate("AdminEdit");
      }
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading && <ActivityIndicator visible={loading} />}

      {!loading && (
        <Screen style={styles.container}>
          <Form
            initialValues={{
              title: item.title,
              category: item.category,
              price: item.price,
              description: item.description,
              image: item.image,
            }}
            onSubmit={(values) => {
              handleUpdate(values);
            }}
            validationSchema={validationSchema}
          >
            <AppFormImagePicker name="image" />
            <FormField
              defaultValue={item.title}
              maxLength={255}
              name="title"
              placeholder="Title"
            />
            <FormField
              defaultValue={item.category}
              maxLength={255}
              name="category"
              placeholder="Category"
            />
            <FormField
              defaultValue={item.price.toString()}
              keyboardType="numeric"
              maxLength={8}
              name="price"
              placeholder="Price"
            />

            <FormField
              defaultValue={item.description}
              maxLength={255}
              name="description"
              placeholder="Description"
            />
            <SubmitButton title="update" />
          </Form>
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default AdminUpdate;

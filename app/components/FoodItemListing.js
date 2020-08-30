import React from "react";
import { FlatList,Text } from "react-native";

import FoodItemCollapsible from "./FoodItemCollapsible";

function FoodItemListing({ data, categories, ...otherProps }) {
  // let categories = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i].category in categories) {
  //     continue;
  //   }
  //   categories.push(data[i].category);
  // }
  return (
    <FlatList
      // data={["Snacks", "Veg", "NonVeg"]}
      data={categories}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        // <Text>{item}</Text>
        // console.log(item)
        <FoodItemCollapsible category={item} foods={data} />
      )}
      {...otherProps}
    />
  );
}

export default FoodItemListing;

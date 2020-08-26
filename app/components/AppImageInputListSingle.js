import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppImageInput from "./AppImageInput";

function AppImageInputSingle({ imageUris = [], onAddImage, onRemoveImage }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <AppImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          {!imageUris[0] && (
            <AppImageInput onChangeImage={(uri) => onAddImage(uri)} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default AppImageInputSingle;

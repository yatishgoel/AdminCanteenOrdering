import React from "react";
import { useFormikContext } from "formik";

import AppImageInputList from "../AppImageInputList";
import AppErrorMessage from "./AppErrorMessage";

function AppFormMultipleImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const handleAdd = (uri) => {
    setFieldValue(name, [...values[name], uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      values[name].filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <AppImageInputList
        imageUris={values[name]}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormMultipleImagePicker;

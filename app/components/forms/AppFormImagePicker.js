import React from "react";
import { useFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import AppImageInput from "../AppImageInput";

function AppFormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const handleAdd = (uri) => {
    setFieldValue(name, uri);
  };

  // const handleRemove = (uri) => {
  //   setFieldValue(
  //     name,
  //     values[name].filter((imageUri) => imageUri !== uri)
  //   );
  // };

  return (
    <>
      <AppImageInput imageUri={values[name]} onChangeImage={handleAdd} />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormImagePicker;

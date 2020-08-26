import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";

function SubmitButton({ title, width = "100%" }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={() => {
        handleSubmit();
      }}
      width={width}
    />
  );
}

export default SubmitButton;

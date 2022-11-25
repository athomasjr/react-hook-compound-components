import React, { FC } from "react";
import { SmartFormChildPropsT } from "./index";
import { useController } from "react-hook-form";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { TextField } from "@mui/material";

type SmartTextFieldPropsT = SmartFormChildPropsT & {
  name: string;
  fieldProps?: Omit<TextFieldProps, "name">;
};

const SmartTextField: FC<SmartTextFieldPropsT> = ({
  controllerProps,
  name,
  fieldProps,
}) => {
  const { field } = useController({ ...controllerProps, name });

  return <TextField {...field} {...fieldProps} />;
};

export default SmartTextField;

import React, { FC } from "react";
import { z, ZodObject } from "zod";
import { UseFormProps } from "react-hook-form/dist/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseControllerProps, useForm, FormProvider } from "react-hook-form";

type SmartFormChildPropsT = {
  controllerProps: Omit<UseControllerProps<any>, "name">;
};

type SmartFormPropsT = {
  children: (props: SmartFormChildPropsT) => JSX.Element;
  schema: ZodObject<any>;
  onSubmit: (data: any) => void;
  useFormProps?: UseFormProps<any>;
};

const SmartForm: FC<SmartFormPropsT> = ({
  children,
  schema,
  onSubmit,
  useFormProps,
}) => {
  const userFormDefaults: UseFormProps<z.infer<typeof schema>> = {
    resolver: zodResolver(schema),
    ...useFormProps,
  };
  const methods = useForm<z.infer<typeof schema>>(userFormDefaults);
  const { handleSubmit, control } = methods;

  console.log(children);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({
        controllerProps: {
          control,
        },
      })}
    </form>
  );
};

export type { SmartFormPropsT, SmartFormChildPropsT };

export default SmartForm;

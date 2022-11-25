import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form/dist/types";
import { UseControllerProps } from "react-hook-form";

type SmartFormChildPropsT = {
  controllerProps: Omit<UseControllerProps<any>, "name">;
};

type SmartFormWithHookPropsT = {
  children: (props: SmartFormChildPropsT) => JSX.Element;
  onSubmit: (data: any) => void;
  methods: UseFormReturn<any>;
};

const SmartFormWithHook: FC<SmartFormWithHookPropsT> = ({
  children,
  onSubmit,
  methods,
}) => {
  const { handleSubmit, control } = methods;

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

export type { SmartFormWithHookPropsT, SmartFormChildPropsT };

export default SmartFormWithHook;

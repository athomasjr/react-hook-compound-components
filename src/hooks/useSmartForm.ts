import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import type { SmartFormWithHookPropsT } from "../components/SmartForm/SmartFormWithHook";

type UseSmartFormPropsT<T extends FieldValues> = {
  schema: z.ZodTypeAny;
  useFormProps?: Omit<UseFormProps<T>, "resolver">;
};

type UseSmartFormReturnT<TFieldValues extends FieldValues> = {
  methods: UseFormReturn<TFieldValues>;
  getSmartFormProps: (
    props: Omit<SmartFormWithHookPropsT, "children" | "methods">
  ) => {
    onSubmit: (data: TFieldValues) => void;
    methods: UseFormReturn<TFieldValues>;
  };
};

function useSmartForm<TFieldValues extends FieldValues>({
  schema,
  useFormProps,
}: UseSmartFormPropsT<TFieldValues>): UseSmartFormReturnT<TFieldValues> {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    ...useFormProps,
  });

  function getSmartFormProps(
    props: Omit<SmartFormWithHookPropsT, "children" | "methods">
  ) {
    return {
      methods,
      ...props,
    };
  }

  return { methods, getSmartFormProps };
}

export { useSmartForm };

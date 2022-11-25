import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form/dist/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { useForm } from "react-hook-form";

type UseSmartFormPropsT<T extends FieldValues> = {
  schema: z.ZodTypeAny;
  useFormProps?: Omit<UseFormProps<T>, "resolver">;
};

type UseSmartFormReturnT<TFieldValues extends FieldValues> = [
  methods: UseFormReturn<TFieldValues>
];

function useSmartForm<TFieldValues extends FieldValues>({
  schema,
  useFormProps,
}: UseSmartFormPropsT<TFieldValues>): UseSmartFormReturnT<TFieldValues> {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    ...useFormProps,
  });

  return [methods];
}

export { useSmartForm };

// Imports:
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  mobileFormKeys,
  mobileFormSchema,
} from "../schemas/mobile-form-schema";

export const MobileFormProvider = ({ children }) => {
  const formHook = useForm({
    resolver: zodResolver(mobileFormSchema),
    defaultValues: {
      [mobileFormKeys.PICTURE]: undefined,

      [mobileFormKeys.SHORT_VIDEO]: undefined,
    },
    mode: "onChange",
  });

  return <FormProvider {...formHook}>{children}</FormProvider>;
};

export const useMobileForm = () => {
  const formHook = useFormContext();
  return useMemo(() => ({ formHook }), [formHook]);
};

// Prop types:
MobileFormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

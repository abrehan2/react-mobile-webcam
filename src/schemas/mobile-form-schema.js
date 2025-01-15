// Imports:
import * as z from "zod";

export const mobileFormKeys = {
  PICTURE: "picture",
  SHORT_VIDEO: "short_video",
};

export const mobileFormSchema = z.object({
  [mobileFormKeys.PICTURE]: z.string().nonempty({
    message: "Please upload a picture",
  }),

  [mobileFormKeys.SHORT_VIDEO]: z.string().nonempty({
    message: "Please upload a short video",
  }),
});

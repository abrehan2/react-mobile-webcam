// Imports:
import React, { useEffect, useState } from "react";
import { content } from "../../constants/content/data";
import { useMobileForm } from "../../contexts/mobile-form-context";
import { mobileFormKeys } from "../../schemas/mobile-form-schema";
import MediaUpload from "./media-upload";
import { toast } from "react-hot-toast";

export default function MobileForm() {
  const { formHook } = useMobileForm();
  const [activeDisable, setActiveDisable] = useState(false);
  const [picture, short_video, utility_bill] = formHook.watch([
    mobileFormKeys["PICTURE"],
    mobileFormKeys["SHORT_VIDEO"],
  ]);

  useEffect(() => {
    if (picture && short_video) {
      setActiveDisable(false);
    } else {
      setActiveDisable(true);
    }
  }, [picture, short_video]);

  function submitHandler() {
    toast.success("Form submitted successfully");
  }

  return (
    <>
      <div className="space-y-3">
        <MediaUpload
          heading={content.mobilePicture.heading}
          subheading={content.mobilePicture.sub_heading}
          uploadKey={mobileFormKeys["PICTURE"]}
          formHook={formHook}
        />
        <div className="divider"></div>
      </div>

      <div className="space-y-3">
        <MediaUpload
          heading={content.mobileShortVideo.heading}
          subheading={content.mobileShortVideo.sub_heading}
          uploadKey={mobileFormKeys["SHORT_VIDEO"]}
          formHook={formHook}
          supportedFormats="MP4"
          isVideoRecording={true}
          audio={true}
        />
        <div className="divider"></div>
      </div>

      <div className="space-y-3 w-full">
        <button
          className="btn bg-primary hover:bg-primary text-white w-full rounded-sm outline-none border-none"
          type="button"
          disabled={activeDisable}
          onClick={formHook.handleSubmit(submitHandler)}
        >
          Submit
        </button>
      </div>
    </>
  );
}

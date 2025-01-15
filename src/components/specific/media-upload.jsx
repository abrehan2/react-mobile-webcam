// Imports:
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function MediaUpload({
  heading,
  subheading,
  uploadKey,
  formHook,
  supportedFormats = "PNG & JPEG",
  maxSize = "20 MB",
  audio = false,
  isVideoRecording = false,
}) {
  const videoPlayer = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(false);
  const [frontCamera, setFrontCamera] = useState(true);
  const [openCamera, setOpenCamera] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [active, setActive] = useState(false);

  function initiateStream(frontCameraOverride) {
    setCapturedMedia(null);
    const cameraFacingMode = frontCameraOverride ?? frontCamera;
    const updatedConstraints = {
      video: {
        facingMode: cameraFacingMode ? "user" : "environment",
      },
      audio,
    };

    navigator.mediaDevices
      .getUserMedia(updatedConstraints)
      .then((stream) => {
        setCameraStream(true);
        setOpenCamera(true);

        if (videoPlayer.current) {
          videoPlayer.current.srcObject = stream;
          videoPlayer.current.play();
        } else {
          toast.error("An error occurred while accessing the camera.");
        }
      })
      .catch(() => {
        setCameraStream(false);
        setOpenCamera(false);
        toast.error(
          "Could not access the camera. Please try again or ensure no other applications or browser tabs are using the camera."
        );
      });
  }

  function terminateStream() {
    if (videoPlayer.current && videoPlayer.current.srcObject) {
      const stream = videoPlayer.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoPlayer.current.srcObject = null;

      setCameraStream(false);
      setOpenCamera(false);
    }
  }

  function handleCameraMode() {
    const newCameraMode = !frontCamera;
    setFrontCamera(newCameraMode);
    terminateStream();
    initiateStream(newCameraMode);
  }

  function startRecording() {
    toast.success("Recording started");
    if (videoPlayer.current && videoPlayer.current.srcObject) {
      const recorder = new MediaRecorder(videoPlayer.current.srcObject);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const videoBlob = event.data;
          const videoURL = URL.createObjectURL(videoBlob);
          setCapturedMedia(videoURL);
        }
      };

      recorder.onstop = () => {
        terminateStream();
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
    }
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
    }
  }

  function captureImage() {
    if (videoPlayer.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoPlayer.current.videoWidth;
      canvas.height = videoPlayer.current.videoHeight;

      context.drawImage(videoPlayer.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedMedia(imageData);
      terminateStream();
    }
  }

  function handleCancel() {
    formHook.setValue(uploadKey, null);
    setCapturedMedia(null);
    setActive(false);
    toast.success("Upload has been cancelled");
  }

  function handleRetake() {
    formHook.setValue(uploadKey, null);
    setCapturedMedia(null);
    setActive(false);
    initiateStream();
    toast.success("Retake initiated");
  }

  function handleMediaUpload() {
    formHook.setValue(uploadKey, capturedMedia);
    setActive(true);
    toast.success("Media uploaded successfully");
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-full overflow-hidden">
        <h2 className="text-xs font-semibold text-regular_layer">{heading}</h2>
        <p className="text-[10px] font-normal text-regular_layer">
          {subheading}
        </p>
      </div>

      <div className="w-full overflow-hidden flex justify-between">
        <button
          className="btn bg-primary hover:bg-primary text-white w-1/3 rounded-sm outline-none border-none"
          type="button"
          onClick={openCamera ? terminateStream : initiateStream}
        >
          {openCamera ? "Close Camera" : "Open Camera"}
        </button>

        <div className="w-max overflow-hidden flex items-center gap-x-3">
          <p className="text-base font-semibold text-regular_layer">
            {frontCamera ? "Front" : "Rear"}
          </p>
          <input
            type="checkbox"
            className="toggle m-0"
            checked={frontCamera}
            onChange={handleCameraMode}
          />
        </div>

        {isVideoRecording ? (
          <button
            className={`btn bg-red-500 hover:opacity-70 text-white w-1/3 rounded-sm outline-none border-none`}
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!openCamera}
          >
            {isRecording ? "Stop" : "Record"}
          </button>
        ) : (
          <button
            className="btn bg-orange-500 hover:opacity-70 text-white w-1/3 rounded-sm outline-none border-none"
            type="button"
            onClick={captureImage}
            disabled={!openCamera}
          >
            Capture
          </button>
        )}
      </div>

      <div className="w-full overflow-hidden">
        {capturedMedia ? (
          <div className="flex flex-col items-center w-full border-dashed border-2 border-gray-500 p-3 space-y-2">
            {isVideoRecording ? (
              <video
                src={capturedMedia}
                controls
                className="w-full object-cover"
              />
            ) : (
              <img
                src={capturedMedia}
                alt="Captured"
                className="size-full object-cover"
              />
            )}
            <p className="mt-2 text-xs text-regular_layer">
              Retake by{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={handleRetake}
              >
                clicking here.
              </span>
            </p>
            <div className="flex justify-between w-full mt-4">
              <button
                className="btn bg-primary hover:opacity-70 text-white text-xs w-1/4 outline-none border-none rounded-none"
                type="button"
                onClick={handleMediaUpload}
                disabled={active}
              >
                Upload
              </button>
              <button
                className="btn bg-gray-500 hover:opacity-70 text-white text-xs w-1/4 outline-none border-none rounded-none"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Supported format: {supportedFormats} &nbsp; | &nbsp; Maximum size:{" "}
              {maxSize}
            </p>
          </div>
        ) : (
          <>
            <video
              ref={videoPlayer}
              className={`w-full ${cameraStream ? "block" : "hidden"}`}
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>
    </div>
  );
}

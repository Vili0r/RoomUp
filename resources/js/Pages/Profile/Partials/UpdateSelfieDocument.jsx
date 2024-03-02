import React, { useRef, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, router } from "@inertiajs/react";
import * as faceapi from "face-api.js";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function UpdateSelfieDocument({ className, user }) {
    const [hasPhoto, setHasPhoto] = useState(false);
    const [streamStarted, setStreamStarted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [similarity, setSimilarity] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const imgRef1 = useRef();
    const imgRef2 = useRef();
    const { data, setData } = useForm({
        selfie: null,
    });

    const { t } = useTranslation();
    const {
        title,
        titleTwo,
        description,
        snap,
        verified,
        unverified,
        verify,
        getSelfie,
        loading,
        verifyingPhotos,
        noFacePhotoProfile,
        noFaceSelfie,
        newSelfie,
    } = t("profile.updateSelfieDocument");

    const getVideo = async () => {
        try {
            // Request access to the webcam
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            // If the videoRef is attached to a video element, set the source object
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setMediaStream(stream);
                setStreamStarted(true); // Update the state to indicate the stream has started
            }
        } catch (error) {
            console.error("Error accessing the webcam: ", error);
            // Implement error handling or user notification as needed
        }
    };

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
        stopVideo();
        setStreamStarted(false);

        const imageDataUrl = photo.toDataURL("image/jpeg", 1.0);
        setData("selfie", imageDataUrl);
    };

    const stopVideo = () => {
        if (mediaStream) {
            // Stop each track on the stream
            mediaStream.getTracks().forEach((track) => track.stop());
            // Clear the video source
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setMediaStream(null); // Clear the stored stream from the state
        }
    };

    const verifyPhotos = () => {
        setIsVerifying(true);
        (async () => {
            // loading the models
            await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
            await faceapi.nets.faceExpressionNet.loadFromUri("/models");

            // detect a single face from the ID card image
            const photoProfileFacedetection = await faceapi
                .detectSingleFace(
                    imgRef1.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptor();

            // Check if a face was detected in the ID card image
            if (!photoProfileFacedetection) {
                setSimilarity(noFacePhotoProfile);
                setIsVerifying(false);
                return; // Stop further execution
            }

            // detect a single face from the selfie image
            const selfieFacedetection = await faceapi
                .detectSingleFace(
                    imgRef2.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptor();

            // Check if a face was detected in the selfie
            if (!selfieFacedetection) {
                setSimilarity(noFaceSelfie);
                setIsVerifying(false);
                return; // Stop further execution
            }

            /**
             * Do face comparison only when faces were detected
             */
            if (photoProfileFacedetection && selfieFacedetection) {
                // Using Euclidean distance to comapare face descriptions
                const distance = faceapi.euclideanDistance(
                    photoProfileFacedetection.descriptor,
                    selfieFacedetection.descriptor
                );
                if (distance <= 0.6) {
                    submitPhoto();
                } else {
                    setSimilarity(newSelfie);
                }
                setIsVerifying(false);
                setSimilarity(null);
            }
        })();
    };

    const submitPhoto = () => {
        router.post("/profile-seflie-verification", data, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {title}
                    </h2>
                    {user.verification.selfie_verified_at !== null ? (
                        <span className="px-2 py-1 text-white rounded-md bg-green-600/70">
                            {verified}
                        </span>
                    ) : (
                        <span className="px-2 py-1 text-white rounded-md bg-gray-600/70">
                            {unverified}
                        </span>
                    )}
                </div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {titleTwo}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </header>

            {similarity && (
                <div className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
                    <div className="flex gap-2">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg ">
                            <MdOutlineNotificationsNone size={24} />
                        </div>
                        <div className="text-sm font-normal ms-3">
                            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                                {similarity}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <img
                crossOrigin="anonymous"
                ref={imgRef1}
                src={
                    user.avatar !==
                    "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                        ? user.avatar
                        : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                }
                alt=""
                className="w-[50px] sm:w-[70px] lg:w-[90px] mb-3 h-auto hidden"
            />
            <img
                crossOrigin="anonymous"
                ref={imgRef2}
                src={data.selfie}
                alt=""
                className="w-[50px] sm:w-[70px] lg:w-[90px] mb-3 h-auto hidden"
            />

            <div className="relative">
                <video
                    ref={videoRef}
                    autoPlay={true}
                    style={{ display: streamStarted ? "block" : "none" }}
                />
                {streamStarted && (
                    <button
                        onClick={takePhoto}
                        type="button"
                        className="absolute px-4 py-2 mb-2 text-lg font-medium text-center text-white rounded-lg bottom-3 left-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 me-2"
                    >
                        {snap}
                    </button>
                )}
            </div>
            <div
                className={
                    `fixed top-0 left-[100%] flex items-center transition` +
                    { hasPhoto }
                        ? "left-0"
                        : ""
                }
            >
                <canvas ref={photoRef}></canvas>
            </div>

            {user.verification.selfie_verified_at === null && (
                <div className="flex items-center gap-4 mt-5">
                    <PrimaryButton
                        disabled={isVerifying}
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                        onClick={verifyPhotos}
                    >
                        {verify}
                    </PrimaryButton>

                    {!streamStarted && (
                        <PrimaryButton
                            onClick={getVideo}
                            className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                        >
                            {getSelfie}
                        </PrimaryButton>
                    )}

                    {isVerifying && (
                        <span className="flex items-center justify-around gap-4 px-4 py-2 text-xs font-semibold tracking-widest text-center text-gray-900 border border-gray-800 rounded-lg hover:text-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                            <div role="status">
                                <svg
                                    ariaHidden="true"
                                    className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">{loading}</span>
                            </div>
                            {verifyingPhotos}
                        </span>
                    )}
                </div>
            )}
        </section>
    );
}

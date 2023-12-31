import React, { useRef, useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import * as faceapi from "face-api.js";

export default function UpdateSelfieDocument({ className, user }) {
    const [hasPhoto, setHasPhoto] = useState(false);
    const [streamStarted, setStreamStarted] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const imgRef1 = useRef();
    const imgRef2 = useRef();
    const isFirstRender = useRef(true);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            selfie: null,
        });

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

    const renderFace = async (image, x, y, width, height) => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");

        context?.drawImage(image, x, y, width, height, 0, 0, width, height);
        canvas.toBlob((blob) => {
            image.src = URL.createObjectURL(blob);
        }, "image/jpeg");
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

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        ctx.clearRect(video, 0, 0, photo.width, photo.height);
        setHasPhoto(false);
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
        console.log("okay");
        if (isFirstRender.current) {
            isFirstRender.current = false; // toggle flag after first render/mounting
            return;
        }

        (async () => {
            // loading the models
            await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
            await faceapi.nets.faceExpressionNet.loadFromUri("/models");

            // detect a single face from the ID card image
            const idCardFacedetection = await faceapi
                .detectSingleFace(
                    imgRef1.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptor();

            // detect a single face from the selfie image
            const selfieFacedetection = await faceapi
                .detectSingleFace(
                    imgRef2.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (idCardFacedetection && selfieFacedetection) {
                // Using Euclidean distance to comapare face descriptions
                const distance = faceapi.euclideanDistance(
                    idCardFacedetection.descriptor,
                    selfieFacedetection.descriptor
                );
                console.log(distance);
            }
        })();
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("profile-photo.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Verify Selfie
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Verify selfie, which will increase the security and will
                    reach more flatmates.
                </p>
            </header>

            <img
                ref={imgRef1}
                src={
                    user.avatar !==
                    "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                        ? user.avatar
                        : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                }
                alt=""
                className="w-[50px] sm:w-[70px] lg:w-[90px] mb-3"
            />
            <img
                ref={imgRef2}
                src={data.selfie}
                alt=""
                className="w-[50px] sm:w-[70px] lg:w-[90px] mb-3"
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
                        Snap!
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
                {/* <button onClick={closePhoto}>Close!</button> */}
            </div>

            <div className="flex items-center gap-4 mt-5">
                <PrimaryButton
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                    disabled={processing}
                >
                    Save
                </PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Saved.
                    </p>
                </Transition>
                {!streamStarted && (
                    <PrimaryButton
                        onClick={getVideo}
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                    >
                        Get a selfie
                    </PrimaryButton>
                )}

                <button
                    onClick={verifyPhotos}
                    type="button"
                    className="px-4 py-2 text-xs font-semibold tracking-widest text-center text-gray-900 border border-gray-800 rounded-lg hover:text-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                    Verify
                </button>
            </div>
        </section>
    );
}

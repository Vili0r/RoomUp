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
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            avatar: null,
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

    // useEffect(() => {
    //     const loadModels = async () => {
    //         const MODEL_URL = '/models';
    //         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    //         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    //         await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    //     };

    //     const compareFaces = async () => {
    //         if (imgRef1.current && imgRef2.current) {
    //             // Detect the faces
    //             const detections1 = await faceapi.detectSingleFace(imgRef1.current).withFaceLandmarks().withFaceDescriptor();
    //             const detections2 = await faceapi.detectSingleFace(imgRef2.current).withFaceLandmarks().withFaceDescriptor();

    //             if (detections1 && detections2) {
    //                 // Compute the distance between the two faces
    //                 const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
    //                 console.log("Distance between faces:", distance);

    //                 // Define a threshold for considering faces as "similar"
    //                 const threshold = 0.6;  // Adjust as needed
    //                 if (distance < threshold) {
    //                     console.log("Faces are similar");
    //                 } else {
    //                     console.log("Faces are not similar");
    //                 }
    //             }
    //         }
    //     };

    //     loadModels().then(compareFaces);
    // }, []);

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

            <div>
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
                    {!streamStarted && (
                        <PrimaryButton
                            onClick={getVideo}
                            className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                        >
                            Get a selfie
                        </PrimaryButton>
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
                    <button onClick={closePhoto}>Close!</button>
                </div>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* <div>
                    <div className="relative">
                        <div className="mt-6">
                            <input
                                type="file"
                                name="avatar"
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                onChange={(e) =>
                                    setData("avatar", e.target.files[0])
                                }
                            />

                            <label
                                htmlFor="avatar"
                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                            >
                                Photo Profile
                            </label>
                        </div>
                        {user.verification.photo_verified_at !== null ? (
                            <span className="bg-green-600/70 absolute px-2 py-1 text-white rounded-md top-[12px] right-1">
                                Verified
                            </span>
                        ) : (
                            <span className="bg-gray-600/70 absolute px-2 py-1 text-white rounded-md top-[12px] right-1">
                                Unverified
                            </span>
                        )}
                    </div>
                    <InputError className="mt-2" message={errors.avatar} />
                </div> */}

                <div className="flex items-center gap-4">
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
                </div>
            </form>
        </section>
    );
}

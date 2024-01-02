import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import * as faceapi from "face-api.js";
import { MdOutlineNotificationsNone } from "react-icons/md";

export default function UpdateProfilePhoto({ className, user, status }) {
    const imgRef1 = useRef();
    const [isFaceInPhoto, setIsFaceInPhoto] = useState(null);
    const [image, setImage] = useState(null);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            avatar: null,
        });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // const maxFileSize = 1048576; // 1MB,
        // if (file.size > maxFileSize) {
        //     // Inform user the file is too large
        //     setIsFaceInPhoto(
        //         "The file is too large. Please upload a file smaller than 1MB."
        //     );
        //     return;
        // }
        if (file && file.type.match("image.*")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result); // The result contains the base64 encoded image
            };
            reader.readAsDataURL(file);
            setData("avatar", file);
        } else {
            setIsFaceInPhoto("Please select an image file.");
        }
    };

    const submit = (e) => {
        e.preventDefault();

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

            // Check if a face was detected in the ID card image
            if (!idCardFacedetection) {
                setIsFaceInPhoto(
                    "No face detected in the uploaded Photo. Please try again with a different photo."
                );
                return;
            }

            post(route("profile-photo.update"), {
                preserveScroll: true,
            });
        })();
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Photo
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile photo, which will increase the
                    security and will reach more flatmates.
                </p>
            </header>

            {isFaceInPhoto && (
                <div className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
                    <div className="flex gap-2">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg ">
                            <MdOutlineNotificationsNone size={24} />
                        </div>
                        <div className="text-sm font-normal ms-3">
                            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                                {isFaceInPhoto}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            {status === "profile-photo-not-uploaded" && (
                <div className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow">
                    <div className="flex gap-2">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg ">
                            <MdOutlineNotificationsNone size={24} />
                        </div>
                        <div className="text-sm font-normal ms-3">
                            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                                The photo profile has not been uploaded! Try
                                again.
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <img
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
                crossOrigin="anonymous"
                ref={imgRef1}
                src={image}
                alt=""
                className="w-[50px] sm:w-[70px] lg:w-[90px] mb-3 h-auto hidden"
            />

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <div className="relative">
                        <div className="mt-6">
                            <input
                                type="file"
                                name="avatar"
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                onChange={handleImageChange}
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
                </div>

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

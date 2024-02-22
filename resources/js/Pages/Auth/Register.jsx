import React, { useState, useEffect, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Hero5 } from "@/assets";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as faceapi from "face-api.js";
import { useTranslation } from "react-i18next";

const genders = [
    {
        id: "1",
        titleEn: "Male",
        titleGr: "Άνδρας",
    },
    {
        id: "2",
        titleEn: "Female",
        titleGr: "Γυναίκα",
    },
    {
        id: "3",
        titleEn: "Prefer not to say",
        titleGr: "Προτιμώ να μην απαντήσω",
    },
];

const lookingFor = [
    {
        id: "1",
        titleEn: "I am looking for a flat or a house share",
        titleGr: "Ψάχνω για διαμέρισμα ή σπίτι",
    },
    {
        id: "2",
        titleEn: "I have a flat or house share",
        titleGr: "Έχω διαμέρισμα ή σπίτι",
    },
    {
        id: "3",
        titleEn: "I would like to find people to form share",
        titleGr: "Θα ήθελα να βρω άτομα για να ψάξουμε για διαμέρισμα ή σπίτι",
    },
];

export default function Register() {
    const stepOneSchema = yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(20).required(),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null])
            .required(),
    });
    const stepTwoSchema = yup.object().shape({
        birthdate: yup
            .string()
            .required("DOB is Required")
            .test(
                "birthdate",
                "Please choose a valid date of birth",
                (date) => moment().diff(moment(date), "years") >= 18
            ),
        gender: yup.string().required(),
        looking_for: yup.string().required(),
    });

    const [showPassword, setShowPassword] = useState("password");
    const [step, setStep] = useState(1);
    const imgRef1 = useRef();
    const [image, setImage] = useState(null);
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm(
            {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                password_confirmation: "",
                gender: "",
                birthdate: "",
                looking_for: "",
                avatar: null,
            },
            {
                resolver: yupResolver(stepOneSchema),
            }
        );

    const { t, i18n } = useTranslation();
    const {
        firstNameForm,
        lastNameForm,
        emailForm,
        passwordForm,
        passwordConfirmationForm,
    } = t("register.stepOneForm");
    const { DOBForm, genderForm, lookingForForm, photoProfileForm } = t(
        "register.stepTwoForm"
    );
    const {
        fixErrors,
        backBtn,
        nextBtn,
        loginBtn,
        processingBtn,
        registerBtn,
    } = t("register.misc");

    const handleNext = async () => {
        try {
            let schema;
            switch (step) {
                case 1:
                    schema = stepOneSchema;
                    break;
                case 2:
                    schema = stepTwoSchema;
                    break;
                default:
                    break;
            }
            await schema.validate(data, { abortEarly: false });
            setStep(step + 1);
        } catch (errors) {
            console.log(errors);
        }

        clearErrors();
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

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

        if (data.avatar !== null) {
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
            })();
        }

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="w-full flex flex-wrap dark:bg-gradient-to-r dark:from-[#002853] dark:to-[#040c18]">
                <div className="w-1/2 shadow-2xl">
                    <img
                        className="hidden object-cover w-full h-screen md:block"
                        src={Hero5}
                    />
                </div>
                <div className="w-full [@media(max-width:637px)]:mx-auto mx-[7rem] [@media(max-width:637px)]:text-center md:mx-0 mt-[4rem] px-6 py-8 md:px-8 md:w-1/2">
                    {Object.keys(errors).length !== 0 && (
                        <div className="w-full max-w-2xl mx-auto mb-5">
                            <div className="flex p-5 bg-white rounded-lg shadow">
                                <div>
                                    <svg
                                        className="w-6 h-6 text-yellow-500 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h2 className="font-semibold text-gray-800">
                                        {fixErrors}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    )}
                    {step == "2" && (
                        <div className="flex justify-between mt-5 mb-10 text-gray-600 rounded-md text-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                            <PrimaryButton
                                className="cursor-pointer hover:text-[#F1C40F]"
                                onClick={handleBack}
                            >
                                {backBtn}
                            </PrimaryButton>
                            <span>{step}/2</span>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {step == "1" && (
                            <>
                                <div>
                                    <div className="relative mt-5">
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            placeholder={firstNameForm}
                                            value={data.first_name}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="first_name"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {firstNameForm}
                                        </label>
                                    </div>
                                    {errors.first_name && (
                                        <InputError
                                            message={errors.first_name}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="relative mt-5">
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            placeholder={lastNameForm}
                                            value={data.last_name}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="last_name"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {lastNameForm}
                                        </label>
                                    </div>

                                    {errors.last_name && (
                                        <InputError
                                            message={errors.last_name}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="relative mt-5">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={data.email}
                                            placeholder={emailForm}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {emailForm}
                                        </label>
                                    </div>

                                    {errors.email && (
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="relative mt-5">
                                        {showPassword == "password" ? (
                                            <AiOutlineEye
                                                onClick={() =>
                                                    setShowPassword("text")
                                                }
                                                className="w-[22px] h-[22px] absolute right-0 mt-4 mr-3 cursor-pointer"
                                            />
                                        ) : (
                                            <AiOutlineEyeInvisible
                                                onClick={() =>
                                                    setShowPassword("password")
                                                }
                                                className="w-[22px] h-[22px] absolute right-0 mt-4 mr-3 cursor-pointer"
                                            />
                                        )}
                                        <input
                                            type={showPassword}
                                            name="password"
                                            id="password"
                                            placeholder={passwordForm}
                                            value={data.password}
                                            onChange={handleOnChange}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        />

                                        <label
                                            htmlFor="password"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {passwordForm}
                                        </label>
                                    </div>
                                    {errors.password && (
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="relative mt-5">
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            placeholder={
                                                passwordConfirmationForm
                                            }
                                            value={data.password_confirmation}
                                            onChange={handleOnChange}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        />

                                        <label
                                            htmlFor="password_confirmation"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {passwordConfirmationForm}
                                        </label>
                                    </div>
                                    {errors.password_confirmation && (
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div className="my-6">
                                    <PrimaryButton
                                        onClick={handleNext}
                                        className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
                                    >
                                        {nextBtn}
                                    </PrimaryButton>
                                </div>
                            </>
                        )}

                        {step == "2" && (
                            <>
                                <div>
                                    <div className="relative mt-5">
                                        <input
                                            type="date"
                                            name="birthdate"
                                            id="birthdate"
                                            placeholder={DOBForm}
                                            value={data.birthdate}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={handleOnChange}
                                        />
                                        <label
                                            htmlFor="birthdate"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {DOBForm}
                                        </label>
                                    </div>
                                    {errors.birthdate && (
                                        <InputError
                                            message={errors.birthdate}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="relative mt-6">
                                        <select
                                            type="text"
                                            name="gender"
                                            id="gender"
                                            placeholder={genderForm}
                                            value={data.gender}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData(
                                                    "gender",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">--</option>
                                            {genders.map(
                                                ({ id, titleEn, titleGr }) => (
                                                    <option
                                                        key={id}
                                                        value={
                                                            i18n.language ===
                                                            "en"
                                                                ? titleEn
                                                                : titleGr
                                                        }
                                                    >
                                                        {i18n.language === "en"
                                                            ? titleEn
                                                            : titleGr}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <label
                                            htmlFor="gender"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {genderForm}
                                        </label>
                                    </div>
                                    {errors.gender && (
                                        <InputError
                                            message={errors.gender}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="relative mt-6">
                                        <select
                                            type="text"
                                            name="looking_for"
                                            id="looking_for"
                                            placeholder="Looking For"
                                            value={data.looking_for}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData(
                                                    "looking_for",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">--</option>
                                            {lookingFor.map(
                                                ({ id, titleEn, titleGr }) => (
                                                    <option
                                                        key={id}
                                                        value={
                                                            i18n.language ===
                                                            "en"
                                                                ? titleEn
                                                                : titleGr
                                                        }
                                                    >
                                                        {i18n.language === "en"
                                                            ? titleEn
                                                            : titleGr}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <label
                                            htmlFor="looking_for"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            {lookingForForm}
                                        </label>
                                    </div>

                                    {errors.looking_for && (
                                        <InputError
                                            message={errors.looking_for}
                                            className="mt-2"
                                        />
                                    )}
                                </div>

                                <div className="relative mt-6">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                        onChange={handleImageChange}
                                    />

                                    <label
                                        htmlFor="avatar"
                                        className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                    >
                                        {photoProfileForm}
                                    </label>
                                    {errors.avatar && (
                                        <InputError
                                            message={errors.avatar}
                                            className="mt-2"
                                        />
                                    )}
                                </div>
                                <img
                                    crossOrigin="anonymous"
                                    ref={imgRef1}
                                    src={image}
                                    alt=""
                                    className="w-[50px] sm:w-[70px] lg:w-[90px] mb-3 h-auto hidden"
                                />
                                <div className="my-6">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none "
                                    >
                                        {processing
                                            ? processingBtn
                                            : registerBtn}
                                    </PrimaryButton>
                                </div>
                            </>
                        )}
                    </form>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <Link
                            href={route("login")}
                            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline "
                        >
                            {loginBtn}
                        </Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

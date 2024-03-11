import { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Hero3, facebook } from "@/assets";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState("password");
    const [validationErrors, setValidationErrors] = useState({});
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });
    const { t, i18n } = useTranslation();
    const {
        googleBtn,
        facebookBtn,
        emailBtn,
        loginBtn,
        signUpBtn,
        forgotPasswordBtn,
    } = t("login.buttons");
    const { rememberMe } = t("login.loginForm");
    const { emailType, emailRequired, passwordRequired } = t(
        "validation.register.stepOne"
    );
    const loginSchema = yup.object().shape({
        email: yup.string().email(emailType).required(emailRequired),
        password: yup.string().required(passwordRequired),
    });

    useEffect(() => {
        return () => {
            reset("password");
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

    const submit = async (e) => {
        e.preventDefault();
        setValidationErrors({});

        try {
            // Validate the data using the combined schema
            await loginSchema.validate(data, { abortEarly: false });

            post(route("login"));
        } catch (errors) {
            // Handle validation errors
            const validationErrors = {};

            errors.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });

            setValidationErrors(validationErrors);
        }
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="w-full flex flex-wrap dark:bg-gradient-to-r dark:from-[#002853] dark:to-[#040c18]">
                <div className="w-full [@media(max-width:637px)]:mx-auto mx-[7rem] [@media(max-width:637px)]:text-center md:mx-0 mt-[6rem] px-6 py-8 md:px-8 md:w-1/2 md:mt-[10rem]">
                    <div className="flex flex-row [@media(max-width:637px)]:flex-col justify-between gap-2">
                        <a
                            href="/auth/google/redirect"
                            className="flex items-center justify-center w-full mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <div className="px-4 py-2">
                                <svg className="w-6 h-6" viewBox="0 0 40 40">
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#FFC107"
                                    />
                                    <path
                                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                        fill="#FF3D00"
                                    />
                                    <path
                                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                        fill="#4CAF50"
                                    />
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#1976D2"
                                    />
                                </svg>
                            </div>

                            <span className="w-5/6 px-4 py-3 font-bold text-center ">
                                {googleBtn}
                            </span>
                        </a>
                        <a
                            href="/auth/facebook/redirect"
                            className="flex items-center justify-center w-full mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <div className="px-4 py-2">
                                <img className="w-6 h-6" src={facebook} />
                            </div>

                            <span className="w-5/6 px-4 py-3 font-bold text-center ">
                                {facebookBtn}
                            </span>
                        </a>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <Link
                            href={route("welcome")}
                            className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline "
                        >
                            {emailBtn}
                        </Link>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={submit}>
                        <div className="relative mt-5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                value={data.email}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                autoComplete="off"
                                onChange={handleOnChange}
                            />
                            <label
                                htmlFor="email"
                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                            >
                                Email Address
                            </label>
                            <InputError
                                message={validationErrors.email}
                                className="mt-2"
                            />
                            {errors.email && (
                                <InputError
                                    message={
                                        i18n.language === "en"
                                            ? errors.email
                                            : "Αυτά τα στοιχεία αντιστοιχούν σε κάποιον άλλον χρήστη."
                                    }
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="relative mt-5">
                            {showPassword == "password" ? (
                                <AiOutlineEye
                                    onClick={() => setShowPassword("text")}
                                    className="w-[22px] h-[22px] absolute right-0 mt-4 mr-3 cursor-pointer"
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    onClick={() => setShowPassword("password")}
                                    className="w-[22px] h-[22px] absolute right-0 mt-4 mr-3 cursor-pointer"
                                />
                            )}
                            <input
                                type={showPassword}
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={data.password}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                onChange={handleOnChange}
                            />

                            <label
                                htmlFor="password"
                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                            >
                                Password
                            </label>
                            <InputError
                                message={validationErrors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="my-6">
                            <PrimaryButton
                                disabled={processing}
                                className="w-full rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none  hover:text-black"
                            >
                                {loginBtn}
                            </PrimaryButton>
                        </div>

                        <div className="flex justify-between mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    value={data.remember}
                                    onChange={handleOnChange}
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                    {rememberMe}
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    {forgotPasswordBtn}
                                </Link>
                            )}
                        </div>
                    </form>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <Link
                            href={route("register")}
                            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline "
                        >
                            {signUpBtn}
                        </Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>

                <div className="w-1/2 shadow-2xl">
                    <img
                        className="hidden object-cover w-full h-screen md:block"
                        src={Hero3}
                    />
                </div>
            </div>
        </GuestLayout>
    );
}

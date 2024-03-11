import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
    user,
}) {
    const [validationErrors, setValidationErrors] = useState({});
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        });

    const { t, i18n } = useTranslation();
    const {
        title,
        description,
        firstName,
        lastName,
        emailAddress,
        verified,
        unverified,
        save,
        saved,
        unverifiedEmail,
        reSendVerificationEmail,
        newVerificationLink,
    } = t("profile.updateProfileInformations");
    const { emailType, emailRequired } = t("validation.register.stepOne");
    const { firstNameMax, firstNameRequired, lastNameMax, lastNameRequired } =
        t("validation.stepFour");

    const updateProfileInformationSchema = yup.object().shape({
        first_name: yup
            .string()
            .max(20, firstNameMax)
            .required(firstNameRequired),
        last_name: yup.string().max(20, lastNameMax).required(lastNameRequired),
        email: yup.string().email(emailType).required(emailRequired),
    });

    const submit = async (e) => {
        e.preventDefault();
        setValidationErrors({});

        try {
            // Validate the data using the combined schema
            await updateProfileInformationSchema.validate(data, {
                abortEarly: false,
            });

            patch(route("profile.update"), {
                preserveScroll: true,
            });
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
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="first_name" value={firstName} />

                    <TextInput
                        id="first_name"
                        className="block w-full mt-1"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                        isFocused
                        autoComplete="off"
                    />

                    <InputError
                        className="mt-2"
                        message={validationErrors.first_name}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value={lastName} />
                    <div className="relative">
                        <TextInput
                            id="last_name"
                            className="block w-full mt-1"
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="off"
                        />
                        {user.verification.last_name_verified_at !== null ? (
                            <span className="bg-green-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                {verified}
                            </span>
                        ) : (
                            <span className="bg-gray-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                {unverified}
                            </span>
                        )}
                    </div>
                    <InputError
                        className="mt-2"
                        message={validationErrors.last_name}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={emailAddress} />
                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            className="block w-full mt-1"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        {user.verification.email_verified_at !== null ? (
                            <span className="bg-green-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                {verified}
                            </span>
                        ) : (
                            <span className="bg-gray-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                {unverified}
                            </span>
                        )}
                    </div>

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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            {unverifiedEmail}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                {reSendVerificationEmail}
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                {newVerificationLink}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                        disabled={processing}
                    >
                        {save}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {saved}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

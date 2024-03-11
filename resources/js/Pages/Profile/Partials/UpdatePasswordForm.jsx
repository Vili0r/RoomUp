import { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [validationErrors, setValidationErrors] = useState({});

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const { t, i18n } = useTranslation();
    const {
        title,
        description,
        save,
        saved,
        currentPassword,
        newPassword,
        confirmPassword,
    } = t("profile.updatePasswordForm");
    const {
        passwordMin,
        passwordMatches,
        passwordMax,
        passwordRequired,
        passwordConfirmationRequired,
        passwordConfirmationOneOf,
    } = t("validation.register.stepOne");
    const { passwordBackend } = t("register.stepOneForm");

    const updatePasswordSchema = yup.object().shape({
        current_password: yup.string().required(passwordRequired),
        password: yup
            .string()
            .min(8, passwordMin)
            .max(20, passwordMax)
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                passwordMatches
            )
            .required(passwordRequired),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], passwordConfirmationOneOf)
            .required(passwordConfirmationRequired),
    });

    const updatePassword = async (e) => {
        e.preventDefault();
        setValidationErrors({});

        try {
            // Validate the data using the combined schema
            await updatePasswordSchema.validate(data, { abortEarly: false });

            put(route("password.update"), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: () => {
                    if (errors.password) {
                        reset("password", "password_confirmation");
                        passwordInput.current.focus();
                    }

                    if (errors.current_password) {
                        reset("current_password");
                        currentPasswordInput.current.focus();
                    }
                },
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

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value={currentPassword}
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="block w-full mt-1"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={validationErrors.current_password}
                        className="mt-2"
                    />
                    {errors.current_password && (
                        <InputError
                            message={
                                i18n.language === "en"
                                    ? errors.current_password
                                    : "Ο κωδικός πρόσβασης είναι εσφαλμένος."
                            }
                            className="mt-2"
                        />
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="password" value={newPassword} />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="block w-full mt-1"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={validationErrors.password}
                        className="mt-2"
                    />
                    {errors.password && (
                        <InputError
                            message={passwordBackend}
                            className="mt-2"
                        />
                    )}
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={confirmPassword}
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="block w-full mt-1"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={validationErrors.password_confirmation}
                        className="mt-2"
                    />
                </div>

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

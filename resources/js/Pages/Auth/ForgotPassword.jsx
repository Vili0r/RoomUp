import React, { useState } from "react";
import AuxiliaryLayout from "@/Layouts/AuxiliaryLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function ForgotPassword({ status }) {
    const { t, i18n } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    const [validationErrors, setValidationErrors] = useState({});

    const { emailType, emailRequired } = t("validation.register.stepOne");
    const { confirmBtn, description } = t("auth.forgotPassword");
    const forgotPasswordSchema = yup.object().shape({
        email: yup.string().email(emailType).required(emailRequired),
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();
        setValidationErrors({});
        try {
            // Validate the data using the combined schema
            await forgotPasswordSchema.validate(data, { abortEarly: false });

            post(route("password.email"));
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
        <AuxiliaryLayout>
            <Head title="Forgot Password" />
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {description}
            </div>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {i18n.language === "en" &&
                    status === "We have emailed your password reset link."
                        ? status
                        : i18n.language === "en"
                        ? status
                        : "Σας έχουμε στείλει το link επαναφοράς κωδικού πρόσβασης μέσω email."}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="block w-full mt-1"
                    isFocused={true}
                    onChange={onHandleChange}
                />

                <InputError message={validationErrors.email} className="mt-2" />
                {errors.email ==
                    "We can't find a user with that email address." && (
                    <InputError
                        message={
                            i18n.language == "en"
                                ? errors.email
                                : "Δεν μπορούμε να βρούμε έναν χρήστη με αυτή τη διεύθυνση email."
                        }
                        className="mt-2"
                    />
                )}

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {confirmBtn}
                    </PrimaryButton>
                </div>
            </form>
        </AuxiliaryLayout>
    );
}

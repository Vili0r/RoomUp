import { useEffect, useState } from "react";
import AuxiliaryLayout from "@/Layouts/AuxiliaryLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function ResetPassword({ token, email }) {
    const [validationErrors, setValidationErrors] = useState({});
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const { t } = useTranslation();
    const { formBtn, emailForm, passwordForm, passwordConfirmationForm } =
        t("auth.resetPassword");
    const {
        emailType,
        emailRequired,
        passwordMin,
        passwordMatches,
        passwordMax,
        passwordRequired,
        passwordConfirmationRequired,
        passwordConfirmationOneOf,
    } = t("validation.register.stepOne");
    const { passwordBackend } = t("register.stepOneForm");

    const resetPasswordSchema = yup.object().shape({
        email: yup.string().email(emailType).required(emailRequired),
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

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();
        setValidationErrors({});

        try {
            // Validate the data using the combined schema
            await resetPasswordSchema.validate(data, { abortEarly: false });

            post(route("password.store"));
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
            <Head title="Reset Password" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value={emailForm} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        onChange={onHandleChange}
                    />

                    <InputError
                        message={validationErrors.email}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={passwordForm} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={onHandleChange}
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

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={passwordConfirmationForm}
                    />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        onChange={onHandleChange}
                    />

                    <InputError
                        message={validationErrors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {formBtn}
                    </PrimaryButton>
                </div>
            </form>
        </AuxiliaryLayout>
    );
}

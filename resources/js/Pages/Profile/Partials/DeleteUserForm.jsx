import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const [validationErrors, setValidationErrors] = useState({});

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const { t, i18n } = useTranslation();
    const {
        title,
        description,
        modalTitle,
        modalDescription,
        passwordFormInput,
        cancelBtn,
        deleteAccountBtn,
    } = t("profile.deleteUserForm");
    const { passwordRequired } = t("validation.register.stepOne");

    const deleteUserSchema = yup.object().shape({
        password: yup.string().required(passwordRequired),
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = async (e) => {
        e.preventDefault();
        setValidationErrors({});

        try {
            // Validate the data using the combined schema
            await deleteUserSchema.validate(data, { abortEarly: false });

            destroy(route("profile.destroy"), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => passwordInput.current.focus(),
                onFinish: () => reset(),
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

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                {deleteAccountBtn}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {modalTitle}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {modalDescription}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value={passwordFormInput}
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-3/4 mt-1"
                            isFocused
                            placeholder={passwordFormInput}
                        />

                        <InputError
                            message={validationErrors.password}
                            className="mt-2"
                        />
                        {errors.password && (
                            <InputError
                                message={
                                    i18n.language === "en"
                                        ? errors.password
                                        : "Ο κωδικός πρόσβασης είναι εσφαλμένος."
                                }
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="flex justify-end mt-6">
                        <SecondaryButton onClick={closeModal}>
                            {cancelBtn}
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            {deleteAccountBtn}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

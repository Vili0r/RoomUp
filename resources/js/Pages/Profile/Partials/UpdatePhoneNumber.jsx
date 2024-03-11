import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

export default function UpdatePhoneNumber({ className, user }) {
    const [validationErrors, setValidationErrors] = useState({});
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            phone_number: user.phone_number,
        });

    const { t, i18n } = useTranslation();
    const {
        title,
        description,
        verified,
        unverified,
        save,
        saved,
        phoneNumber,
        verifyPhoneNumberBtn,
    } = t("profile.updatePhoneNumber");
    const {
        telephoneMin,
        telephoneMax,
        telephoneMaxMatches,
        telephoneRequired,
    } = t("validation.stepFour");

    const updatePhoneNumberSchema = yup.object().shape({
        phone_number: yup
            .string()
            .min(12, telephoneMin)
            .max(15, telephoneMax)
            .matches(/^\d+$/, telephoneMaxMatches)
            .required(telephoneRequired),
    });

    const submit = async (e) => {
        e.preventDefault();
        setValidationErrors({});

        try {
            // Validate the data using the combined schema
            await updatePhoneNumberSchema.validate(data, { abortEarly: false });

            patch(route("profile-phone-number.update"), {
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

    const handleButtonClick = () => {
        router.get(
            "/verify-mobile",
            {},
            {
                onFinish: () => {
                    router.post("/verify-mobile/send-code");
                },
            }
        );
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
                    <InputLabel htmlFor="phone_number" value={phoneNumber} />
                    <div className="relative">
                        <TextInput
                            id="phone_number"
                            className="block w-full mt-1"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            required
                        />
                        {user.verification.phone_verified_at !== null ? (
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
                        message={validationErrors.phone_number}
                    />
                    {errors.phone_number && (
                        <InputError
                            message={
                                i18n.language === "en"
                                    ? errors.phone_number
                                    : "Αυτός ο αριθμός αντιστοιχεί σε κάποιον άλλον χρήστη."
                            }
                            className="mt-2"
                        />
                    )}
                </div>

                {user.phone_number !== null
                    ? user.verification.phone_verified_at === null && (
                          <div>
                              <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                                  <button
                                      onClick={handleButtonClick}
                                      type="button"
                                      className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                  >
                                      {verifyPhoneNumberBtn}
                                  </button>
                              </p>
                          </div>
                      )
                    : null}

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

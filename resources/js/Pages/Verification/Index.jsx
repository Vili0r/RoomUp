import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoShieldCheckmark } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { TfiSettings } from "react-icons/tfi";
import { HiOutlineIdentification } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const Index = (props) => {
    const { user } = usePage().props;
    const { processing } = useForm({});

    const { t, i18n } = useTranslation();
    const {
        stepOne,
        accountDetails,
        stepTwo,
        email,
        stepThree,
        phone,
        stepFour,
        socialMedia,
        stepFive,
        selfie,
        stepSix,
        idStepSix,
        verify,
        message,
    } = t("verification");

    const submit = (e) => {
        e.preventDefault();

        const canBeVerified =
            user.verification.last_name_verified_at !== null &&
            user.verification.email_verified_at !== null &&
            user.verification.phone_verified_at !== null &&
            user.verification.social_media_verified_at &&
            user.verification.phone_verified_at !== null &&
            user.verification.selfie_verified_at !== null &&
            user.verification.id_document_verified_at !== null;

        if (canBeVerified) {
            router.post("/verification");
        } else {
            alert(message);
        }
    };

    const getVerificationMessage = (status) => {
        switch (status) {
            case "Pending":
                return i18n.language === "gr"
                    ? "Η επαλήθευση του λογαριασμού σας εκκρεμεί."
                    : "Your account verification is pending.";
            case "Verified":
                return i18n.language === "gr"
                    ? "Έχετε επιτυχώς επαληθεύσει τον λογαριασμό σας."
                    : "You have successfully verified your account.";
            case "Cancelled":
                return i18n.language === "gr"
                    ? "Ο λογαριασμός ακυρώθηκε."
                    : "Account has been cancelled.";
            default:
                return i18n.language === "gr"
                    ? "Προχωρήστε στα βήματα για να επαληθεύσετε τον λογαριασμό σας."
                    : "Go through the steps to verify your account.";
        }
    };
    const getStatusMessage = (status) => {
        switch (status) {
            case "Pending":
                return i18n.language === "gr" ? "Εκκρεμεί" : "Pending";
            case "Verified":
                return i18n.language === "gr" ? "Επαληθευμένο" : "Verified";
            case "Cancelled":
                return i18n.language === "gr" ? "Aκυρώθηκε." : "Cancelled";
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Virify my account" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto space-y-6 sm:px-4 lg:px-8">
                    <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                        <div className="w-full py-4 lg:px-24 md:px-6">
                            <div className="relative flex items-center justify-between w-full">
                                <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                                <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500"></div>
                                <div
                                    className={`${
                                        user.verification.last_name_verified_at
                                            ? "text-white bg-gray-900"
                                            : "text-gray-900 bg-gray-300"
                                    } + relative z-10 grid w-10 h-10 [@media(max-width:400px)]:w-8 [@media(max-width:400px)]:h-8 font-bold  transition-all duration-300 bg-gray-900 rounded-full place-items-center`}
                                >
                                    <BiUser className="w-5 h-5 text-white [@media(max-width:400px)]:w-4 [@media(max-width:400px)]:h-4" />

                                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                                        <h6 className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-700 xxs:text-base">
                                            {stepOne}
                                        </h6>
                                        <p className="block xs:pl-9 pl-4 font-sans text-[10px] xxs:text-xs xs:text-base antialiased font-normal leading-relaxed text-gray-700 sm:pl-0">
                                            {accountDetails}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        user.verification.email_verified_at
                                            ? "text-white bg-gray-900"
                                            : "text-gray-900 bg-gray-300"
                                    } + relative z-10 grid w-10 h-10 [@media(max-width:400px)]:w-8 [@media(max-width:400px)]:h-8 font-bold  transition-all duration-300 bg-gray-900 rounded-full place-items-center`}
                                >
                                    <MdOutlineMailOutline className="w-4 h-4 text-white [@media(max-width:400px)]:w-4 [@media(max-width:400px)]:h-4" />

                                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                                        <h6 className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-gray-700 xxs:text-base">
                                            {stepTwo}
                                        </h6>
                                        <p className="block font-sans xs:text-base text-[10px] xxs:text-xs antialiased font-normal leading-relaxed text-gray-700">
                                            {email}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        user.verification.phone_verified_at
                                            ? "text-white bg-gray-900"
                                            : "text-gray-900 bg-gray-300"
                                    } + relative z-10 grid w-10 h-10 [@media(max-width:400px)]:w-8 [@media(max-width:400px)]:h-8 font-bold  transition-all duration-300 bg-gray-900 rounded-full place-items-center`}
                                >
                                    <AiOutlinePhone className="w-5 h-5 text-white [@media(max-width:400px)]:w-4 [@media(max-width:400px)]:h-4" />
                                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                                        <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-900">
                                            {stepThree}
                                        </h6>
                                        <p className="block font-sans xs:text-base text-[10px] xxs:text-xs antialiased font-normal leading-relaxed text-gray-900">
                                            {phone}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        user.verification
                                            .social_media_verified_at
                                            ? "text-white bg-gray-900"
                                            : "text-gray-900 bg-gray-300"
                                    } + relative z-10 grid w-10 h-10 [@media(max-width:400px)]:w-8 [@media(max-width:400px)]:h-8 font-bold  transition-all duration-300 bg-gray-900 rounded-full place-items-center`}
                                >
                                    <TfiSettings className="w-5 h-5 text-white [@media(max-width:400px)]:w-4 [@media(max-width:400px)]:h-4" />
                                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                                        <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-900">
                                            {stepFour}
                                        </h6>
                                        <p className="block font-sans xs:text-base text-[10px] xxs:text-xs antialiased font-normal leading-relaxed text-gray-900">
                                            {socialMedia}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        user.verification.selfie_verified_at
                                            ? "text-white bg-gray-900"
                                            : "text-gray-900 bg-gray-300"
                                    } + relative z-10 grid w-10 h-10 [@media(max-width:400px)]:w-8 [@media(max-width:400px)]:h-8 font-bold  transition-all duration-300 bg-gray-900 rounded-full place-items-center`}
                                >
                                    <MdOutlinePhotoCamera className="w-5 h-5 text-white [@media(max-width:400px)]:w-4 [@media(max-width:400px)]:h-4" />
                                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                                        <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
                                            {stepFive}
                                        </h6>
                                        <p className="block font-sans xs:text-base text-[10px] xxs:text-xs antialiased font-normal leading-relaxed text-gray-700">
                                            {selfie}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        user.verification
                                            .id_document_verified_at
                                            ? "text-white bg-gray-900"
                                            : "text-gray-900 bg-gray-300"
                                    } + relative z-10 grid w-10 h-10 [@media(max-width:400px)]:w-8 [@media(max-width:400px)]:h-8 font-bold  transition-all duration-300 bg-gray-900 rounded-full place-items-center`}
                                >
                                    <HiOutlineIdentification className="w-5 h-5 text-white [@media(max-width:400px)]:w-4 [@media(max-width:400px)]:h-4" />
                                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                                        <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700">
                                            {stepSix}
                                        </h6>
                                        <p className="block font-sans xs:text-base text-[10px] xxs:text-xs antialiased font-normal leading-relaxed text-gray-700">
                                            {idStepSix}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-32">
                                <div>
                                    <IoShieldCheckmark
                                        size={64}
                                        className={`${
                                            user.verification.status ===
                                            "Pending"
                                                ? "text-gray-800"
                                                : user.verification.status ===
                                                  "Verified"
                                                ? "text-green-500"
                                                : user.verification.status ===
                                                  "Unverified"
                                                ? "text-gray-200"
                                                : "text-orange-300"
                                        }`}
                                    />
                                    <h2 className="block mt-4 font-sans text-3xl antialiased font-extrabold leading-relaxed tracking-normal text-gray-700">
                                        {getStatusMessage(
                                            user.verification.status
                                        )}
                                    </h2>
                                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                                        {getVerificationMessage(
                                            user.verification.status
                                        )}
                                    </p>
                                </div>
                                {user.verification.status === "Unverified" ? (
                                    <form onSubmit={submit}>
                                        <PrimaryButton
                                            className="inline-flex items-center px-4 py-3 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                                            disabled={processing}
                                        >
                                            {verify}
                                        </PrimaryButton>
                                    </form>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;

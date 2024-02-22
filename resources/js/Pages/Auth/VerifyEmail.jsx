import AuxiliaryLayout from "@/Layouts/AuxiliaryLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const { t } = useTranslation();
    const { title, statusTitle, resendBtn, logOutBtn } = t("auth.verifyEmail");
    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <AuxiliaryLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {title}
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {statusTitle}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between mt-4">
                    <PrimaryButton
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                        disabled={processing}
                    >
                        {resendBtn}
                    </PrimaryButton>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        {logOutBtn}
                    </Link>
                </div>
            </form>
        </AuxiliaryLayout>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePhoneNumber from "./Partials/UpdatePhoneNumber";
import { Head, usePage } from "@inertiajs/react";
import UpdateProfilePhoto from "./Partials/UpdateProfilePhoto";
import UpdateSocialLinks from "./Partials/UpdateSocialLinks";
import UpdateSelfieDocument from "./Partials/UpdateSelfieDocument";
import UpdateIdDocument from "./Partials/UpdateIdDocument";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { user } = usePage().props;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            user={user}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdatePhoneNumber user={user} className="max-w-xl" />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdateProfilePhoto user={user} className="max-w-xl" />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdateSocialLinks user={user} className="max-w-xl" />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdateSelfieDocument
                            user={user}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdateIdDocument user={user} className="max-w-xl" />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

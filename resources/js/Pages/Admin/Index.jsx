import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Index(props) {
    return (
        <AdminLayout auth={props.auth} errors={props.errors}>
            <Head title="Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in as {props.auth.user.first_name}!
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

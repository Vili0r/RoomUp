import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

const Terms = (props) => {
    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Terms & Conditions" />
            <section className="mt-12 bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 lg:text-5xl dark:text-white">
                        Terms & Conditions
                    </h1>

                    <hr className="my-6 border-gray-200 dark:border-gray-700" />
                    <p>
                        Welcome to Roomup! These terms and conditions outline
                        the rules and regulations for the use of Roomup's
                        Website and App. By accessing this app we assume you
                        accept these terms and conditions. Do not continue to
                        use Roomup if you do not agree to take all of the terms
                        and conditions stated on this page. User Accounts: Users
                        must be 18 years or older to create an account. All
                        information provided during account creation must be
                        accurate and truthful. Users are responsible for
                        maintaining the confidentiality of their account
                        details. Listing and Interactions: Users must own or
                        have explicit permission to list a property for sharing.
                        All listings must provide accurate and current
                        information about the property. Harassment,
                        discrimination, and any form of abuse are strictly
                        prohibited. Intellectual Property Rights: Other than the
                        content you own, under these Terms, Roomup and/or its
                        licensors own all the intellectual property rights and
                        materials contained in this app. Limitation of
                        Liability: Roomup is not liable for any direct,
                        indirect, special, or consequential loss or damage that
                        may occur from the use of the app. Changes to Terms and
                        Conditions: Roomup reserves the right to modify these
                        terms and conditions at any time. Users will be notified
                        of any changes. Governing Law: These terms and
                        conditions are governed by [applicable law] and any
                        disputes will be resolved in accordance with the laws of
                        [Jurisdiction]. Contact Us: For any questions or
                        inquiries regarding our terms and conditions, please
                        contact us.
                    </p>
                </div>
            </section>
        </GuestLayout>
    );
};

export default Terms;

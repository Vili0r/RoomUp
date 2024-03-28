import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Terms = (props) => {
    const { t } = useTranslation();
    const {
        title,
        subTitle,
        description,
        subDescription,
        titleTermOne,
        descriptionOneTermOne,
        descriptionTwoTermOne,
        descriptionThreeTermOne,
        titleTermTwo,
        descriptionOneTermTwo,
        descriptionTwoTermTwo,
        descriptionThreeTermTwo,
        titleTermThree,
        descriptionOneTermThree,
        titleTermFour,
        descriptionOneTermFour,
        titleTermFive,
        descriptionOneTermFive,
        titleTermSix,
        descriptionOneTermSix,
        titleTermSeven,
        descriptionOneTermSeven,
    } = t("welcome.terms");

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Terms & Conditions" />
            <section className="mt-12 bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 lg:text-5xl dark:text-white">
                        {title}
                    </h1>

                    <hr className="my-6 border-gray-200 dark:border-gray-700" />
                    <div>
                        <h1 className="text-xl font-bold">{subTitle}</h1>
                        <h5 className="mt-5">{description}</h5>
                        <h5 className="mt-5">{subDescription}</h5>
                        <h1 className="mt-5 text-base font-bold">
                            {titleTermOne}
                        </h1>
                        <ul>
                            <li>{descriptionOneTermOne}</li>
                            <li>{descriptionTwoTermOne}</li>
                            <li>{descriptionThreeTermOne}</li>
                        </ul>
                        <h1 className="mt-5 text-base font-bold">
                            {titleTermTwo}
                        </h1>
                        <ul>
                            <li>{descriptionOneTermTwo}</li>
                            <li>{descriptionTwoTermTwo}</li>
                            <li>{descriptionThreeTermTwo}</li>
                        </ul>
                        <h1 className="mt-5 text-base font-bold">
                            {titleTermThree}
                        </h1>
                        {descriptionOneTermThree}
                        <h1 className="mt-5 text-base font-bold">
                            {titleTermFour}
                        </h1>
                        {descriptionOneTermFour}{" "}
                        <h1 className="mt-5 text-base font-bold">
                            {titleTermFive}
                        </h1>{" "}
                        {descriptionOneTermFive}
                        <h1 className="mt-5 text-base font-bold">
                            {titleTermSix}
                        </h1>
                        {descriptionOneTermSix}
                        <h1 className="mt-5 text-base font-bold">
                            {titleTermSeven}
                        </h1>
                        {descriptionOneTermSeven}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default Terms;

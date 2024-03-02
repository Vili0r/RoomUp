import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Categories = ({ categories }) => {
    const { t } = useTranslation();
    const { categoriesComponent } = t("blog");

    return (
        <div className="p-8 pb-2 mb-8 bg-white rounded-lg shadow-lg">
            <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
                {categoriesComponent}
            </h3>
            {categories.map((category) => (
                <Link
                    href={route("single.category.show", category.slug)}
                    key={category.id}
                    className="tex-md"
                >
                    <span className="block pb-3 mb-3 cursor-pointer">
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;

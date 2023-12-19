import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create(props) {
    const { categories } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        body: "",
        published_at: "",
        category_id: "",
        image: null,
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleBody = (value) => {
        setData("body", value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.blogs.store"));
    };

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Blogs|Create
                </h2>
            }
        >
            <Head title="Creta blog" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="max-w-screen-xl px-4 mx-auto md:px-8">
                                <form onSubmit={submit}>
                                    <div className="mb-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                placeholder="Title"
                                                value={data.title}
                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                                onChange={handleOnChange}
                                            />
                                            <label
                                                htmlFor="title"
                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Title
                                            </label>
                                        </div>

                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="text-gray-700"
                                            htmlFor="body"
                                        >
                                            Body
                                        </label>

                                        <ReactQuill
                                            theme="snow"
                                            value={data.body}
                                            onChange={handleBody}
                                            placeholder={
                                                "Write something awesome..."
                                            }
                                            className="h-[18rem]"
                                        />
                                        <InputError
                                            messages={errors.body}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <div className="relative mt-[5rem]">
                                            <input
                                                type="date"
                                                name="published_at"
                                                id="published_at"
                                                placeholder="Published at"
                                                value={data.published_at}
                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                                onChange={handleOnChange}
                                            />
                                            <label
                                                htmlFor="published_at"
                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Published At
                                            </label>
                                        </div>

                                        <InputError
                                            message={errors.published_at}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <div className="relative mt-10">
                                            <select
                                                type="text"
                                                name="category_id"
                                                id="category_id"
                                                placeholder="Category"
                                                value={data.category_id}
                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                                onChange={handleOnChange}
                                            >
                                                <option value="">
                                                    Select category
                                                </option>
                                                {categories.map(
                                                    ({ id, name }) => (
                                                        <option
                                                            key={id}
                                                            value={id}
                                                        >
                                                            {name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            <label
                                                htmlFor="category_id"
                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Category
                                            </label>
                                        </div>

                                        <InputError
                                            message={errors.category_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="relative mt-10">
                                        <input
                                            type="file"
                                            name="image"
                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                            onChange={(e) =>
                                                setData(
                                                    "image",
                                                    e.target.files[0]
                                                )
                                            }
                                        />

                                        <label
                                            htmlFor="image"
                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                        >
                                            Upload Cover Image
                                        </label>

                                        <InputError
                                            message={errors.image}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="my-6">
                                        <PrimaryButton
                                            disabled={processing}
                                            className="w-full px-3 py-4 text-white bg-black rounded-md hover:bg-gray-900/90 focus:bg-neutral-800 focus:outline-none font-popp"
                                        >
                                            {processing
                                                ? "Processing..."
                                                : "Create"}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

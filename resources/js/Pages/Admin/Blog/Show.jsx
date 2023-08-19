import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import {
    InputError,
    InputLabel,
    SecondaryButton,
    Modal,
    PrimaryButton,
    DangerButton,
} from "@/Components";
import moment from "moment";

const Show = (props) => {
    const { blog } = usePage().props;
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteBlogModal, setOpenDeleteBlogModal] = useState(false);

    const {
        data,
        setData,
        processing,
        reset,
        put,
        errors,
        delete: destroy,
        setDefaults,
    } = useForm({
        featured: blog.featured,
    });

    const showImage = () => {
        return "/storage/";
    };

    const closeModal = () => {
        setOpenModal(false);

        reset();
    };

    const closeDeleteModal = () => {
        setOpenDeleteBlogModal(false);

        reset();
    };

    useEffect(() => {
        setDefaults({
            featured: data.featured,
        });
    }, [data]);

    const submit = (e) => {
        e.preventDefault();

        put(route("admin.blog.featured", blog.id), {
            onSuccess: () => {
                closeModal();
            },
            onFinish: () => reset(),
        });
    };

    const deleteBlog = (e) => {
        e.preventDefault();

        destroy(route("admin.blogs.destroy", blog.id), {
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    return (
        <AdminLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {blog.title}
                </h2>
            }
        >
            <Head title="My Property" />
            <div className="py-12">
                <Modal show={openModal} onClose={closeModal}>
                    <form onSubmit={submit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Manage Blog
                        </h2>

                        <div className="relative mt-6">
                            <div className="relative">
                                <input
                                    name="featured"
                                    type="checkbox"
                                    className="opacity-0 sr-only peer"
                                    id="featured"
                                    checked={data.featured ? true : false}
                                    value={data.featured}
                                    onChange={(e) =>
                                        setData("featured", e.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="featured"
                                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-indigo-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                                >
                                    <span className="sr-only">Enable</span>
                                </label>
                            </div>

                            <InputLabel htmlFor="featured" value="Featured" />

                            <InputError
                                message={errors.featured}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton
                                className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                disabled={processing}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
                <Modal show={openDeleteBlogModal} onClose={closeDeleteModal}>
                    <form onSubmit={deleteBlog} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete this blog?
                        </h2>

                        <div className="flex justify-end mt-6">
                            <SecondaryButton onClick={closeDeleteModal}>
                                Cancel
                            </SecondaryButton>

                            <DangerButton
                                className="ml-3"
                                disabled={processing}
                            >
                                Delete Blog
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <img
                                    className="relative z-10 object-cover w-full rounded-md h-96"
                                    src={showImage() + blog.image}
                                    alt={blog.title}
                                />

                                <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                                    <span className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                                        {blog.title}
                                    </span>

                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                        {blog.excerpt}
                                    </p>

                                    <div className="flex justify-between">
                                        <p className="mt-3 text-sm text-blue-500">
                                            {moment(blog.published_at).format(
                                                "MMM DD, YYYY"
                                            )}
                                        </p>
                                        <span className="mt-3">
                                            {!blog.featured ? (
                                                <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                                                            stroke="#667085"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>

                                                    <h2 className="text-sm font-normal">
                                                        Halted
                                                    </h2>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10 3L4.5 8.5L2 6"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>

                                                    <h2 className="text-sm font-normal">
                                                        Featured
                                                    </h2>
                                                </div>
                                            )}
                                        </span>
                                    </div>

                                    <div className="self-center">
                                        <button
                                            type="button"
                                            onClick={() => setOpenModal(true)}
                                            className="px-3 py-2 text-sm font-medium leading-6 text-white bg-indigo-600 rounded-lg"
                                        >
                                            Manage availability
                                        </button>
                                        <PrimaryButton
                                            onClick={() =>
                                                setOpenDeleteBlogModal(true)
                                            }
                                            className="px-3 py-2 ml-3 text-sm font-medium leading-6 text-white bg-black rounded-lg"
                                        >
                                            Delete Blog
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Show;

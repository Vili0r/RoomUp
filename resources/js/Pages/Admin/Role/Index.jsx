import React, { useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, useForm, Link, router } from "@inertiajs/react";
import {
    InputError,
    InputLabel,
    SecondaryButton,
    Modal,
    PrimaryButton,
    TableRow,
    TableDataCell,
    TableHeaderCell,
    TableBody,
    TableHead,
    Pagination,
} from "@/Components";

const Index = ({ auth }) => {
    const { roles, permissions, filters } = usePage().props;
    const { meta } = roles;
    const [addRoleModal, setAddRoleModal] = useState(false);
    const [searchInput, setSearchInput] = useState(filters.search);
    const nameInput = useRef();
    const animatedComponents = makeAnimated();
    const { data, setData, processing, reset, errors, post } = useForm({
        name: "",
        permissions: [],
    });
    const [selectedPermissions, setSelectedPermissions] = useState();

    const handleSearch = (value) => {
        setSearchInput(value);
        router.get(
            "/admin/roles",
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    const handleChange = (e) => {
        const value = e.target.value;
        handleSearch(value);
    };

    const closeModal = () => {
        setAddRoleModal(false);

        reset();
    };

    const options = permissions.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const submit = (e) => {
        e.preventDefault();
        data.permissions = selectedPermissions.map((item) => {
            return {
                id: item.value,
                name: item.label,
            };
        });

        post(route("admin.roles.store"), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current.focus(),
            onFinish: () => reset(),
        });
    };
    return (
        <AdminLayout auth={auth}>
            <Head title="Admin - Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="items-start justify-between md:flex">
                                    <div className="max-w-lg">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            All Roles
                                        </h3>

                                        <span className="absolute mt-5">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                            </svg>
                                        </span>

                                        <input
                                            type="text"
                                            name="search"
                                            value={searchInput}
                                            onChange={handleChange}
                                            placeholder="Search..."
                                            className="block w-full mt-3 py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div className="mt-3 md:mt-0">
                                        <button
                                            onClick={() =>
                                                setAddRoleModal(true)
                                            }
                                            className="inline-block px-4 py-2 font-medium text-white duration-150 bg-[#270740] rounded-lg hover:bg-indigo-600 active:bg-[#270740] md:text-sm"
                                        >
                                            Add Role
                                        </button>
                                    </div>
                                </div>

                                <Modal show={addRoleModal} onClose={closeModal}>
                                    <form onSubmit={submit} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Add a new Role
                                        </h2>

                                        <div className="relative mt-6">
                                            <input
                                                type="name"
                                                name="name"
                                                id="name"
                                                ref={nameInput}
                                                placeholder="Role Name"
                                                value={data.name}
                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                autoComplete="off"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                            >
                                                Role Name
                                            </label>

                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-10">
                                            <InputLabel
                                                htmlFor="permissions"
                                                value="Permissions"
                                            />
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                onChange={(opt) =>
                                                    setSelectedPermissions(opt)
                                                }
                                                isMulti
                                                options={options}
                                            />
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <SecondaryButton
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </SecondaryButton>

                                            <PrimaryButton
                                                className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                                disabled={processing}
                                            >
                                                Add Role
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </Modal>

                                <div className="flex flex-col mt-6">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableHeaderCell>
                                                                Id
                                                            </TableHeaderCell>
                                                            <TableHeaderCell>
                                                                Name
                                                            </TableHeaderCell>

                                                            <TableHeaderCell>
                                                                Action
                                                            </TableHeaderCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {roles.data.map(
                                                            (role) => (
                                                                <TableRow
                                                                    key={
                                                                        role.id
                                                                    }
                                                                >
                                                                    <TableDataCell>
                                                                        {
                                                                            role.id
                                                                        }
                                                                    </TableDataCell>
                                                                    <TableDataCell>
                                                                        {
                                                                            role.name
                                                                        }
                                                                    </TableDataCell>

                                                                    <TableDataCell>
                                                                        <Link
                                                                            href={route(
                                                                                "admin.roles.edit",
                                                                                role.id
                                                                            )}
                                                                            className="underline text-[#F1C40F] hover:text-orange-400"
                                                                        >
                                                                            Edit/Delete
                                                                        </Link>
                                                                    </TableDataCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </table>
                                            </div>
                                            <Pagination
                                                currentPage={meta.current_page}
                                                lastPage={meta.last_page}
                                                links={meta.links}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;

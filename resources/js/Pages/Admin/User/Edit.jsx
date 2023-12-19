import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import TableRow from "@/Components/TableRow";
import TableDataCell from "@/Components/TableDataCell";
import TableHeaderCell from "@/Components/TableHeaderCell";
import TableBody from "@/Components/TableBody";
import TableHead from "@/Components/TableHead";

const genders = [
    {
        id: "1",
        title: "Male",
    },
    {
        id: "2",
        title: "Female",
    },
    {
        id: "3",
        title: "Prefer not to say",
    },
];

const lookingFor = [
    {
        id: "1",
        title: "I am looking for a flat or a house share",
    },
    {
        id: "2",
        title: "I have a flat or house share",
    },
    {
        id: "3",
        title: "I would like to find people to form share",
    },
];

const Index = ({ auth }) => {
    const { user, roles, permissions } = usePage().props;
    const rolesOptions = roles.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const permissionsOptions = permissions.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const selectedRolesOptions = user.userRoles.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const selectedPermissionsOptions = user.userPermissions.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const animatedComponents = makeAnimated();
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState(selectedRolesOptions);
    const [selectedPermissions, setSelectedPermissions] = useState(
        selectedPermissionsOptions
    );
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        gender: user.gender,
        birthdate: user.birthdate,
        looking_for: user.looking_for,
        avatar: null,
        roles: [],
        permissions: [],
    });

    const closeModal = () => {
        setDeleteUserModal(false);

        reset();
    };

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        data.permissions = selectedPermissions.map((item) => {
            return {
                id: item.value,
                name: item.label,
            };
        });

        data.roles = selectedRoles.map((item) => {
            return {
                id: item.value,
                name: item.label,
            };
        });

        put(route("admin.users.update", user.id));
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("admin.users.destroy", user.id), {
            onSuccess: () => closeModal(),
        });
    };

    const deleteUserRole = (userRoleId) => {
        destroy(route("admin.users.roles.destroy", [user.id, userRoleId]));
    };

    const deleteUserPermission = (userPermissionId) => {
        destroy(
            route("admin.users.permissions.destroy", [
                user.id,
                userPermissionId,
            ])
        );
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin | Edit User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            Edit User
                                        </h3>
                                    </div>
                                </div>

                                <div className="md:flex md:items-center md:justify-between">
                                    <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                                        <Link
                                            href={route("admin.users.index")}
                                            className="inline-block px-4 py-2 font-medium text-white duration-150 bg-[#270740] rounded-lg hover:bg-indigo-600 active:bg-[#270740] md:text-sm"
                                        >
                                            Back
                                        </Link>
                                    </div>

                                    <div className="relative flex items-center mt-4 md:mt-0">
                                        <button
                                            onClick={() =>
                                                setDeleteUserModal(true)
                                            }
                                            type="button"
                                            className="inline-block px-4 py-2 font-medium text-white duration-150 bg-[#270740] rounded-lg hover:bg-rose-600 active:bg-[#270740] md:text-sm"
                                        >
                                            Delete User
                                        </button>
                                    </div>
                                </div>

                                <Modal
                                    show={deleteUserModal}
                                    onClose={closeModal}
                                >
                                    <form onSubmit={deleteUser} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Are you sure you want to delete this
                                            user?
                                        </h2>

                                        <div className="flex justify-end mt-6">
                                            <SecondaryButton
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </SecondaryButton>

                                            <DangerButton
                                                className="ml-3"
                                                disabled={processing}
                                            >
                                                Delete User
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>

                                <div className="flex flex-col">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="max-w-xl mx-auto overflow-hidden md:rounded-lg">
                                                <form onSubmit={submit}>
                                                    <div className="mt-4">
                                                        <InputLabel
                                                            htmlFor="Roles"
                                                            value="Roles"
                                                        />
                                                        <Select
                                                            closeMenuOnSelect={
                                                                false
                                                            }
                                                            components={
                                                                animatedComponents
                                                            }
                                                            defaultValue={
                                                                selectedRolesOptions
                                                            }
                                                            onChange={(opt) =>
                                                                setSelectedRoles(
                                                                    opt
                                                                )
                                                            }
                                                            isMulti
                                                            options={
                                                                rolesOptions
                                                            }
                                                        />
                                                    </div>

                                                    <div className="mt-4">
                                                        <InputLabel
                                                            htmlFor="Permissions"
                                                            value="Permissions"
                                                        />
                                                        <Select
                                                            closeMenuOnSelect={
                                                                false
                                                            }
                                                            components={
                                                                animatedComponents
                                                            }
                                                            defaultValue={
                                                                selectedPermissionsOptions
                                                            }
                                                            onChange={(opt) =>
                                                                setSelectedPermissions(
                                                                    opt
                                                                )
                                                            }
                                                            isMulti
                                                            options={
                                                                permissionsOptions
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="text"
                                                                name="first_name"
                                                                id="first_name"
                                                                placeholder="First Name"
                                                                value={
                                                                    data.first_name
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="first_name"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                First Name
                                                            </label>
                                                        </div>
                                                        {errors.first_name && (
                                                            <InputError
                                                                message={
                                                                    errors.first_name
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="text"
                                                                name="last_name"
                                                                id="last_name"
                                                                placeholder="Last Name"
                                                                value={
                                                                    data.last_name
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="last_name"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Last Name
                                                            </label>
                                                        </div>

                                                        {errors.last_name && (
                                                            <InputError
                                                                message={
                                                                    errors.last_name
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                value={
                                                                    data.email
                                                                }
                                                                placeholder="Email Address"
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="email"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Email Address
                                                            </label>
                                                        </div>

                                                        {errors.email && (
                                                            <InputError
                                                                message={
                                                                    errors.email
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <input
                                                                type="date"
                                                                name="birthdate"
                                                                id="birthdate"
                                                                placeholder="Date Of Birth"
                                                                value={
                                                                    data.birthdate
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={
                                                                    handleOnChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="birthdate"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Date Of Birth
                                                            </label>
                                                        </div>
                                                        {errors.birthdate && (
                                                            <InputError
                                                                message={
                                                                    errors.birthdate
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <select
                                                                type="text"
                                                                name="gender"
                                                                id="gender"
                                                                placeholder="Gender"
                                                                value={
                                                                    data.gender
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "gender",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    Select your
                                                                    gender
                                                                </option>
                                                                {genders.map(
                                                                    ({
                                                                        id,
                                                                        title,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                title
                                                                            }
                                                                        >
                                                                            {
                                                                                title
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="gender"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Gender
                                                            </label>
                                                        </div>
                                                        {errors.gender && (
                                                            <InputError
                                                                message={
                                                                    errors.gender
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="relative mt-5">
                                                            <select
                                                                type="text"
                                                                name="looking_for"
                                                                id="looking_for"
                                                                placeholder="Looking For"
                                                                value={
                                                                    data.looking_for
                                                                }
                                                                className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                                autoComplete="off"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "looking_for",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    Select what
                                                                    you are
                                                                    looking for
                                                                </option>
                                                                {lookingFor.map(
                                                                    ({
                                                                        id,
                                                                        title,
                                                                    }) => (
                                                                        <option
                                                                            key={
                                                                                id
                                                                            }
                                                                            value={
                                                                                title
                                                                            }
                                                                        >
                                                                            {
                                                                                title
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                            <label
                                                                htmlFor="looking_for"
                                                                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                            >
                                                                Looking For
                                                            </label>
                                                        </div>

                                                        {errors.looking_for && (
                                                            <InputError
                                                                message={
                                                                    errors.looking_for
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>

                                                    <div className="relative mt-5">
                                                        <input
                                                            type="file"
                                                            name="avatar"
                                                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "avatar",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />

                                                        <label
                                                            htmlFor="avatar"
                                                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                                                        >
                                                            Photo Profile
                                                        </label>
                                                        {errors.avatar && (
                                                            <InputError
                                                                message={
                                                                    errors.avatar
                                                                }
                                                                className="mt-2"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="my-6">
                                                        <PrimaryButton
                                                            disabled={
                                                                processing
                                                            }
                                                            className="w-full hover:text-black rounded-md bg-black hover:bg-[#AED6F1] px-3 py-4 text-white focus:bg-neutral-800 focus:outline-none font-popp"
                                                        >
                                                            {processing
                                                                ? "Processing..."
                                                                : "Update User"}
                                                        </PrimaryButton>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                            Roles Assigned to{" "}
                                            <span className="uppercase">
                                                {data.first_name}
                                            </span>
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-6">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div class="relative overflow-x-auto">
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
                                                            {user.userRoles.map(
                                                                (userRole) => (
                                                                    <TableRow
                                                                        key={
                                                                            userRole.id
                                                                        }
                                                                    >
                                                                        <TableDataCell>
                                                                            {
                                                                                userRole.id
                                                                            }
                                                                        </TableDataCell>
                                                                        <TableDataCell>
                                                                            {
                                                                                userRole.name
                                                                            }
                                                                        </TableDataCell>

                                                                        <TableDataCell>
                                                                            <button
                                                                                onClick={() =>
                                                                                    deleteUserRole(
                                                                                        userRole.id
                                                                                    )
                                                                                }
                                                                                className="underline text-[#F1C40F] hover:text-red-500"
                                                                            >
                                                                                Revoke
                                                                            </button>
                                                                        </TableDataCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        </TableBody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                            Permissions Assigned to{" "}
                                            <span className="uppercase">
                                                {data.first_name}
                                            </span>
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-6">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div class="relative overflow-x-auto">
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
                                                            {user.userPermissions.map(
                                                                (
                                                                    userPermission
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            userPermission.id
                                                                        }
                                                                    >
                                                                        <TableDataCell>
                                                                            {
                                                                                userPermission.id
                                                                            }
                                                                        </TableDataCell>
                                                                        <TableDataCell>
                                                                            {
                                                                                userPermission.name
                                                                            }
                                                                        </TableDataCell>

                                                                        <TableDataCell>
                                                                            <button
                                                                                onClick={() =>
                                                                                    deleteUserPermission(
                                                                                        userPermission.id
                                                                                    )
                                                                                }
                                                                                className="underline text-[#F1C40F] hover:text-red-500"
                                                                            >
                                                                                Revoke
                                                                            </button>
                                                                        </TableDataCell>
                                                                    </TableRow>
                                                                )
                                                            )}
                                                        </TableBody>
                                                    </table>
                                                </div>
                                            </div>
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

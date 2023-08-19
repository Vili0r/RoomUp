import React, { useState, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import {
    InputError,
    InputLabel,
    SecondaryButton,
    Modal,
    PrimaryButton,
    DangerButton,
    TableRow,
    TableDataCell,
    TableHeaderCell,
    TableBody,
    TableHead,
} from "@/Components";

const Edit = ({ auth }) => {
    const { role, permissions } = usePage().props;
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        name: role.name,
        permissions: [],
    });
    const [deleteRoleModal, setDeleteRoleModal] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState();
    const nameInput = useRef();
    const animatedComponents = makeAnimated();

    const closeModal = () => {
        setDeleteRoleModal(false);

        reset();
    };

    const options = permissions.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const selectedOptions = role.permissions.map((item) => {
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

        put(route("admin.roles.update", role.id), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const deleteRole = (e) => {
        e.preventDefault();

        destroy(route("admin.roles.destroy", role.id), {
            onSuccess: () => closeModal(),
            onError: () => nameInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const deleteRolePermission = (rolePermisionId) => {
        destroy(
            route("admin.roles.permissions.destroy", [role.id, rolePermisionId])
        );
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin - Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <section className="container px-4 mx-auto">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-x-3">
                                        <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                                            Roles
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-6 md:flex md:items-center md:justify-between">
                                    <div className="relative flex items-center mt-4 md:mt-0">
                                        <Link
                                            href={route("admin.roles.index")}
                                            className="inline-block px-4 py-2 font-medium text-white duration-150 bg-[#270740] rounded-lg hover:bg-indigo-600 active:bg-[#270740] md:text-sm"
                                        >
                                            Back
                                        </Link>
                                    </div>
                                    <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                                        <button
                                            onClick={() =>
                                                setDeleteRoleModal(true)
                                            }
                                            type="button"
                                            className="inline-block px-4 py-2 font-medium text-white duration-150 bg-[#270740] rounded-lg hover:bg-rose-600 active:bg-[#270740] md:text-sm"
                                        >
                                            Delete Role
                                        </button>
                                    </div>
                                </div>
                                <Modal
                                    show={deleteRoleModal}
                                    onClose={closeModal}
                                >
                                    <form onSubmit={deleteRole} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Are you sure you want to delete this
                                            role?
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
                                                Delete Role
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>

                                <div className="flex flex-col mt-6">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div class="relative overflow-x-auto">
                                                <form
                                                    onSubmit={submit}
                                                    className="p-6"
                                                >
                                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                        Update Role
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
                                                                    e.target
                                                                        .value
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
                                                            message={
                                                                errors.name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="mt-10">
                                                        <InputLabel
                                                            htmlFor="permissions"
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
                                                                selectedOptions
                                                            }
                                                            onChange={(opt) =>
                                                                setSelectedPermissions(
                                                                    opt
                                                                )
                                                            }
                                                            isMulti
                                                            options={options}
                                                        />
                                                    </div>

                                                    <div className="flex justify-end mt-6">
                                                        <PrimaryButton
                                                            className="px-4 py-2 ml-3 text-white bg-black rounded-lg"
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            Update Role
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
                                            Permissions Assigned to{" "}
                                            <span className="uppercase">
                                                {data.name}
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
                                                            {role.permissions.map(
                                                                (
                                                                    rolePermission
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            rolePermission.id
                                                                        }
                                                                    >
                                                                        <TableDataCell>
                                                                            {
                                                                                rolePermission.id
                                                                            }
                                                                        </TableDataCell>
                                                                        <TableDataCell>
                                                                            {
                                                                                rolePermission.name
                                                                            }
                                                                        </TableDataCell>

                                                                        <TableDataCell>
                                                                            <button
                                                                                onClick={() =>
                                                                                    deleteRolePermission(
                                                                                        rolePermission.id
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

export default Edit;

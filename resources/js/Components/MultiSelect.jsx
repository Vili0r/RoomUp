import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const MultiSelect = ({
    permissions,
    selectedPermissions,
    setSelectedPermissions,
}) => {
    const [query, setQuery] = useState("");

    const filteredPermissions =
        query === ""
            ? permissions
            : permissions.filter((permission) =>
                  permission.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <>
            <div className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none">
                <Combobox
                    value={selectedPermissions}
                    onChange={setSelectedPermissions}
                    multiple
                >
                    <div className="relative mt-1">
                        <div className="relative w-full overflow-hidden text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
                                displayValue={(permissions) =>
                                    permissions
                                        .map((permission) => permission.name)
                                        .join(", ")
                                }
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredPermissions.length === 0 &&
                                query !== "" ? (
                                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredPermissions.map((permission) => (
                                        <Combobox.Option
                                            key={permission.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-[#F1C40F] text-white"
                                                        : "text-gray-900"
                                                }`
                                            }
                                            value={permission}
                                        >
                                            {({
                                                selectedPermissions,
                                                active,
                                            }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selectedPermissions
                                                                ? "font-medium"
                                                                : "font-normal"
                                                        }`}
                                                    >
                                                        {permission.name}
                                                    </span>
                                                    {selectedPermissions ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active
                                                                    ? "text-white"
                                                                    : "text-teal-600"
                                                            }`}
                                                        >
                                                            <CheckIcon
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>

            <label
                htmlFor="email"
                className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
            >
                Permissions
            </label>
        </>
    );
};

export default MultiSelect;

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdatePhoneNumber({ className, user }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            phone_number: user.phone_number,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile-phone-number.update"), {
            preserveScroll: true,
        });
    };

    const handleButtonClick = () => {
        router.get(
            "/verify-mobile",
            {},
            {
                onFinish: () => {
                    router.post("/verify-mobile/send-code");
                },
            }
        );
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Phone Number
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile phone number, which will
                    increase the security and will reach more flatmates.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="phone_number"
                        value="Phone Number ex. +306911234567"
                    />
                    <div className="relative">
                        <TextInput
                            id="phone_number"
                            className="block w-full mt-1"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            required
                        />
                        {user.verification.phone_verified_at !== null ? (
                            <span className="bg-green-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                Verified
                            </span>
                        ) : (
                            <span className="bg-gray-600/70 absolute px-2 py-1 text-white rounded-md top-[9px] right-1">
                                Unverified
                            </span>
                        )}
                    </div>
                    <InputError
                        className="mt-2"
                        message={errors.phone_number}
                    />
                </div>

                {user.phone_number !== null
                    ? user.verification.phone_verified_at === null && (
                          <div>
                              <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                                  <button
                                      onClick={handleButtonClick}
                                      type="button"
                                      // href={route("verification-mobile.notice")}
                                      // method="get"
                                      // as="button"
                                      className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                  >
                                      Click here to verify your phone number.
                                  </button>
                              </p>
                          </div>
                      )
                    : null}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                        disabled={processing}
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateSocialLinks({ className, user }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            facebook_link: user.facebook_link,
            instagram_link: user.instagram_link,
            tiktok_link: user.tiktok_link,
            linkedin_link: user.linkedin_link,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile-social-links.update"), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Profile Social Media
                    </h2>
                    {user.verification.social_media_verified_at !== null ? (
                        <span className="px-2 py-1 text-white rounded-md bg-green-600/70">
                            Verified
                        </span>
                    ) : (
                        <span className="px-2 py-1 text-white rounded-md bg-gray-600/70">
                            Unverified
                        </span>
                    )}
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile social media, which will
                    increase the security and will reach more flatmates.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="facebook_link" value="Facebook" />

                    <TextInput
                        id="facebook_link"
                        className="block w-full mt-1"
                        value={data.facebook_link}
                        onChange={(e) =>
                            setData("facebook_link", e.target.value)
                        }
                        isFocused
                        autoComplete="off"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.facebook_link}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="instagram_link" value="Instagram" />

                    <TextInput
                        id="instagram_link"
                        className="block w-full mt-1"
                        value={data.instagram_link}
                        onChange={(e) =>
                            setData("instagram_link", e.target.value)
                        }
                        isFocused
                        autoComplete="off"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.instagram_link}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="tiktok_link" value="Tik Tok" />

                    <TextInput
                        id="tiktok_link"
                        className="block w-full mt-1"
                        value={data.tiktok_link}
                        onChange={(e) => setData("tiktok_link", e.target.value)}
                        isFocused
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.tiktok_link} />
                </div>
                <div>
                    <InputLabel htmlFor="linkedin_link" value="Linkedin" />

                    <TextInput
                        id="linkedin_link"
                        className="block w-full mt-1"
                        value={data.linkedin_link}
                        onChange={(e) =>
                            setData("linkedin_link", e.target.value)
                        }
                        isFocused
                        autoComplete="off"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.linkedin_link}
                    />
                </div>

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

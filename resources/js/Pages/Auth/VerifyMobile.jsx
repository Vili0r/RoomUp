import AuxiliaryLayout from "@/Layouts/AuxiliaryLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function VerifyEmail() {
    const { phone_number, status } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        code: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.verify-mobile"));
    };

    const maskNumber = (number) => {
        const numStr = number.toString();
        // Ensure the number is long enough
        if (numStr.length > 8) {
            const visibleFirst = numStr.slice(0, 5); // First 5 digits
            const visibleLast = numStr.slice(-3); // Last 3 digits
            const maskedSection = numStr.slice(5, -3).replace(/\d/g, "X"); // Replace middle section with "X"
            return visibleFirst + maskedSection + visibleLast;
        }
        return numStr;
    };

    return (
        <AuxiliaryLayout>
            <Head title="Mobile Verification" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Thanks for signing up! Before getting started, you need to
                verify your mobile phone number.
            </div>

            <div class="text-sm text-gray-600">
                'Please enter the OTP sent to your number:{" "}
                {maskNumber(phone_number)}
            </div>

            <form onSubmit={submit}>
                <div>
                    <div className="relative mt-5">
                        <input
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Code"
                            value={data.code}
                            className="w-full px-3 py-3 border border-gray-300 rounded-md shadow peer shadow-gray-100 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                            autoComplete="off"
                            onChange={handleOnChange}
                        />
                        <label
                            htmlFor="code"
                            className="absolute top-0 left-0 px-1 ml-3 text-sm text-gray-500 transition-all duration-100 ease-in-out origin-left transform -translate-y-1/2 bg-white pointer-events-none font-popp peer-placeholder-shown:top-1/2 peer-placeholder-shown:ml-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:ml-3 peer-focus:text-sm peer-focus:text-gray-800"
                        >
                            Code
                        </label>
                    </div>
                    {errors.code && (
                        <InputError message={errors.code} className="mt-2" />
                    )}
                </div>
                {status === "invalid-code" ||
                    (status === "mobile.error_with_attempts" && (
                        <div className="mb-4 text-sm font-medium text-red-600 dark:text-green-400">
                            This is an invalid code try again.
                        </div>
                    ))}
                {status === "mobile.new_code" && (
                    <div className="mb-4 text-sm font-medium text-red-600 dark:text-green-400">
                        New code has been sent.
                    </div>
                )}
                {status === "mobile-expired" && (
                    <div className="mb-4 text-sm font-medium text-red-600 dark:text-green-400">
                        The code has expired.
                    </div>
                )}
                {status === "mobile.error_wait" && (
                    <div className="mb-4 text-sm font-medium text-red-600 dark:text-green-400">
                        Reached maximum attempts.
                    </div>
                )}
                <div className="flex items-center justify-between mt-4">
                    <PrimaryButton
                        className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25"
                        disabled={processing}
                    >
                        Verify
                    </PrimaryButton>
                </div>
            </form>
        </AuxiliaryLayout>
    );
}

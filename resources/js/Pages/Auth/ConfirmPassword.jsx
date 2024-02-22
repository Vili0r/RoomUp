import { useEffect } from "react";
import AuxiliaryLayout from "@/Layouts/AuxiliaryLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });
    const { t } = useTranslation();
    const { confirmBtn, description } = t("auth.confrimPassword");

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <AuxiliaryLayout>
            <Head title="Confirm Password" />
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {description}
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        {confirmBtn}
                    </PrimaryButton>
                </div>
            </form>
        </AuxiliaryLayout>
    );
}

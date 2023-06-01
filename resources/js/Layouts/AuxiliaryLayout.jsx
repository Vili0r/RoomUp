import { Link } from "@inertiajs/react";
import { logo } from "@/assets";
import GuestLayout from "@/Layouts/GuestLayout";

export default function AuxiliaryGuest({ children }) {
    return (
        <GuestLayout>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f3f2f2] dark:bg-gray-900">
                <div>
                    <Link href="/">
                        <img src={logo} alt="logo" className="w-20 h-20" />
                        <span className="text-gray-500 self-center ml-2  text-xl font-[500] whitespace-nowrap font-popp">
                            RoomUp
                        </span>
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </GuestLayout>
    );
}

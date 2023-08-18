import { Link } from "@inertiajs/react";

export default function SidebarNavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`${
                active ? "active-link" : "text-[#8AB3C0]"
            } lg:relative lg:px-[1.5rem] lg:space-x-[2rem] p-[1rem] gap-[1.5rem] items-center sidebar_link grid rounded-[.25rem] ${className}`}
        >
            {children}
        </Link>
    );
}

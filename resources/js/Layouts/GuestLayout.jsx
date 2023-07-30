import { Footer, Header } from "@/sections";

export default function Guest({ children, user }) {
    return (
        <>
            <Header user={user} />
            {children}
            <Footer />
        </>
    );
}

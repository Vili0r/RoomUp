import Footer from "@/sections/Footer";
import Header from "@/sections/Header";

export default function Guest({ children, user }) {
    return (
        <>
            <Header user={user} />
            {children}
            <Footer />
        </>
    );
}

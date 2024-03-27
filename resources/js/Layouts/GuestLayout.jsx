import Footer from "@/sections/Footer";
import Header from "@/sections/Header";

export default function Guest({ children, user, scrollToServices }) {
    return (
        <>
            <Header user={user} />
            {children}
            <Footer scrollToServices={scrollToServices} />
        </>
    );
}

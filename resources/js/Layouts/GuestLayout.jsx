import { Footer, Header } from "@/sections";

export default function Guest({ children, user, selectedQueries }) {
    return (
        <>
            <Header user={user} selectedQueries={selectedQueries} />
            {children}
            <Footer />
        </>
    );
}

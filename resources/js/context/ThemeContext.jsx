import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const handleTheme = () => {
        setTheme((curr) => (curr === "dark" ? "light" : "dark"));
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;

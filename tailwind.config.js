const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        screens: {
            xxs: "350px",
            xs: "480px",
            sm: "640px",
            md: "800px",
            lg: "1024px",
            xl: "1280px",
            xxl: "1536px",
        },
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                popp: ["Poppins"],
            },
        },
        spinner: (theme) => ({
            default: {
                color: "#d7d4d4", // color you want to make the spinner
                size: "1em", // size of the spinner (used for both width and height)
                border: "2px", // border-width of the spinner (shouldn't be bigger than half the spinner's size)
                speed: "500ms", // the speed at which the spinner should rotate
            },
        }),
    },

    plugins: [
        require("@tailwindcss/forms"),
        require("tailwindcss-spinner")({
            className: "spinner",
            themeKey: "spinner",
        }),
    ],

    darkMode: "class",
};

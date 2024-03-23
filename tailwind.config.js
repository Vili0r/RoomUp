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
    },

    plugins: [require("@tailwindcss/forms")],

    darkMode: "class",
};

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            header: {
                placeAd: "Place Ad",
                blog: "Blog",
                searchHeader: "Search",
                login: "Login",
                adModal: {
                    title: "List your property",
                    room: "Rooms to Rent ad",
                    roomDescription: "Advertise one or more rooms",
                    whole: "Whole property ad.",
                    wholeDescription: "Advertise a self contained property",
                    roomWanted: "Room wanted ad.",
                    roomWantedDescription:
                        "People offering rooms can find out more about you and get in touch",
                },
                searchModal: {
                    title: "Find your property",
                    description:
                        "Select through the multiple filter to find your ideal room or property.",
                    button: {
                        rent: "Rent",
                        flatmate: "Flatmate",
                        searchBtn: "Search",
                        next: "Next",
                        previous: "Previous",
                    },
                    stepOne: {
                        stepOneTitle: "Type of places",
                    },
                    stepTwo: {
                        priceRange: "Price Range",
                        amenitiesStepTwo: "Amenities",
                        bedroomStepTwo: "Bedroom",
                    },
                    stepThree: {
                        availabilityStepThree: "Availability",
                        addressStepThree: "Enter Address",
                        minutesStepThree: "Minutes",
                        modeStepThree: "Mode",
                        stationStepThree: "Station",
                        furnishedStepThree: "Furnished",
                        shortTermStepThree: "Short Term",
                    },
                    stepFour: {
                        petsStepFour: "Pets",
                        flatmateOccupationStepFour: "Flatmate Occupation",
                        flatmateGenderFour: "Flatmate Gender",
                        availableRoomsStepFour: "Available Rooms",
                        currentOccupatStepFour: "Current Occupat",
                        flatmateSmokerStepFour: "Flatmate Smoker",
                    },
                },
                roommateSearchModal: {
                    stepOne: {
                        budgetStepOne: "Budget",
                        cityStepOne: "City",
                        areaStepOne: "Area",
                    },
                    stepTwo: {
                        hobbiesStepTwo: "Hobbies",
                        minimumAgeStepTwo: "Minimum Age",
                        maximumAgeStepTwo: "Maximum Age",
                    },
                    stepThree: {
                        petsStepThree: "Pets",
                        roomSizeStepThree: "Room Size",
                        flatmateOccupationStepThree: "Flatmate Occupation",
                        flatmateGenderThree: "Flatmate Gender",
                        shortTermStepThree: "Short Term",
                        flatmateSmokerStepThree: "Flatmate Smoker",
                    },
                },
            },
            hero: {
                title: {
                    line1: "Find",
                    line2: "Your Perfect",
                    line3: "Property / Flatmate",
                },
                description:
                    "Effortlessly search for compatible roommates and secure your next living arrangement",
                searchInput: {
                    content: "Search by location...",
                    searchInputHero: "Search",
                    contentModal: "Enter the address or a post code",
                    inputTitle: "Address or a post code",
                    noResult: "No results for",
                    found: "Found",
                },
            },
            login: {
                buttons: {
                    googleBtn: "Sing in with Google",
                    facebookBtn: "Sing in with Facebook",
                    emailBtn: "or login with email",
                    loginBtn: "Log in",
                    signUpBtn: "or sign up",
                    forgotPasswordBtn: "Forgot your password?",
                },
                loginForm: {
                    emailInput: "Email Address",
                    passwordInput: "Password",
                    rememberMe: "Remember Me",
                },
            },
            blog: {},
        },
    },
    gr: {
        translation: {
            header: {
                placeAd: "Καταχώρηση αγγελίας",
                blog: "Blog",
                searchHeader: "Αναζήτηση",
                login: "Εγγραφή",
                adModal: {
                    title: "Καταχωρίστε την αγγελία σας",
                    room: "Διαφήμιση για ενοικίαση δωματίων",
                    roomDescription: "Διαφημίστε ένα ή περισσότερα δωμάτια",
                    whole: "Διαφήμιση για ολόκληρη την ιδιοκτησία",
                    wholeDescription: "Διαφημίστε μια αυτόνομη ιδιοκτησία",
                    roomWanted: "Διαφήμιση επιθυμητού δωματίου",
                    roomWantedDescription:
                        "Οι άνθρωποι που προσφέρουν δωμάτια μπορούν να μάθουν περισσότερα για εσάς και να επικοινωνήσουν",
                },
                searchModal: {
                    title: "Βρείτε το νέο σας σπιτι",
                    description:
                        "Επιλέξτε μέσω των πολλαπλών φίλτρων για να βρείτε το ιδανικό σας δωμάτιο ή ιδιοκτησία.",
                    button: {
                        rent: "Κατοικία",
                        flatmate: "Συγκάτοικο",
                        searchBtn: "Αναζήτηση",
                        next: "Επόμενο",
                        previous: "Προηγούμενο",
                    },
                    stepOne: {
                        stepOneTitle: "Τύπος Κατοικίας",
                    },
                    stepTwo: {
                        priceRange: "Εύρος τιμών",
                        amenitiesStepTwo: "Παροχές",
                        bedroomStepTwo: "Δωμάτια",
                    },
                    stepThree: {
                        availabilityStepThree: "Διαθεσιμότητα",
                        addressStepThree: "Διεύθυνση",
                        minutesStepThree: "Λεπτά",
                        modeStepThree: "Μέσο",
                        stationStepThree: "Σταθμός",
                        furnishedStepThree: "Επιπλωμένο",
                        shortTermStepThree: "Βραχυπρόθεσμο",
                    },
                    stepFour: {
                        petsStepFour: "Κατοικίδιο",
                        flatmateOccupationStepFour: "Επάγγελμα συγκάτοικου",
                        flatmateGenderFour: "Φύλο συγκάτοικου",
                        availableRoomsStepFour: "Διαθέσιμα δωμάτια",
                        currentOccupatStepFour: "Τρέχων Κατοίκους",
                        flatmateSmokerStepFour: "Καπνιστής συγκάτοικος",
                    },
                },
                roommateSearchModal: {
                    stepOne: {
                        budgetStepOne: "Budget",
                        cityStepOne: "Πόλη",
                        areaStepOne: "Περιοχή",
                    },
                    stepTwo: {
                        hobbiesStepTwo: "Χόμπι",
                        minimumAgeStepTwo: "Ελάχιστη Ηλικία",
                        maximumAgeStepTwo: "Μέγιστη Ηλικία",
                    },
                    stepThree: {
                        petsStepThree: "Κατοικίδια",
                        roomSizeStepThree: "Μέγεθος Δωματίου",
                        flatmateOccupationStepThree: "Επάγγελμα Συγκάτοικου",
                        flatmateGenderStepThree: "Φύλο Συγκάτοικου",
                        shortTermStepThree: "Βραχυπρόθεσμο",
                        flatmateSmokerStepThree: "Καπνιστής Συγκάτοικος",
                    },
                },
            },
            hero: {
                title: {
                    line1: "Βρες",
                    line2: "Το Ιδανικό",
                    line3: "Ακίνητο / Συγκάτοικο",
                },
                description:
                    "Αναζητήστε εύκολα συμβατούς συγκάτοικους και εξασφαλίστε την επόμενη κατοικία σας",
                searchInput: {
                    content: "Χολαργός, Νίκαια",
                    searchInputHero: "Αναζήτηση",
                    contentModal: "Εισάγετε διεύθυνση ή περιοχή...",
                    inputTitle: "Διεύθυνση ή περιοχή...",
                    noResult: "Δεν υπάρχουν αποτελέσματα για",
                    found: "Βρέθηκαν",
                },
            },
            blog: {},
            login: {
                buttons: {
                    googleBtn: "Εγγραφή με το Google",
                    facebookBtn: "Εγγραφή με το Facebook",
                    emailBtn: "ή συνδεθείτε με email",
                    loginBtn: "Σύνδεση",
                    signUpBtn: "ή εγγραφή",
                    forgotPasswordBtn: "Ξεχάσατε τον κωδικό πρόσβασης;",
                },
                loginForm: {
                    rememberMe: "Να παραμείνω συνδεδεμένος/η",
                },
            },
        },
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "en",
        returnObjects: true,

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;

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
            register: {
                misc: {
                    fixErrors: "Please fix the errors",
                    backBtn: "Back",
                    nextBtn: "Next",
                    loginBtn: "or log in",
                    processingBtn: "Processing...",
                    registerBtn: "Register",
                },
                stepOneForm: {
                    firstNameForm: "First Name",
                    lastNameForm: "Last Name",
                    emailForm: "Email Address",
                    passwordForm: "Password",
                    passwordConfirmationForm: "Confirm Password",
                },
                stepTwoForm: {
                    DOBForm: "Date Of Birth",
                    genderForm: "Gender",
                    lookingForForm: "Looking For",
                    photoProfileForm: "Photo Profile",
                },
            },
            auth: {
                confirmPassword: {
                    confirmBtn: "Confirm",
                    description:
                        "This is a secure area of the application. Please confirm your password before continuing.",
                },
                forgotPassword: {
                    confirmBtn: "Email Password Reset Link",
                    description:
                        "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.",
                },
                resetPassword: {
                    formBtn: "Reset Password",
                    emailForm: "Email",
                    passwordForm: "Password",
                    passwordConfirmationForm: "Confirm Password",
                },
                verifyEmail: {
                    title: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.",
                    statusTitle:
                        "A new verification link has been sent to the email address you provided during registration.",
                    resendBtn: "Resend Verification Email",
                    logOutBtn: "Log Out",
                },
                verifyMobile: {
                    title: "Thanks for signing up! Before getting started, you need to verify your mobile phone number.",
                    description: "'Please enter the OTP sent to your number:",
                    codeForm: "Code",
                    invalidCodeStatus: "This is an invalid code try again.",
                    mobileNewCodeStatus: "New code has been sent.",
                    mobileExpiredStatus: "The code has expired.",
                    mobileErrorWaitStatus: "Reached maximum attempts.",
                    verifyBtn: "Verify",
                },
            },
            shared: {
                miscs: {
                    inputPlaceholder: "Efterpis, Cholargos...",
                    nextBtn: "Next",
                    backBtn: "Back",
                    noResult: "No results for",
                    fixErrors:
                        "Please fix the following errors before procceding.",
                    stepSixErrors: "Please fix the errors",
                    processingBtn: "Processing...",
                    placeAdBtn: "Place your ad",
                },
                forms: {
                    stepTwo: {
                        address1StepTwo: "Addresss Line 1",
                        address2StepTwo: "Addresss Line 2",
                        cityStepTwo: "City",
                        areaStepTwo: "Area",
                        postCodeStepTwo: "P_C",
                        minutesStepTwo: "Minutes",
                        modeStepTwo: "Mode",
                        stationStepTwo: "Station",
                    },
                    stepOne: {
                        availableRoomsStepOne: "I have",
                        sizr2StepOne: "Size",
                        typeStepOne: "Type",
                        currentOccupantsStepOne: "Current Occupants",
                        whatIAmStepOne: "What I am",
                    },
                },
                validation: {
                    stepOne: {
                        address1Required: "Address is required",
                        address1Max: "Address must be at most 30 characters",
                        cityRequired: "City is required",
                        cityMax: "City must be at most 20 characters",
                        areaRequired: "Area is required",
                        areaMax: "Area must be at most 20 characters",
                        postCodeRequired: "Post Code is required",
                        postCodeMax: "Post code must have maximum 7 characters",
                        minutesRequired: "Minutes is required",
                        modeRequired: "Mode is required",
                        stationRequired: "Station is required",
                    },
                    stepTwo: {
                        availableRoomsRequired: "Available Rooms is required",
                        availableRoomsTest:
                            "Available rooms should be smaller than the difference between the Size and Current tenants",
                        sizeRequired: "Size is required",
                        sizeTest:
                            "Size must be greater than the available rooms",
                        typeRequired: "Type is required",
                        currentOccupantsRequired:
                            "Current occupants is required",
                        currentOccupantsTest:
                            "Current occupants must be less than the size of the property",
                        whatIAmRequired: "Who i am is required",
                    },
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
            register: {
                misc: {
                    fixErrors: "Παρακαλώ διορθώστε τα σφάλματα",
                    backBtn: "Πίσω",
                    nextBtn: "Επόμενο",
                    loginBtn: "ή συνδεθείτε",
                    processingBtn: "Επεξεργασία...",
                    registerBtn: "Εγγραφή",
                },
                stepOneForm: {
                    firstNameForm: "Όνομα",
                    lastNameForm: "Επίθετο",
                    emailForm: "Email",
                    passwordForm: "Κωδικός",
                    passwordConfirmationForm: "Επιβεβαίωση Κωδικού",
                },
                stepTwoForm: {
                    DOBForm: "Ημερομηνία Γέννησης",
                    genderForm: "Φύλο",
                    lookingForForm: "Αναζητώ για",
                    photoProfileForm: "Φωτογραφία Προφίλ",
                },
            },
            auth: {
                confirmPassword: {
                    confirmBtn: "Επιβεβαίωση",
                    description:
                        "Αυτή είναι μια ασφαλής περιοχή της εφαρμογής. Παρακαλούμε επιβεβαιώστε τον κωδικό πρόσβασής σας πριν συνεχίσετε.",
                },
                forgotPassword: {
                    confirmBtn: "Αποστολή link Επαναφοράς Κωδικού",
                    description:
                        "Ξεχάσατε τον κωδικό πρόσβασής σας; Κανένα πρόβλημα. Απλώς ενημερώστε μας τη διεύθυνση email σας και θα σας στείλουμε έναν σύνδεσμο επαναφοράς κωδικού που θα σας επιτρέψει να επιλέξετε έναν νέο.",
                },
                resetPassword: {
                    formBtn: "Επαναφορά Κωδικού",
                    emailForm: "Email",
                    passwordForm: "Κωδικός Πρόσβασης",
                    passwordConfirmationForm: "Επιβεβαίωση Κωδικού Πρόσβασης",
                },
                verifyEmail: {
                    title: "Ευχαριστούμε για την εγγραφή! Πριν ξεκινήσετε, μπορείτε να επιβεβαιώσετε τη διεύθυνση email σας κάνοντας κλικ στον σύνδεσμο που μόλις σας στείλαμε; Αν δεν λάβατε το email, θα χαρούμε να σας στείλουμε ένα άλλο.",
                    statusTitle:
                        "Ένας νέος σύνδεσμος επαλήθευσης στάλθηκε στη διεύθυνση email που παρέχατε κατά την εγγραφή.",
                    resendBtn: "Αποστολή Νέου Email Επαλήθευσης",
                    logOutBtn: "Αποσύνδεση",
                },
                verifyMobile: {
                    title: "Ευχαριστούμε που εγγραφήκατε! Πριν ξεκινήσετε, πρέπει να επαληθεύσετε τον αριθμό του κινητού σας τηλεφώνου.",
                    description:
                        "Παρακαλώ εισάγετε τον κωδικό OTP που στάλθηκε στον αριθμό σας:",
                    codeForm: "Κωδικός",
                    invalidCodeStatus:
                        "Αυτός είναι ένας μη έγκυρος κωδικός, προσπαθήστε ξανά.",
                    mobileNewCodeStatus: "Έχει σταλεί ένας νέος κωδικός.",
                    mobileExpiredStatus: "Ο κωδικός έχει λήξει.",
                    mobileErrorWaitdStatus:
                        "Έχουν εξαντληθεί οι μέγιστες προσπάθειες.",
                    verifyBtn: "Επαλήθευση",
                },
            },
            shared: {
                miscs: {
                    inputPlaceholder: "Ευτέρπης, Χολαργός...",
                    nextBtn: "Επόμενο",
                    backBtn: "Πίσω",
                    noResult: "Δεν υπάρχουν αποτελέσματα για",
                    fixErrors:
                        "Παρακαλώ διορθώστε τα παρακάτω σφάλματα πριν συνεχίσετε.",
                    stepSixErrors: "Παρακαλώ διορθώστε τα σφάλματα",
                    processingBtn: "Επεξεργασία...",
                    placeAdBtn: "Δημοσίευση της αγγελίας σας",
                },
                forms: {
                    stepTwo: {
                        address1StepTwo: "Διεύθυνση 1",
                        address2StepTwo: "Διεύθυνση 2",
                        cityStepTwo: "Πόλη",
                        areaStepTwo: "Περιοχή",
                        postCodeStepTwo: "ΤΚ",
                        minutesStepTwo: "Λεπτά",
                        modeStepTwo: "Mέσω μεταφοράς",
                        stationStepTwo: "Σταθμός",
                    },
                    stepOne: {
                        availableRoomsStepOne: "Διαθέτω",
                        sizeStepOne: "Μέγεθος",
                        typeStepOne: "Τύπος",
                        currentOccupantsStepOne: "Τρέχοντες Κάτοικοι",
                        whatIAmStepOne: "Ποιος/α είμαι",
                    },
                },
                validation: {
                    stepOne: {
                        address1Required: "Η διεύθυνση είναι υποχρεωτική",
                        address1Max:
                            "Η διεύθυνση πρέπει να είναι το πολύ 30 χαρακτήρες",
                        cityRequired: "Η πόλη είναι υποχρεωτική",
                        cityMax: "Η πόλη πρέπει να είναι το πολύ 20 χαρακτήρες",
                        areaRequired: "Η περιοχή είναι υποχρεωτική",
                        areaMax:
                            "Η περιοχή πρέπει να είναι το πολύ 20 χαρακτήρες",
                        postCodeRequired:
                            "Ο ταχυδρομικός κώδικας είναι υποχρεωτικός",
                        postCodeMax:
                            "Ο ταχυδρομικός κώδικας πρέπει να έχει το πολύ 7 χαρακτήρες",
                        minutesRequired: "Τα λεπτά είναι υποχρεωτικά",
                        modeRequired: "To μέσω μεταφοράς είναι υποχρεωτική",
                        stationRequired: "Η στάση είναι υποχρεωτική",
                    },
                    stepTwo: {
                        availableRoomsRequired:
                            "Το πεδίο διαθέσιμα δωμάτια είναι υποχρεωτικό",
                        availableRoomsTest:
                            "Τα διαθέσιμα δωμάτια πρέπει να είναι λιγότερα από τη διαφορά μεταξύ του μεγέθους και των τρεχόντων ενοίκων",
                        sizeRequired: "Το πεδίο μέγεθος είναι υποχρεωτικό",
                        sizeTest:
                            "Το μέγεθος πρέπει να είναι μεγαλύτερο από τα διαθέσιμα δωμάτια",
                        typeRequired: "Το πεδίο τύπος είναι υποχρεωτικό",
                        currentOccupantsRequired:
                            "Το πεδίο των τρεχόντων ενοίκων είναι υποχρεωτικό",
                        currentOccupantsTest:
                            "Ο αριθμός των τρεχόντων ενοίκων πρέπει να είναι μικρότερος από το μέγεθος της ιδιοκτησίας",
                        whatIAmRequired:
                            "Το πεδίο περιγραφής χρήστη είναι υποχρεωτικό",
                    },
                },
            },
            blog: {},
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

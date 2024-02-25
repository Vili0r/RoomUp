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
                stepTwoShared: {
                    availableRoomsRequired: "Available Rooms is required",
                    availableRoomsTest:
                        "Available rooms should be smaller than the difference between the Size and Current tenants",
                    sizeRequired: "Size is required",
                    sizeTest: "Size must be greater than the available rooms",
                    typeRequired: "Type is required",
                    currentOccupantsRequired: "Current occupants is required",
                    currentOccupantsTest:
                        "Current occupants must be less than the size of the property",
                    whatIAmRequired: "Who i am is required",
                },
                stepTwoFlat: {
                    sizeRequired: "Size is required",
                    typeRequired: "Type is required",
                    furnishedRequired: "Furnished is required",
                    costTypeError: "Cost doesn't look like a number",
                    costRequired: "Cost is required",
                    depositTypeError: "Deposit doesn't look like a number",
                    depositRequired: "Deposit is required",
                    whatIAmRequired: "Who i am is required",
                },
                stepThreeShared: {
                    availableFromTypeError: "Available from must be a date",
                    availableFromMin:
                        "Available from date must be in the future",
                    availableFromRequired: "Available from date is required",
                    roomCostTypeError: "Room cost doesn't look like a number",
                    roomCostRequired: "Cost of the room is required",
                    roomDepositTypeError:
                        "Room deposit doesn't look like a number",
                    roomDepositRequired: "Deposit of the room is required",
                    roomSizeRequired: "Size of the room is required",
                    roomFurnishedRequired: "Room furnished is required",
                    minimumStayRequired: "Minimum stay is required",
                    maximumStayTest:
                        "Maximum stay must be greater than minimum stay",
                    maximumStayRequired: "Maximum stay is required",
                    daysAvailableRequired: "Days available is required",
                },
                stepThreeFlat: {
                    selectedAmenitiesMin: "At least one amenity is required",
                    selectedAmenitiesRequired: "Amenities are required",
                    availableFromTypeError: "Available from must be a date",
                    availableFromMin:
                        "Available from date must be in the future",
                    availableFromRequired: "Available from date is required",
                    minimumStayRequired: "Minimum stay is required",
                    maximumStayTest:
                        "Maximum stay must be greater than minimum stay",
                    maximumStayRequired: "Maximum stay is required",
                    daysAvailableRequired: "Days available is required",
                },
                stepFour: {
                    firstNameMax:
                        "First Name must not be greater than 20 characters",
                    firstNameRequired: "First name is required",
                    lastNameMax:
                        "Last Name must not be greater than 20 characters",
                    lastNameRequired: "Last name is required",
                    telephoneMin: "Phone number must be at least 8 digits",
                    telephoneMax: "Phone number cannot be more than 15 digits",
                    telephoneMaxMatches: "Phone number can only contain digits",
                    telephoneRequired: "Telephone number is required",
                },
                currentFlatmate: {
                    currentFlatmateAgeTypeError:
                        "That doesn't look like an age",
                    currentFlatmateAgeMin:
                        "You should be more than 18 years old",
                    currentFlatmateAgeRequired: "Age is required",
                    currentFlatmateSmokerRequired: "Smoker field is required",
                    currentFlatmatePetsRequuired: "Pet field is required",
                    currentFlatmateOccupationRequired:
                        "Occupation field is required",
                    currentFlatmateGenderRequired: "Gender field is required",
                },
                newFlatmate: {
                    newFlatmateMinAgeTypeError: "That doesn't look like an age",
                    newFlatmateMinAgeMin:
                        "Your new flatmate should be more than 18 years old",
                    newFlatmateMinAgeRequired:
                        "New flatmate min age is required",
                    newFlatmatemaxAgeTypeError: "That doesn't look like an age",
                    newFlatmatemaxAgeMax:
                        "Your new flatmate should be more than 18 years old",
                    newFlatmatemaxAgeRequired:
                        "New flatmate max age is required",
                    newFlatmatemaxAgeTest:
                        "Max age must be greater than the min age",
                    newFlatmateSmokerRequired: "Smoker field is required",
                    newFlatmatePetsRequired: "Pet field is required",
                    newFlatmateOccupationRequired:
                        "Occupation field is required",
                    newFlatmateGenderRequired: "Gender field is required",
                },
                stepSix: {
                    amenitiesMin: "At least one amenity is required",
                    amenitiesRequired: "Amenities are required",
                    titleMin: "Title must be at least 10 characters long",
                    titleMax: "Title must be at least 50 characters long",
                    titleRequired: "Title is required",
                    descriptionMin:
                        "Description must be at least 50 characters long",
                    descriptionMax:
                        "Description must be at least 500 characters long",
                    descriptionRequired: "Description is required",
                    photosMax: "You can upload up to 9 images",
                    photosFileFormat: "Unsupported file format",
                    photosFileSize: "File size is too large",
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
                    stepThree: {
                        availableFromStepThree: "Available From",
                        roomCostStepThree: "Room cost Per Month",
                        roomDepositStepThree: "Room Deposit",
                        roomSizeStepThree: "Room Size",
                        roomStepThree: "Room",
                        roomFurnishedStepThree: "Room Furnished",
                        referencesStepThree: "References?",
                        minimumStayStepThree: "Minimum Stay",
                        maximumStayStepThree: "Maximum Stay",
                        daysAvailableStepThree: "Days Available",
                        shortTermStepThree: "Short Term",
                    },
                    stepFour: {
                        firstNameStepFour: "First Name",
                        lastNameStepFour: "Last Name",
                        displayLastNameStepFour: "Display Last Name",
                        telephoneStepFour: "Telephone",
                        displayTelephoneStepFour: "Display Telephone",
                    },
                    currentFlatmate: {
                        spanStepFive: "Current flatmate information",
                        currentFlatmateAgeStepFive: "Current flatmate age",
                        currentFlatmateSmokerStepFive: "Smoker",
                        currentFlatmatePetsStepFive: "Pets",
                        currentFlatmateOccupationStepFive: "Occupation",
                        currentFlatmateGenderStepFive: "Gender",
                    },
                    newFlatmate: {
                        spanStepFive: "Preferences for new tenant",
                        newFlatmateMinAgeStepFive: "Min age",
                        newFlatmateMaxAgeStepFive: "Max Age",
                        newFlatmateSmokerStepFive: "Smoker",
                        newFlatmatePetsStepFive: "Pets",
                        newFlatmateOccupationStepFive: "Occupation",
                        newFlatmateGenderStepFive: "Gender",
                        newFlatmateCouplesStepFive: "Couples?",
                        newFlatmateReferencesStepFive: "References?",
                    },
                    stepSix: {
                        amenitiesStepSix: "Amenities",
                        titleStepSix: "Title",
                        descriptionStepSix: "Description",
                    },
                },
                edit: {
                    miscs: {
                        fixErrors: "Please fix the errors",
                        propertyDetails: "Property details?",
                        propertyAddressDetails: "Property Address details?",
                        noResults: "No results for",
                        inputPlaceholder: "Efterpis, Cholargos...",
                        propertyAmenitiesDetails: "Property Amenities details?",
                        roomDisclosureThree: "Room",
                        amenitiesDisclosureThree: "Amenities",
                        advertiserDetails: "Advertiser details?",
                        flatmatesDisclosure: "Flatmates?",
                        confirmation: "Confirmation?",
                        filesUploaded:
                            "Files uploaded when creating advertisment",
                        processingBtn: "Processing...",
                        updateBtn: "Update you ad",
                    },
                },
            },
            room: {
                edit: {
                    titleRoomEdit: "Title",
                    descriptionRoomEdit: "Description",
                    availableFromRoomEdit: "Available From",
                    roomCostRoomEdit: "Room cost Per Month",
                    roomDepositRoomEdit: "Room Deposit",
                    roomSizeRoomEdit: "Room Size",
                    roomRoomEdit: "Room",
                    roomFurnishedRoomEdit: "Room Furnished",
                    referencesRoomEdit: "References?",
                    minimumStayRoomEdit: "Minimum Stay",
                    maximumStayRoomEdit: "Maximum Stay",
                    daysAvailableRoomEdit: "Days Available",
                    shortTermRoomEdit: "Short Term",
                    filesUploaded: "Files uploaded when creating advertisment",
                    processingBtn: "Processing...",
                    updateBtn: "Update your room",
                },
            },
            flat: {
                miscs: {
                    inputPlaceholder: "Efterpis, Cholargos...",
                    nextBtn: "Next",
                    backBtn: "Back",
                    noResult: "No results for",
                    stepSixErrors: "Please fix the errors",
                    processingBtn: "Processing...",
                    placeAdBtn: "Place your ad",
                },
                forms: {
                    stepOneFlat: {
                        sizeStepOneFlat: "Size",
                        typeStepOneFlat: "Type",
                        whatIAmStepOneFlat: "What I am",
                        costStepOneFlat: "Cost Per Month",
                        depositStepOneFlat: "Deposit",
                        furnishedStepOneFlat: "Furnished",
                    },
                    stepThreeFlat: {
                        amenitiesStepThree: "Amenities",
                        availableFromStepThree: "Available From",
                        minimumStayStepThree: "Minimum Stay",
                        maximumStayStepThree: "Maximum Stay",
                        daysAvailableStepThree: "Days Available",
                        shortTermStepThree: "Short Term",
                    },
                    stepSix: {
                        titleStepSix: "Title",
                        descriptionStepSix: "Description",
                    },
                },
                edit: {
                    miscs: {
                        fixErrors: "Please fix the errors",
                        propertyDetails: "Property details?",
                        propertyAddressDetails: "Property Address details?",
                        noResults: "No results for",
                        inputPlaceholder: "Efterpis, Cholargos...",
                        propertyAmenitiesDetails: "Property Amenities details?",
                        roomDisclosureThree: "Room",
                        amenitiesDisclosureThree: "Amenities",
                        advertiserDetails: "Advertiser details?",
                        flatmatesDisclosure: "Flatmates?",
                        confirmation: "Confirmation?",
                        filesUploaded:
                            "Files uploaded when creating advertisment",
                        processingBtn: "Processing...",
                        updateBtn: "Update you ad",
                    },
                },
            },
            show: {
                availabilityModal: {
                    titleAvailability: "Manage availablity of your property",
                    liveAtForm: "Live at",
                    availableForm: "Available",
                    cancelAvailabilityBtn: "Cancel",
                    updateBtn: "Update Availability",
                },
                virtualTourModal: {
                    titleVirtualTour: "Book a virtual tour for your property",
                    fullNameForm: "Full Name",
                    emailForm: "Email Address",
                    phoneNumberForm: "Phone Number",
                    detailsForm: "Details",
                    cancelVirtualTourBtn: "Cancel",
                    bookBtn: "Book Virtual Tour",
                },
                deleteConfirmationModal: {
                    titleConfirmation:
                        "Are you sure you want to delete this property?",
                    cancelConfirmationBtn: "Cancel",
                    deleteBtn: "Delete Property",
                },
                miscs: {
                    halted: "Halted",
                    manageRooms: "Manage Rooms",
                    manageRoomsTitle:
                        "Select each room to edit and upload individual room photos",
                },
                buttons: {
                    availableRoomsBtn: "Availbale rooms:",
                    bedroomsBtn: "Bedrooms:",
                    deletePropertyBtn: "Delete Property",
                    manageAvailabilityBtn: "Manage availability",
                    virtualTourBtn: "Virtual Tour",
                },
                roomCard: {
                    availabilityModal: {
                        title: "Manage availablity of your property",
                        liveAtForm: "Live at",
                        availableForm: "Available",
                        cancelAvailabilityBtn: "Cancel",
                        updateBtn: "Update Availability",
                    },
                    miscs: {
                        halted: "Halted",
                        liveAtSpan: "Live at",
                        availableFromMisc: "Available from",
                        month: "month",
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
            validation: {
                stepOne: {
                    address1Required: "Η διεύθυνση είναι υποχρεωτική",
                    address1Max:
                        "Η διεύθυνση πρέπει να είναι το πολύ 30 χαρακτήρες",
                    cityRequired: "Η πόλη είναι υποχρεωτική",
                    cityMax: "Η πόλη πρέπει να είναι το πολύ 20 χαρακτήρες",
                    areaRequired: "Η περιοχή είναι υποχρεωτική",
                    areaMax: "Η περιοχή πρέπει να είναι το πολύ 20 χαρακτήρες",
                    postCodeRequired:
                        "Ο ταχυδρομικός κώδικας είναι υποχρεωτικός",
                    postCodeMax:
                        "Ο ταχυδρομικός κώδικας πρέπει να έχει το πολύ 7 χαρακτήρες",
                    minutesRequired: "Τα λεπτά είναι υποχρεωτικά",
                    modeRequired: "To μέσω μεταφοράς είναι υποχρεωτική",
                    stationRequired: "Η στάση είναι υποχρεωτική",
                },
                stepTwoShared: {
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
                stepTwoFlat: {
                    sizeRequired: "Το μέγεθος είναι υποχρεωτικό",
                    typeRequired: "Ο τύπος είναι υποχρεωτικός",
                    furnishedRequired: "Επιπλωμένο είναι υποχρεωτικό",
                    costTypeError: "Το κόστος δεν φαίνεται σαν αριθμός",
                    costRequired: "Το κόστος είναι υποχρεωτικό",
                    depositTypeError: "Η κατάθεση δεν φαίνεται σαν αριθμός",
                    depositRequired: "Η κατάθεση είναι υποχρεωτική",
                    whatIAmRequired: "Το ποιος είμαι είναι υποχρεωτικό",
                },
                stepThreeShared: {
                    availableFromTypeError:
                        "Το πεδίο διαθεσιμό απο πρέπει να είναι μια ημερομηνία",
                    availableFromMin:
                        "Η ημερομηνία διαθεσιμότητας πρέπει να είναι στο μέλλον",
                    availableFromRequired:
                        "Η ημερομηνία διαθεσιμότητας είναι υποχρεωτική",
                    roomCostTypeError:
                        "Το κόστος του δωματίου δεν φαίνεται να είναι ένας αριθμός",
                    roomCostRequired:
                        "Το κόστος του δωματίου είναι υποχρεωτικό",
                    roomDepositTypeError:
                        "Η προκαταβολή του δωματίου δεν φαίνεται να είναι ένας αριθμός",
                    roomDepositRequired:
                        "Η προκαταβολή του δωματίου είναι υποχρεωτική",
                    roomSizeRequired:
                        "Το μέγεθος του δωματίου είναι υποχρεωτικό",
                    roomFurnishedRequired:
                        "Η επίπλωση του δωματίου είναι υποχρεωτική",
                    minimumStayRequired:
                        "Το ελάχιστο διάστημα διαμονής είναι υποχρεωτικό",
                    maximumStayTest:
                        "Το μέγιστο διάστημα διαμονής πρέπει να είναι μεγαλύτερο από το ελάχιστο διάστημα",
                    maximumStayRequired:
                        "Το μέγιστο διάστημα διαμονής είναι υποχρεωτικό",
                    daysAvailableRequired:
                        "Οι ημέρες διαθεσιμότητας είναι υποχρεωτικές",
                },
                stepThreeFlat: {
                    selectedParoxesMin: "Απαιτείται τουλάχιστον μία παροχή",
                    selectedParoxesRequired: "Οι παροχές είναι υποχρεωτικές",
                    availableFromTypeError:
                        "Η διαθεσιμότητα από πρέπει να είναι ημερομηνία",
                    availableFromMin:
                        "Η διαθεσιμότητα από πρέπει να είναι στο μέλλον",
                    availableFromRequired:
                        "Απαιτείται ημερομηνία διαθεσιμότητας",
                    minimumStayRequired: "Απαιτείται ελάχιστη διαμονή",
                    maximumStayTest:
                        "Η μέγιστη διαμονή πρέπει να είναι μεγαλύτερη από την ελάχιστη διαμονή",
                    maximumStayRequired: "Απαιτείται μέγιστη διαμονή",
                    daysAvailableRequired:
                        "Οι διαθέσιμες ημέρες είναι υποχρεωτικές",
                },
                stepFour: {
                    firstNameMax:
                        "Το όνομα δεν πρέπει να ξεπερνά τους 20 χαρακτήρες",
                    firstNameRequired: "Το όνομα απαιτείται",
                    lastNameMax:
                        "Το επώνυμο δεν πρέπει να ξεπερνά τους 20 χαρακτήρες",
                    lastNameRequired: "Το επώνυμο απαιτείται",
                    telephoneMin:
                        "Ο αριθμός τηλεφώνου πρέπει να περιέχει τουλάχιστον 8 ψηφία",
                    telephoneMax:
                        "Ο αριθμός τηλεφώνου δεν μπορεί να ξεπερνά τα 15 ψηφία",
                    telephoneMaxMatches:
                        "Ο αριθμός τηλεφώνου πρέπει να περιέχει μόνο ψηφία",
                    telephoneRequired: "Απαιτείται ο αριθμός τηλεφώνου",
                },
                currentFlatmate: {
                    currentFlatmateAgeTypeError: "Αυτό δεν μοιάζει με ηλικία",
                    currentFlatmateAgeMin: "Πρέπει να είστε πάνω από 18 ετών",
                    currentFlatmateAgeRequired: "Η ηλικία είναι υποχρεωτική",
                    currentFlatmateSmokerRequired:
                        "Το πεδίο καπνιστής είναι υποχρεωτικό",
                    currentFlatmatePetsRequuired:
                        "Το πεδίο κατοικίδια είναι υποχρεωτικό",
                    currentFlatmateOccupationRequired:
                        "Το πεδίο επάγγελμα είναι υποχρεωτικό",
                    currentFlatmateGenderRequired:
                        "Το πεδίο φύλο είναι υποχρεωτικό",
                },
                newFlatmate: {
                    newFlatmateMinAgeTypeError: "Αυτό δεν μοιάζει με ηλικία",
                    newFlatmateMinAgeMin:
                        "Ο νέος σας συγκάτοικος πρέπει να είναι πάνω από 18 ετών",
                    newFlatmateMinAgeRequired:
                        "Η ελάχιστη ηλικία του νέου συγκατοίκου απαιτείται",
                    newFlatmatemaxAgeTypeError: "Αυτό δεν μοιάζει με ηλικία",
                    newFlatmatemaxAgeMax:
                        "Ο νέος σας συγκάτοικος πρέπει να είναι πάνω από 18 ετών",
                    newFlatmatemaxAgeRequired:
                        "Η μέγιστη ηλικία του νέου συγκατοίκου απαιτείται",
                    newFlatmatemaxAgeTest:
                        "Η μέγιστη ηλικία πρέπει να είναι μεγαλύτερη από την ελάχιστη ηλικία",
                    newFlatmateSmokerRequired:
                        "Το πεδίο καπνιστής είναι υποχρεωτικό",
                    newFlatmatePetsRequired:
                        "Το πεδίο κατοικίδια είναι υποχρεωτικό",
                    newFlatmateOccupationRequired:
                        "Το πεδίο επάγγελμα είναι υποχρεωτικό",
                    newFlatmateGenderRequired:
                        "Το πεδίο φύλο είναι υποχρεωτικό",
                },
                stepSix: {
                    amenitiesMin: "Απαιτείται τουλάχιστον μία επιλογή",
                    amenitiesRequired: "Απαιτείται τουλάχιστον μία επιλογή",
                    titleMin:
                        "Ο τίτλος πρέπει να περιλαμβάνει τουλάχιστον 10 χαρακτήρες",
                    titleMax:
                        "Ο τίτλος δεν πρέπει να υπερβαίνει τους 50 χαρακτήρες",
                    titleRequired: "Ο τίτλος απαιτείται",
                    descriptionMin:
                        "Η περιγραφή πρέπει να περιλαμβάνει τουλάχιστον 50 χαρακτήρες",
                    descriptionMax:
                        "Η περιγραφή δεν πρέπει να υπερβαίνει τους 500 χαρακτήρες",
                    descriptionRequired: "Η περιγραφή απαιτείται",
                    photosMax: "Μπορείτε να ανεβάσετε έως και 9 εικόνες",
                    photosFileFormat: "Μη υποστηριζόμενη μορφή αρχείου",
                    photosFileSize: "Το μέγεθος του αρχείου είναι πολύ μεγάλο",
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
                    stepThree: {
                        availableFromStepThree: "Διαθέσιμο Από",
                        roomCostStepThree: "Κόστος Δωματίου",
                        roomDepositStepThree: "Προκαταβολή Δωματίου",
                        roomSizeStepThree: "Μέγεθος Δωματίου",
                        roomFurnishedStepThree: "Επιπλωμένο Δωμάτιο",
                        roomStepThree: "Δωμάτιο",
                        referencesStepThree: "Παραπομπή",
                        minimumStayStepThree: "Διάρκεια Διαμονής Από",
                        maximumStayStepThree: "Διάρκεια Διαμονής Έως",
                        daysAvailableStepThree: "Διαθέσιμες Ημέρες",
                        shortTermStepThree: "Βραχυπρόθεσμο",
                    },
                    stepFour: {
                        firstNameStepFour: "Όνομα",
                        lastNameStepFour: "Επώνυμο",
                        displayLastNameStepFour: "Εμφάνιση Επωνύμου",
                        telephoneStepFour: "Τηλέφωνο",
                        displayTelephoneStepFour: "Εμφάνιση Τηλεφώνου",
                    },
                    currentFlatmate: {
                        spanStepFive: "Πληροφορίες τωρινός συγκατοίκου",
                        currentFlatmateAgeStepFive: "Ηλικία",
                        currentFlatmateSmokerStepFive: "Καπνιστής",
                        currentFlatmatePetsStepFive: "Κατοικίδια",
                        currentFlatmateOccupationStepFive: "Επάγγελμα",
                        currentFlatmateGenderStepFive: "Φύλο",
                    },
                    newFlatmate: {
                        spanStepFive: "Προτιμήσεις για νέο ενοικιαστή",
                        newFlatmateMinAgeStepFive: "Ελάχιστη ηλικία",
                        newFlatmateMaxAgeStepFive: "Μέγιστη ηλικία",
                        newFlatmateSmokerStepFive: "Καπνιστής",
                        newFlatmatePetsStepFive: "Κατοικίδια",
                        newFlatmateOccupationStepFive: "Επάγγελμα",
                        newFlatmateGenderStepFive: "Φύλο",
                        newFlatmateCouplesStepFive: "Ζευγάρια",
                        newFlatmateReferencesStepFive: "Αναφορές;",
                    },
                    stepSix: {
                        amenitiesStepSix: "Παροχές",
                        titleStepSix: "Τίτλος",
                        descriptionStepSix: "Περιγραφή",
                        imagesStepSix: "Σύρετε & Αφήστε τα αρχεία σας ή",
                    },
                },
                edit: {
                    miscs: {
                        fixErrors: "Παρακαλώ διορθώστε τα σφάλματα",
                        propertyDetails: "Λεπτομέρειες ιδιοκτησίας;",
                        propertyAddressDetails:
                            "Λεπτομέρειες διεύθυνσης ιδιοκτησίας;",
                        noResults: "Χωρίς αποτελέσματα για",
                        inputPlaceholder: "Ευτέρπης, Χολαργός...",
                        propertyAmenitiesDetails:
                            "Λεπτομέρειες ανέσεων της ιδιοκτησίας;",
                        amenitiesDisclosureThree: "Παροχές",
                        advertiserDetails: "Λεπτομέρειες διαφημιζόμενου;",
                        flatmatesDisclosure: "Συγκάτοικοι;",
                        confirmation: "Επιβεβαίωση;",
                        filesUploaded:
                            "Αρχεία που ανέβηκαν κατά τη δημιουργία αγγελίας",
                        processingBtn: "Επεξεργασία...",
                        updateBtn: "Ενημέρωση της αγγελίας σας",
                    },
                },
            },
            room: {
                edit: {
                    titleRoomEdit: "Τίτλος",
                    descriptionRoomEdit: "Περιγραφή",
                    availableFromRoomEdit: "Διαθέσιμο Από",
                    roomCostRoomEdit: "Κόστος Δωματίου Ανά Μήνα",
                    roomDepositRoomEdit: "Κατάθεση Δωματίου",
                    roomSizeRoomEdit: "Μέγεθος Δωματίου",
                    roomFurnishedRoomEdit: "Επιπλωμένο Δωμάτιο",
                    referencesRoomEdit: "Αναφορές;",
                    minimumStayRoomEdit: "Ελάχιστη Διαμονή",
                    maximumStayRoomEdit: "Μέγιστη Διαμονή",
                    daysAvailableRoomEdit: "Διαθέσιμες Ημέρες",
                    shortTermRoomEdit: "Σύντομη Διάρκεια",
                    filesUploaded:
                        "Αρχεία που ανέβηκαν κατά τη δημιουργία της αγγελίας",
                    processingBtn: "Επεξεργασία...",
                    updateBtn: "Ενημέρωση του δωματίου σας",
                },
            },
            flat: {
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
                    stepOneFlat: {
                        sizeStepOneFlat: "Μέγεθος",
                        typeStepOneFlat: "Τύπος",
                        whatIAmStepOneFlat: "Ποιος είμαι",
                        costStepOneFlat: "Κόστος Ανά Μήνα",
                        depositStepOneFlat: "Κατάθεση",
                        furnishedStepOneFlat: "Επιπλωμένο",
                    },
                    stepThreeFlat: {
                        amenitiesStepThree: "Παροχές",
                        availableFromStepThree: "Διαθέσιμο Από",
                        minimumStayStepThree: "Ελάχιστη Διαμονή",
                        maximumStayStepThree: "Μέγιστη Διαμονή",
                        daysAvailableStepThree: "Διαθέσιμες Ημέρες",
                        shortTermStepThree: "Βραχυπρόθεσμο",
                    },
                    stepSix: {
                        titleStepSix: "Τίτλος",
                        descriptionStepSix: "Περιγραφή",
                    },
                },
                edit: {
                    miscs: {
                        fixErrors: "Παρακαλώ διορθώστε τα σφάλματα",
                        propertyDetails: "Λεπτομέρειες ιδιοκτησίας;",
                        propertyAddressDetails:
                            "Λεπτομέρειες διεύθυνσης ιδιοκτησίας;",
                        noResults: "Χωρίς αποτελέσματα για",
                        inputPlaceholder: "Ευτέρπης, Χολαργός...",
                        propertyAmenitiesDetails:
                            "Λεπτομέρειες ανέσεων της ιδιοκτησίας;",
                        amenitiesDisclosureThree: "Παροχές",
                        advertiserDetails: "Λεπτομέρειες διαφημιζόμενου;",
                        flatmatesDisclosure: "Συγκάτοικοι;",
                        confirmation: "Επιβεβαίωση;",
                        filesUploaded:
                            "Αρχεία που ανέβηκαν κατά τη δημιουργία αγγελίας",
                        processingBtn: "Επεξεργασία...",
                        updateBtn: "Ενημέρωση της αγγελίας σας",
                    },
                },
            },
            show: {
                availabilityModal: {
                    titleAvailability:
                        "Διαχειριστείτε τη διαθεσιμότητα την αγγελία σας",
                    liveAtForm: "Δημοσίευση στις",
                    availableForm: "Διαθέσιμο",
                    cancelAvailabilityBtn: "Άκυρο",
                    updateBtn: "Ενημέρωση Διαθεσιμότητας",
                },
                virtualTourModal: {
                    titleVirtualTour:
                        "Κάντε κράτηση για εικονική περιήγηση για την ιδιοκτησία σας",
                    fullNameForm: "Ονοματεπώνυμο",
                    emailForm: "Διεύθυνση Email",
                    phoneNumberForm: "Αριθμός Τηλεφώνου",
                    detailsForm: "Λεπτομέρειες",
                    cancelVirtualTourBtn: "Άκυρο",
                    bookBtn: "Κράτηση Εικονικής Περιήγησης",
                },
                deleteConfirmationModal: {
                    titleConfirmation:
                        "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτήν την αγγελία;",
                    cancelConfirmationBtn: "Άκυρο",
                    deleteBtn: "Διαγραφή αγγελίας",
                },
                miscs: {
                    halted: "Αδημοσίευτο",
                    liveAtSpan: "Δημοσιεύτηκε στις",
                    manageRooms: "Διαχείριση Δωματίων",
                    manageRoomsTitle:
                        "Επιλέξτε κάθε δωμάτιο για επεξεργασία και μεταφόρτωση μεμονωμένων φωτογραφιών δωματίου",
                },
                buttons: {
                    availableRoomsBtn: "Διαθέσιμα δωμάτια:",
                    bedroomsBtn: "Δωμάτια:",
                    deletePropertyBtn: "Διαγραφή αγγελίας",
                    manageAvailabilityBtn: "Διαχείριση διαθεσιμότητας",
                    virtualTourBtn: "Εικονική Περιήγηση",
                },
                roomCard: {
                    availabilityModal: {
                        titleAvailability:
                            "Διαχειριστείτε τη διαθεσιμότητα την αγγελία σας",
                        liveAtForm: "Δημοσίευση στις",
                        availableForm: "Διαθέσιμο",
                        cancelAvailabilityBtn: "Άκυρο",
                        updateBtn: "Ενημέρωση Διαθεσιμότητας",
                    },
                    miscs: {
                        halted: "Αδημοσίευτο",
                        liveAtSpan: "Δημοσιεύτηκε στις",
                        availableFromMisc: "Διαθέσιμο από",
                        month: "μήνα",
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

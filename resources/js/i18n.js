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
                    emailTaken: "The email has already been taken.",
                    passwordBackend:
                        "The given password has appeared in a data leak. Please choose a different password.",
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
                register: {
                    stepOne: {
                        firstNameRequired: "First Name is required",
                        firstNameMax:
                            "First Name must not exceed 255 characters",
                        lastNameRequired: "Last Name is required",
                        lastNameMax: "Last Name must not exceed 255 characters",
                        emailType: "Please enter a valid email",
                        emailRequired: "Email is required",
                        passwordMin:
                            "Password must be at least 8 characters long",
                        passwordMatches:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                        passwordMax:
                            "Password must not be more than 20 characters long",
                        passwordRequired: "Password is required",
                        passwordConfirmationRequired:
                            "Password Confirmation is required",
                        passwordConfirmationOneOf: "Password does not match",
                    },
                    stepTwo: {
                        DOBRequired: "DOB is Required",
                        DOBAboveEighteen: "You must be older than 18 years old",
                        genderRequired: "Gender is required",
                        lookingForRequired: "Looking for is required",
                    },
                },
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
                stepOneFlatmate: {
                    cityMax: "City must be at most 20 characters",
                    cityRequired: "City is required",
                    areaMax: "Area must be at most 20 characters",
                    areaRequired: "Area is required",
                    roomSizeRequired: "Size is required",
                    availableFromTypeError: "Available from must be a date",
                    availableFromMin:
                        "Available from date must be in the future",
                    availableFromRequired: "Available from date is required",
                    searchingForRequired: "Searching for is required",
                    minimumStayRequired: "Minimum stay is required",
                    maximumStayTest:
                        "Maximum stay must be greater than minimum stay",
                    maximumStayRequired: "Maximum stay is required",
                    daysAvailableRequired: "Days available is required",
                    budgetTypeError: "That doesn't look like a number",
                    budgetRequired: "Budget is required",
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
                stepTwoFlatmate: {
                    myAgeTypeError: "That doesn't look like an age",
                    myAgeMin: "You should be more than 18 years old",
                    myAgeRequired: "Age is required",
                    mySmokerRequired: "Smoker field is required",
                    myPetsRequired: "Pet field is required",
                    myOccupationRequired: "Occupation field is required",
                    myGenderRequired: "Gender field is required",
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
                    photosRequired: "Images are required",
                },
                reportedListing: {
                    reasonRequired: "Reason for reporting is required.",
                },
                verifyMobile: {
                    codeNumber: "Code number must be a number.",
                    codeRequired: "Code is required",
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
                        sizeStepOne: "Size",
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
                    alertMessage: "Error creating Stripe session",
                },
                buttons: {
                    availableRoomsBtn: "Availbale rooms:",
                    bedroomsBtn: "Bedrooms:",
                    budgetBtn: "Budget:",
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
            myListings: {
                misc: {
                    allProperties: "All properties",
                    searchProperties:
                        "Search through your properties and manage them or update them.",
                    inputPlaceholder: "Search...",
                    addProperty: "Add property",
                },
                table: {
                    type: "Type",
                    title: "Title",
                    id: "Id",
                    bedrooms: "Bedrooms",
                    createdAt: "Created at",
                    status: "Status",
                    action: "Action",
                    halted: "Halted",
                    liveAt: "Live at",
                    manage: "Manage",
                },
            },
            roommate: {
                misc: {
                    nextBtn: "Next",
                    backBtn: "Back",
                    yourInformation: "Your information",
                    fixErrors:
                        "Please fix the following errors before procceding.",
                    processingBtn: "Processing...",
                    placeAdBtn: "Place your ad",
                },
                forms: {
                    stepOne: {
                        budgetStepOne: "Budget",
                        availableFromStepOne: "Available to move from",
                        searchingForStepOne: "Searching For",
                        minimumStayStepOne: "Minimum Stay",
                        maximumStayStepOne: "Maximum Stay",
                        roomSizeStepOne: "Room Size",
                        daysAvailableStepOne: "Days available",
                        shortTermStepOne: "Short term",
                        cityStepOne: "City",
                        areaStepOne: "Area",
                    },
                    stepTwo: {
                        ageStepTwo: "Age",
                        smokerStepTwo: "Smoker",
                        petsStepTwo: "Pets",
                        occupationStepTwo: "Occupation",
                        genderStepTwo: "Gender",
                    },
                    stepSix: {
                        amenitiesStepSix: "Amenities",
                        hobbiesStepSix: "Hobbies",
                        titleStepSix: "Title",
                        descriptionStepSix: "Description",
                    },
                },
                edit: {
                    fixErrors: "Please fix the errors",
                    propertyDetails: "Property details?",
                    flatmatesDisclosure: "Flatmates?",
                    yourInformation: "Your information",
                    advertiserDetails: "Advertiser details?",
                    confirmation: "Confirmation?",
                    filesUploaded: "Files uploaded when creating advertisment",
                    processingBtn: "Processing...",
                    updateBtn: "Update you ad",
                },
            },
            pagination: {
                page: "Page",
                previous: "Previous",
                next: "Next",
            },
            authenticatedLayout: {
                conversationSupport: {
                    support: "Support",
                    you: "You",
                    customerSupport: "Customer Support",
                    enquiry: "Please enter your enquiry.",
                    loadingSupport: "Loading...",
                    sendBtn: "Send",
                },
                navigation: {
                    hi: "Hi",
                    savedProperties: "Saved Properties",
                    recentlyViewed: "Recently Viewed",
                    messages: "Messages",
                    inbox: "Inbox",
                    profile: "Profile",
                    logOut: "Log Out",
                },
                banner: {
                    welcome: "Welcome back to your account!",
                    searchBnr: "Keep searching for your home.",
                },
                navigationHeader: {
                    dashboard: "Dashboard",
                    admin: "Admin",
                    myProperties: "My Properties",
                    roommateLisiting: "Roommate",
                    verify: "Verify",
                    account: "Account",
                },
            },
            dashboard: { loggedIn: "You're logged in!" },
            propertyDetails: {
                misc: {
                    inA: "in a",
                    month: "month",
                    photosof: "Photos of",
                    closePhotos: "Close Photos",
                    showMore: "Show More Photos",
                },
                details: {
                    overview: "Overview",
                    rooms: "rooms",
                    typeDetails: "Type",
                    availableFrom: "Available from",
                    where: "Where will you live",
                    availability: "Availability",
                    transport: "Transport",
                    moreInformation: "More Information",
                    reportListing: "Report Listing",
                    neighborhood: "Neighborhood",
                    amenitiesDetails: "Amenities",
                    advertisedBy: "Advertised By",
                    tel: "Tel",
                    message: "Message",
                },
                roommate: {
                    month: "month",
                    overview: "Overview",
                    lookingFor: "Looking for",
                    bedroom: "bedroom",
                    searchingForRoommate: "Searching for",
                    availableFromRoommate: "Available from",
                    knowMeBetter: "Know me better",
                    moreInformation: "More Information",
                    reportListing: "Report Listing",
                    ageRoommate: "Age",
                    smokerRoommate: "Smoker",
                    genderRoommate: "Gender",
                    hobbiesRoommate: "Hobbies",
                    availability: "Availability",
                },
            },
            message: {
                misc: {
                    createdAt: "Created at:",
                    sentMessageMisc: "Sent a Message to",
                },
                form: {
                    fullName: "Full Name",
                    emailAddress: "Email Address",
                    phoneNumber: "Phone Number",
                    message: "Message",
                    sentMessageBtn: "Sent Message",
                },
                index: {
                    noMessages: "No message has been received",
                    createdAt: "Created at",
                    nameOfRequester: "Name of the requester",
                    respond: "Respond",
                },
            },
            reportListing: {
                title: "Report issue with Listing",
                contactName: "Contact Name",
                emailAddress: "Email Address",
                natureForm: "Nature of Report",
                detailsForm: "Details",
                reportListingBtn: "Report Listing",
            },
            searchFunctionality: {
                inputPlaceholder: "Enter address, city or zipcode",
                showList: "Show List",
                inA: "in a",
                availableFrom: "Available from",
                month: "month",
                showMap: "Show Map",
                roommate: {
                    inputPlaceholder: "Enter area, city or title",
                    availableFrom: "Available from",
                    searchingForRoommate: "Searching For",
                    month: "month",
                },
            },
            favourites: {
                noFavourites: "No property has been added to favourites",
                showViewed: "Showing your last",
                viewedProperties: "Viewed properties",
                noViewed: "No property has been recently viewed",
                favouriteCard: {
                    searchingForCard: "Searching for",
                    typeCard: "Type",
                    createdAt: "Created at",
                    message: "Message",
                },
            },
            verification: {
                stepOne: "Step 1",
                accountDetails: "Account details",
                stepTwo: "Step 2",
                email: "Email",
                stepThree: "Step 3",
                phone: "Phone",
                stepFour: "Step 4",
                socialMedia: "Social media",
                stepFive: "Step 5",
                selfie: "Selfie",
                stepSix: "Step 6",
                idStepSix: "ID",
                verify: "Verify",
                message: "Please go through the steps to verify your account.",
            },
            conversation: {
                allConversationsTitle: "All conversations",
                inputPlaceholder: "Type your message...",
                sendBtn: "Send",
                created: "Created at",
                selectConversation: "Select a conversation",
            },
            profile: {
                updateProfileInformations: {
                    title: "Profile Information",
                    description:
                        "Update your account's profile information and email address.",
                    firstName: "First Name",
                    lastName: "Last Name",
                    emailAddress: "Email",
                    verified: "Verified",
                    unverified: "Unverified",
                    save: "Save",
                    saved: "Saved.",
                    unverifiedEmail: "Your email address is unverified.",
                    reSendVerificationEmail:
                        "Click here to re-send the verification email.",
                    newVerificationLink:
                        "A new verification link has been sent to your email address.",
                },
                updatePhoneNumber: {
                    title: "Profile Phone Number",
                    description:
                        "Enhance your account's security and expand your reach to potential flatmates by updating your profile phone number.",
                    phoneNumber: "Phone Number ex. +306911234567",
                    verified: "Verified",
                    unverified: "Unverified",
                    save: "Save",
                    saved: "Saved.",
                    verifyPhoneNumberBtn:
                        "Click here to verify your phone number.",
                },
                updateProfilePhoto: {
                    title: "Profile Photo",
                    description:
                        "Enhance your account's security and expand your reach to potential flatmates by updating your profile photo.",
                    photoNotUploaded:
                        "The photo profile has not been uploaded! Try again.",
                    photoProfile: "Photo Profile",
                    verified: "Verified",
                    unverified: "Unverified",
                    save: "Save",
                    saved: "Saved.",
                    selectImage: "Please select an image file.",
                },
                updateSocialLinks: {
                    title: "Profile Social Media",
                    description:
                        "Enhance your account's security and expand your reach to potential flatmates by updating your social media.",
                    verified: "Verified",
                    unverified: "Unverified",
                    save: "Save",
                    saved: "Saved.",
                },
                updatePasswordForm: {
                    title: "Update Password",
                    description:
                        "Ensure your account is using a long, random password to stay secure.",
                    currentPassword: "Current Password",
                    newPassword: "New Password",
                    confirmPassword: "Confrim Password",
                    save: "Save",
                    saved: "Saved.",
                },
                updateSelfieDocument: {
                    title: "Verify Selfie",
                    titleTwo: "Remove hoodies and glasses",
                    description:
                        "Enhance your account's security and expand your reach to potential flatmates by verifying your selie",
                    snap: "Snap!",
                    noFacePhotoProfile:
                        "No face detected in the photo profile. Please try again with a different photo.",
                    noFaceSelfie:
                        "No face detected in the selfie. Please try again with a different photo.",
                    newSelfie: "Take a new selfie",
                    verified: "Verified",
                    unverified: "Unverified",
                    verify: "Verify",
                    getSelfie: "Get Selfie",
                    loading: "Loading...",
                    verifyingPhotos: "Verifying Photos",
                },
                updateIdDocument: {
                    title: "Verify ID document",
                    titleTwo: "Provide full size of front page",
                    description:
                        "Enhance your account's security and expand your reach to potential flatmates by verifying your Id document",
                    snap: "Snap!",
                    noFacePhotoProfile:
                        "No face detected in the photo profile. Please try again with a different photo.",
                    noFaceId:
                        "No face detected in the ID document. Please try again with a different photo.",
                    newPhoto: "Take a new photo",
                    verified: "Verified",
                    unverified: "Unverified",
                    verify: "Verify",
                    getPhoto: "Get Photo",
                    loading: "Loading...",
                    verifyingPhotos: "Verifying Photos",
                },
                deleteUserForm: {
                    title: "Delete Account",
                    description:
                        "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.",
                    modalTitle: "Are you sure you want to delete your account?",
                    modalDescription:
                        "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.",
                    passwordFormInput: "Password",
                    cancelBtn: "Cancel",
                    deleteAccountBtn: "Delete Account",
                },
            },
            blog: {
                readMore: "Read More...",
                relatedPosts: "Related Posts",
                recentPosts: "Recent Posts",
                categoriesComponent: "Categories",
                commentsForm: {
                    title: "Leave a Comment",
                    commentForm: "Comment..",
                    nameForm: "Name..",
                    emailForm: "Email..",
                    storeDetails:
                        "Store my e-mail and name for the next time I comment.",
                    postCommentBtn: "Post comment",
                    commentSubmitted: "Comment submitted for review",
                },
                getComments: {
                    commentsComponent: "Comments",
                    on: "on",
                },
            },
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
                    emailTaken: "Το email χρησιμοποιείτε ήδη.",
                    passwordBackend:
                        "Ο κωδικός πρόσβασης έχει εμφανιστεί σε διαρροή δεδομένων. Παρακαλώ επιλέξτε έναν διαφορετικό κωδικό πρόσβασης.",
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
                register: {
                    stepOne: {
                        firstNameRequired: "Το Όνομα είναι υποχρεωτικό",
                        firstNameMax:
                            "Το Όνομα δεν πρέπει να υπερβαίνει τους 255 χαρακτήρες",
                        lastNameRequired: "Το Επίθετο είναι υποχρεωτικό",
                        lastNameMax:
                            "Το Επίθετο δεν πρέπει να υπερβαίνει τους 255 χαρακτήρες",
                        emailType:
                            "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
                        emailRequired: "Το Email είναι υποχρεωτικό",
                        passwordMin:
                            "Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες",
                        passwordMatches:
                            "Ο κωδικός πρέπει να περιέχει τουλάχιστον ένα κεφαλαίο γράμμα, ένα μικρό γράμμα, έναν αριθμό και έναν ειδικό χαρακτήρα",
                        passwordMax:
                            "Ο κωδικός πρόσβασης πρέπει να έχει το πολύ 20 χαρακτήρες",
                        passwordRequired:
                            "Ο κωδικός πρόσβασης είναι υποχρεωτικός",
                        passwordConfirmationRequired:
                            "Η επιβεβαίωση κωδικού πρόσβασης είναι υποχρεωτική",
                        passwordConfirmationOneOf:
                            "Ο κωδικός πρόσβασης δεν ταιριάζει",
                    },
                    stepTwo: {
                        DOBRequired: "Η Ημερομηνία Γέννησης είναι υποχρεωτική",
                        DOBAboveEighteen:
                            "Πρέπει να είστε  τουλάχιστον 18 ετών",
                        genderRequired: "Το Φύλο είναι υποχρεωτικό",
                        lookingForRequired:
                            "Το Αναζητώ για πεδίο είναι υποχρεωτικό",
                    },
                },
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
                stepOneFlatmate: {
                    cityMax: "Η πόλη πρέπει να έχει το πολύ 20 χαρακτήρες",
                    cityRequired: "Απαιτείται η πόλη",
                    areaMax: "Η περιοχή πρέπει να έχει το πολύ 20 χαρακτήρες",
                    areaRequired: "Απαιτείται η περιοχή",
                    roomSizeRequired: "Απαιτείται το μέγεθος",
                    availableFromTypeError:
                        "Η διαθεσιμότητα από πρέπει να είναι μια ημερομηνία",
                    availableFromMin:
                        "Η διαθεσιμότητα από πρέπει να είναι στο μέλλον",
                    availableFromRequired: "Απαιτείται η διαθεσιμότητα από",
                    searchingForRequired: "Απαιτείται η αναζήτηση για",
                    minimumStayRequired:
                        "Απαιτείται το ελάχιστο διάστημα διαμονής",
                    maximumStayTest:
                        "Η μέγιστη διάρκεια διαμονής πρέπει να είναι μεγαλύτερη από το ελάχιστο διάστημα διαμονής",
                    maximumStayRequired:
                        "Απαιτείται η μέγιστη διάρκεια διαμονής",
                    daysAvailableRequired: "Απαιτείται οι διαθέσιμες ημέρες",
                    budgetTypeError: "Αυτό δεν μοιάζει με έναν αριθμό",
                    budgetRequired: "Απαιτείται το budget",
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
                stepTwoFlatmate: {
                    myAgeTypeError: "Αυτό δεν μοιάζει με ηλικία",
                    myAgeMin: "Πρέπει να είστε από 18 ετών και άνω",
                    myAgeRequired: "Απαιτείται η ηλικία",
                    mySmokerRequired: "Απαιτείται η πληροφορία καπνίσματος",
                    myPetsRequired: "Απαιτείται η πληροφορία για κατοικίδια",
                    myOccupationRequired:
                        "Απαιτείται η πληροφορία για το επάγγελμα",
                    myGenderRequired: "Απαιτείται η πληροφορία για το φύλο",
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
                    selectedAmenitisMin: "Απαιτείται τουλάχιστον μία παροχή",
                    selectedAmenitiesRequired: "Οι παροχές είναι υποχρεωτικές",
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
                    photosRequired: "Οι εικόνες είναι υποχρεωτικές",
                },
                reportedListing: {
                    reasonRequired: "Ο λόγος αναφοράς είναι υποχρεωτικός.",
                },
                verifyMobile: {
                    codeNumber: "Ο κωδικός πρέπει να είναι αριθμός.",
                    codeRequired: "Ο κωδικός είναι υποχρεωτικός.",
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
                    alertMessage: "Σφάλμα κατά τη δημιουργία της πληρωμής",
                },
                buttons: {
                    availableRoomsBtn: "Διαθέσιμα δωμάτια:",
                    bedroomsBtn: "Δωμάτια:",
                    budgetBtn: "Προϋπολογισμός:",
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
            myListings: {
                misc: {
                    allProperties: "Όλες οι Αγγελίες",
                    searchProperties:
                        "Αναζητήστε τις αγγελίες σας και διαχειριστείτε τις ή ενημερώστε τις.",
                    inputPlaceholder: "Αναζήτηση...",
                    addProperty: "Προσθήκη αγγελίας",
                },
                table: {
                    type: "Τύπος",
                    title: "Τίτλος",
                    id: "Αριθμός",
                    bedrooms: "Υπνοδωμάτια",
                    createdAt: "Δημιουργήθηκε στις",
                    status: "Κατάσταση",
                    action: "Ενέργεια",
                    halted: "Αδημοσίευτο",
                    liveAt: "Δημοσίευτηκε στις",
                    manage: "Διαχείριση",
                },
            },
            roommate: {
                misc: {
                    nextBtn: "Επόμενο",
                    backBtn: "Πίσω",
                    yourInformation: "Οι πληροφορίες σας",
                    fixErrors:
                        "Παρακαλώ διορθώστε τα παρακάτω σφάλματα πριν συνεχίσετε.",
                    processingBtn: "Επεξεργασία...",
                    placeAdBtn: "Δημοσίευση της αγγελίας σας",
                },
                forms: {
                    stepOne: {
                        budgetStepOne: "Προϋπολογισμός",
                        availableFromStepOne: "Διαθέσιμο από",
                        searchingForStepOne: "Αναζητώ για",
                        minimumStayStepOne: "Ελάχιστη διάρκεια διαμονής",
                        maximumStayStepOne: "Μέγιστη διάρκεια διαμονής",
                        roomSizeStepOne: "Μέγεθος δωματίου",
                        daysAvailableStepOne: "Διαθέσιμες μέρες",
                        shortTermStepOne: "Βραχυπρόθεσμα",
                        cityStepOne: "Πόλη",
                        areaStepOne: "Περιοχή",
                    },
                    stepTwo: {
                        ageStepTwo: "Ηλικία",
                        smokerStepTwo: "Καπνιστής",
                        petsStepTwo: "Κατοικίδια",
                        occupationStepTwo: "Επάγγελμα",
                        genderStepTwo: "Φύλο",
                    },
                    stepSix: {
                        amenitiesStepSix: "Παροχές",
                        hobbiesStepSix: "Χόμπι",
                        titleStepSix: "Τίτλος",
                        descriptionStepSix: "Περιγραφή",
                    },
                },
                edit: {
                    fixErrors: "Παρακαλώ διορθώστε τα σφάλματα",
                    propertyDetails: "Λεπτομέρειες ιδιοκτησίας;",
                    yourInformation: "Οι πληροφορίες σας",
                    flatmatesDisclosure: "Συγκάτοικοι;",
                    advertiserDetails: "Λεπτομέρειες διαφημιστή;",
                    confirmation: "Επιβεβαίωση;",
                    filesUploaded:
                        "Αρχεία που ανέβηκαν κατά τη δημιουργία διαφήμισης",
                    processingBtn: "Επεξεργασία...",
                    updateBtn: "Ενημέρωση της διαφήμισής σας",
                },
            },
            pagination: {
                page: "Σελίδα",
                previous: "Προηγούμενη",
                next: "Επόμενη",
            },
            authenticatedLayout: {
                conversationSupport: {
                    support: "Υποστήριξη",
                    you: "Εσείς",
                    customerSupport: "Υποστήριξη Πελατών",
                    enquiry: "Παρακαλώ εισαγάγετε το ερώτημά σας.",
                    loadingSupport: "Φόρτωση...",
                    sendBtn: "Αποστολή",
                },
                navigation: {
                    hi: "Γεια σας",
                    savedProperties: "Αποθηκευμένες Αγγελίες",
                    recentlyViewed: "Πρόσφατα Εμφανισμένες",
                    messages: "Μηνύματα",
                    inbox: "Εισερχόμενα",
                    profile: "Προφίλ",
                    logOut: "Αποσύνδεση",
                },
                banner: {
                    welcome: "Καλώς ήλθατε πίσω στο λογαριασμό σας!",
                    searchBnr: "Συνεχίστε την αναζήτηση για το σπίτι σας.",
                },
                navigationHeader: {
                    dashboard: "Dashboard",
                    admin: "Admin",
                    myProperties: "Οι αγγελίες μου",
                    roommateLisiting: "Συγκάτοικος",
                    verify: "Επαλήθευση",
                    account: "Λογαριασμός",
                },
            },
            dashboard: { loggedIn: "Έχετε συνδεθεί!" },
            propertyDetails: {
                misc: {
                    inA: "σε έναν",
                    month: "μήνα",
                    photosof: "Φωτογραφίες του",
                    closePhotos: "Κλείσιμο Φωτογραφιών",
                    showMore: "Εμφάνιση Περισσότερων Φωτογραφιών",
                },
                details: {
                    overview: "Επισκόπηση",
                    rooms: "δωμάτια",
                    typeDetails: "Τύπος",
                    availableFrom: "Διαθέσιμο από",
                    where: "Πού θα μένετε",
                    availability: "Διαθεσιμότητα",
                    transport: "Μεταφορά",
                    moreInformation: "Περισσότερες Πληροφορίες",
                    reportListing: "Αναφορά Αγγελίας",
                    neighborhood: "Γειτονιά",
                    amenitiesDetails: "Παροχές",
                    advertisedBy: "Διαφημισμένο από",
                    tel: "Τηλ",
                    message: "Στείλε στον/ην",
                },
                roommate: {
                    month: "μήνα",
                    overview: "Επισκόπηση",
                    lookingFor: "Ψάχνω για",
                    bedroom: "υπνοδωμάτιο",
                    searchingForRoommate: "Αναζητώ",
                    availableFromRoommate: "Διαθέσιμο από",
                    moreInformation: "Περισσότερες Πληροφορίες",
                    reportListing: "Αναφορά Αγγελίας",
                    knowMeBetter: "Γνώρισέ με καλύτερα",
                    ageRoommate: "Ηλικία",
                    smokerRoommate: "Καπνιστής",
                    genderRoommate: "Φύλο",
                    hobbiesRoommate: "Χόμπι",
                    availability: "Διαθεσιμότητα",
                },
            },
            message: {
                misc: {
                    createdAt: "Δημιουργήθηκε στις:",
                    sentMessageMisc: "Έστειλε ένα μήνυμα σε",
                },
                form: {
                    fullName: "Πλήρες Όνομα",
                    emailAddress: "Διεύθυνση Email",
                    phoneNumber: "Τηλέφωνο",
                    message: "Μήνυμα",
                    sentMessageBtn: "Αποστολή Μηνύματος",
                },
                index: {
                    noMessages: "Δεν έχει ληφθεί κάποιο μήνυμα",
                    createdAt: "Δημιουργήθηκε στις",
                    nameOfRequester: "Όνομα του αιτούντα",
                    respond: "Απάντησε",
                },
            },
            reportListing: {
                title: "Αναφορά προβλήματος με την καταχώριση",
                contactName: "Όνομα επικοινωνίας",
                emailAddress: "Διεύθυνση email",
                natureForm: "Φύση της αναφοράς",
                detailsForm: "Λεπτομέρειες",
                reportListingBtn: "Αναφορά Αγγελίας",
            },
            searchFunctionality: {
                inputPlaceholder:
                    "Εισάγετε διεύθυνση, πόλη ή ταχυδρομικό κώδικα",
                showList: "Εμφάνιση Λίστας",
                inA: "σε μια",
                availableFrom: "Διαθέσιμο από",
                month: "μήνα",
                showMap: "Εμφάνιση Χάρτη",
                roommate: {
                    inputPlaceholder: "Εισάγετε περιοχή, πόλη ή τίτλο",
                    availableFrom: "Διαθέσιμο από",
                    searchingForRoommate: "Αναζήτηση Για",
                    month: "μήνα",
                },
            },
            favourites: {
                noFavourites: "Δεν έχει προστεθεί κανένα αγαπημένο ακίνητο.",
                showViewed: "Εμφάνιση των τελευταίων",
                viewedProperties: "αγγελίων πού έχουν προβληθεί",
                noViewed: "Δεν έχει προβληθεί καμία αγγελία πρόσφατα",
                favouriteCard: {
                    searchingForCard: "Αναζήτηση για",
                    typeCard: "Τύπος",
                    createdAt: "Δημιουργήθηκε στις",
                    message: "Στείλε μήνυμα:",
                },
            },
            verification: {
                stepOne: "Βήμα 1",
                accountDetails: "Λεπτομέρειες λογαριασμού",
                stepTwo: "Βήμα 2",
                email: "Email",
                stepThree: "Βήμα 3",
                phone: "Τηλέφωνο",
                stepFour: "Βήμα 4",
                socialMedia: "Κοινωνικά δίκτυα",
                stepFive: "Βήμα 5",
                selfie: "Selfie",
                stepSix: "Βήμα 6",
                idStepSix: "Ταυτότητα",
                verify: "Επαλήθευση",
                message:
                    "Παρακαλούμε ακολουθήστε τα βήματα για την επαλήθευση του λογαριασμού σας.",
            },
            conversation: {
                allConversationsTitle: "Όλες οι συνομιλίες",
                inputPlaceholder: "Πληκτρολογήστε το μήνυμά σας...",
                sendBtn: "Αποστολή",
                created: "Δημιουργήθηκε στις",
                selectConversation: "Επιλέξε μια συνομιλία",
            },
            profile: {
                updateProfileInformations: {
                    title: "Πληροφορίες Προφίλ",
                    description:
                        "Ενημερώστε τις πληροφορίες του προφίλ σας και τη διεύθυνση email του λογαριασμού σας.",
                    firstName: "Όνομα",
                    lastName: "Επώνυμο",
                    emailAddress: "Email",
                    verified: "Επαληθευμένο",
                    unverified: "Μη Επαληθευμένο",
                    save: "Αποθήκευση",
                    saved: "Αποθηκεύτηκε.",
                    unverifiedEmail:
                        "Η διεύθυνση email σας δεν έχει επαληθευτεί.",
                    reSendVerificationEmail:
                        "Κάντε κλικ εδώ για να ξαναστείλετε το email επαλήθευσης.",
                    newVerificationLink:
                        "Ένας νέος σύνδεσμος επαλήθευσης έχει σταλεί στη διεύθυνση email σας.",
                },
                updatePhoneNumber: {
                    title: "Τηλέφωνο Προφίλ",
                    description:
                        "Ενημερώστε τον αριθμό τηλεφώνου του προφίλ σας για να αυξήσετε την ασφάλεια και να φτάσετε περισσότερους συγκάτοικους.",
                    phoneNumber: "Αριθμός Τηλεφώνου π.χ. +306911234567",
                    verified: "Επαληθευμένο",
                    unverified: "Μη Επαληθευμένο",
                    save: "Αποθήκευση",
                    saved: "Αποθηκεύτηκε.",
                    verifyPhoneNumberBtn:
                        "Κάντε κλικ εδώ για να επιβεβαιώσετε τον αριθμό τηλεφώνου σας.",
                },
                updateProfilePhoto: {
                    title: "Φωτογραφία προφίλ",
                    description:
                        "Ενημερώστε την φωτογραφία προφίλ σας για να αυξήσετε την ασφάλεια και να φτάσετε περισσότερους συγκάτοικους.",
                    photoNotUploaded:
                        "Η φωτογραφία προφίλ δεν έχει ανεβεί! Δοκιμάστε ξανά.",
                    photoProfile: "Φωτογραφία Προφίλ",
                    verified: "Επαληθευμένο",
                    unverified: "Μη επαληθευμένο",
                    save: "Αποθήκευση",
                    saved: "Αποθηκεύτηκε.",
                    selectImage: "Παρακαλώ επιλέξτε ένα αρχείο εικόνας.",
                },
                updateSocialLinks: {
                    title: "Κοινωνικά Δίκτυα",
                    description:
                        "Ενημερώστε τα socials σας για να αυξήσετε την ασφάλεια και να φτάσετε περισσότερους συγκάτοικους.",
                    verified: "Επαληθευμένο",
                    unverified: "Μη επαληθευμένο",
                    save: "Αποθήκευση",
                    saved: "Αποθηκεύτηκε.",
                },
                updatePasswordForm: {
                    title: "Ενημέρωση Κωδικού Πρόσβασης",
                    description:
                        "Βεβαιωθείτε ότι ο λογαριασμός σας χρησιμοποιεί έναν μακρύ, τυχαίο κωδικό πρόσβασης για να παραμείνει ασφαλής.",
                    currentPassword: "Τρέχων Κωδικός Πρόσβασης",
                    newPassword: "Νέος Κωδικός Πρόσβασης",
                    confirmPassword: "Επιβεβαίωση Κωδικού",
                    save: "Αποθήκευση",
                    saved: "Αποθηκεύτηκε.",
                },
                updateSelfieDocument: {
                    title: "Επαλήθευση Selfie",
                    titleTwo: "Αφαιρέστε τις κουκούλες και τα γυαλιά",
                    description:
                        "Επαληθεύστε το selfie σας για να αυξήσετε την ασφάλεια και να φτάσετε περισσότερους συγκάτοικους.",
                    snap: "Τραβήξτε φωτογραφία!",
                    noFacePhotoProfile:
                        "Δεν εντοπίστηκε πρόσωπο στη φωτογραφία προφίλ. Παρακαλώ προσπαθήστε ξανά με μια διαφορετική φωτογραφία.",
                    noFaceSelfie:
                        "Δεν εντοπίστηκε πρόσωπο στο selfie. Παρακαλώ προσπαθήστε ξανά με μια διαφορετική φωτογραφία.",
                    newSelfie: "Βγάλτε ένα νέο selfie",
                    verified: "Επαληθευμένο",
                    unverified: "Μη επαληθευμένο",
                    verify: "Επαλήθευση",
                    getSelfie: "Λήψη Selfie",
                    loading: "Φόρτωση...",
                    verifyingPhotos: "Επαλήθευση Φωτογραφιών",
                },
                updateIdDocument: {
                    title: "Επαλήθευση εγγράφου ταυτότητας",
                    titleTwo:
                        "Βγάλτε φωτογραφία το πλήρες μέγεθος της πρώτης σελίδας",
                    description:
                        "Επαληθεύστε το έγγραφο ταυτότητας σας για να αυξήσετε την ασφάλεια και να φτάσετε περισσότερους συγκάτοικους.",
                    snap: "Τραβήξτε φωτογραφία!",
                    noFacePhotoProfile:
                        "Δεν εντοπίστηκε πρόσωπο στη φωτογραφία προφίλ. Παρακαλώ προσπαθήστε ξανά με μια διαφορετική φωτογραφία.",
                    noFaceId:
                        "Δεν εντοπίστηκε πρόσωπο στο έγγραφο ταυτότητας. Παρακαλώ προσπαθήστε ξανά με μια διαφορετική φωτογραφία.",
                    newPhoto: "Βγάλτε μια νέα φωτογραφία",
                    verified: "Επαληθευμένο",
                    unverified: "Μη επαληθευμένο",
                    verify: "Επαλήθευση",
                    getPhoto: "Λήψη φωτογραφίας",
                    loading: "Φόρτωση...",
                    verifyingPhotos: "Επαλήθευση Φωτογραφιών",
                },
                deleteUserForm: {
                    title: "Διαγραφή Λογαριασμού",
                    description:
                        "Μόλις διαγράψετε τον λογαριασμό σας, όλοι οι πόροι και οι δεδομένοι του θα διαγραφούν οριστικά. Πριν διαγράψετε τον λογαριασμό σας, παρακαλούμε κατεβάστε οποιαδήποτε δεδομένα ή πληροφορίες που θέλετε να διατηρήσετε.",
                    modalTitle:
                        "Είστε σίγουρος ότι θέλετε να διαγράψετε τον λογαριασμό σας;",
                    modalDescription:
                        "Μόλις διαγράψετε τον λογαριασμό σας, όλοι οι πόροι και οι δεδομένοι του θα διαγραφούν οριστικά. Παρακαλούμε εισάγετε τον κωδικό πρόσβασής σας για να επιβεβαιώσετε ότι θέλετε να διαγράψετε οριστικά τον λογαριασμό σας.",
                    passwordFormInput: "Κωδικός",
                    cancelBtn: "Άκυρο",
                    deleteAccountBtn: "Διαγραφή Λογαριασμού",
                },
            },
            blog: {
                readMore: "Διαβάστε περισσότερο...",
                relatedPosts: "Σχετικές Δημοσιεύσεις",
                recentPosts: "Πρόσφατες Δημοσιεύσεις",
                categoriesComponent: "Κατηγορίες",
                commentsForm: {
                    title: "Αφήστε ένα Σχόλιο",
                    commentForm: "Σχόλιο..",
                    nameForm: "Όνομα..",
                    emailForm: "Email..",
                    storeDetails:
                        "Αποθηκεύστε το email και το όνομά μου για την επόμενη φορά που θα σχολιάσω.",
                    postCommentBtn: "Υποβολή σχολίου",
                    commentSubmitted: "Το σχόλιο υποβλήθηκε για επιθεώρηση",
                },
                getComments: {
                    commentsComponent: "Σχόλια",
                    on: "στις",
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

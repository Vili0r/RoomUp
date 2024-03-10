import * as yup from "yup";

const maxFiles = 9;
const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];

const stepOneSchema = (t) => {
    const {
        address1Required,
        address1Max,
        cityRequired,
        cityMax,
        areaRequired,
        areaMax,
        postCodeRequired,
        postCodeMax,
        minutesRequired,
        modeRequired,
        stationRequired,
    } = t("validation.stepOne");

    return yup.object().shape({
        address_1: yup.string().max(30, address1Max).required(address1Required),
        city: yup.string().max(20, cityMax).required(cityRequired),
        area: yup.string().max(30, areaMax).required(areaRequired),
        post_code: yup.string().max(7, postCodeMax).required(postCodeRequired),
        minutes: yup.string().required(minutesRequired),
        mode: yup.string().required(modeRequired),
        station: yup.string().required(stationRequired),
    });
};

const stepTwoSchema = (t) => {
    const {
        availableRoomsRequired,
        availableRoomsTest,
        sizeRequired,
        sizeTest,
        typeRequired,
        currentOccupantsRequired,
        currentOccupantsTest,
        whatIAmRequired,
    } = t("validation.stepTwoShared");

    return yup.object().shape({
        available_rooms: yup
            .string()
            .required(availableRoomsRequired)
            .test("smallerThanDiff", availableRoomsTest, function (value) {
                const { size, current_occupants } = this.parent;
                const diff = size - current_occupants;
                return value <= diff;
            }),
        size: yup
            .string()
            .required(sizeRequired)
            .when("available_rooms", (available_rooms, schema) => {
                return schema.test({
                    test: (size) => size >= available_rooms,
                    message: sizeTest,
                });
            }),
        type: yup.string().required(typeRequired),
        current_occupants: yup
            .string()
            .required(currentOccupantsRequired)
            .when("size", (size, schema) => {
                return schema.test({
                    test: (current_occupants) => current_occupants <= size,
                    message: currentOccupantsTest,
                });
            }),
        what_i_am: yup.string().required(whatIAmRequired),
    });
};

const stepThreeSchema = (t) => {
    const {
        availableFromRequired,
        availableFromTypeError,
        availableFromMin,
        roomCostRequired,
        roomCostTypeError,
        roomDepositRequired,
        roomDepositTypeError,
        roomSizeRequired,
        roomFurnishedRequired,
        minimumStayRequired,
        maximumStayRequired,
        maximumStayTest,
        daysAvailableRequired,
    } = t("validation.stepThreeShared");

    return yup.array().of(
        yup.object().shape({
            available_from: yup
                .date()
                .typeError(availableFromTypeError)
                .min(new Date(), availableFromMin)
                .required(availableFromRequired),
            room_cost: yup
                .number()
                .typeError(roomCostTypeError)
                .required(roomCostRequired),
            room_deposit: yup
                .number()
                .typeError(roomDepositTypeError)
                .required(roomDepositRequired),
            room_size: yup.string().required(roomSizeRequired),
            room_furnished: yup.string().required(roomFurnishedRequired),
            minimum_stay: yup.string().required(minimumStayRequired),
            maximum_stay: yup
                .string()
                .test(
                    "greater-than-minimum",
                    maximumStayTest,
                    function (value) {
                        const minimumStay = this.resolve(
                            yup.ref("minimum_stay")
                        );
                        if (!minimumStay || !value) {
                            return true; // Allow validation to pass if either field is empty
                        }
                        return parseInt(value, 10) > parseInt(minimumStay, 10);
                    }
                )
                .required(maximumStayRequired),
            days_available: yup.string().required(daysAvailableRequired),
        })
    );
};

const stepFourSchema = (t) => {
    const {
        firstNameMax,
        firstNameRequired,
        lastNameMax,
        lastNameRequired,
        telephoneMin,
        telephoneMax,
        telephoneMaxMatches,
        telephoneRequired,
    } = t("validation.stepFour");

    return yup.object().shape({
        first_name: yup
            .string()
            .max(20, firstNameMax)
            .required(firstNameRequired),
        last_name: yup.string().max(20, lastNameMax).required(lastNameRequired),
        telephone: yup
            .string()
            .min(8, telephoneMin)
            .max(15, telephoneMax)
            .matches(/^\d+$/, telephoneMaxMatches)
            .required(telephoneRequired),
    });
};

const stepFiveSchema = (current_occupants, t) => {
    const {
        currentFlatmateAgeTypeError,
        currentFlatmateAgeMin,
        currentFlatmateAgeRequired,
        currentFlatmateSmokerRequired,
        currentFlatmatePetsRequuired,
        currentFlatmateOccupationRequired,
        currentFlatmateGenderRequired,
    } = t("validation.currentFlatmate");
    const {
        newFlatmateMinAgeTypeError,
        newFlatmateMinAgeMin,
        newFlatmateMinAgeRequired,
        newFlatmatemaxAgeTypeError,
        newFlatmatemaxAgeMax,
        newFlatmatemaxAgeRequired,
        newFlatmatemaxAgeTest,
        newFlatmateSmokerRequired,
        newFlatmatePetsRequired,
        newFlatmateOccupationRequired,
        newFlatmateGenderRequired,
    } = t("validation.newFlatmate");

    return yup.object().shape({
        new_flatmate_min_age: yup
            .number()
            .typeError(newFlatmateMinAgeTypeError)
            .min(18, newFlatmateMinAgeMin)
            .required(newFlatmateMinAgeRequired),
        new_flatmate_max_age: yup
            .number()
            .typeError(newFlatmatemaxAgeTypeError)
            .min(18, newFlatmatemaxAgeMax)
            .required(newFlatmatemaxAgeRequired)
            .when("new_flatmate_min_age", (new_flatmate_min_age, schema) => {
                return schema.test({
                    test: (new_flatmate_max_age) =>
                        new_flatmate_max_age > new_flatmate_min_age,
                    message: newFlatmatemaxAgeTest,
                });
            }),
        new_flatmate_smoker: yup.string().required(newFlatmateSmokerRequired),
        new_flatmate_pets: yup.string().required(newFlatmatePetsRequired),
        new_flatmate_occupation: yup
            .string()
            .required(newFlatmateOccupationRequired),
        new_flatmate_gender: yup.string().required(newFlatmateGenderRequired),
        ...(current_occupants >= 1 && {
            current_flatmate_age: yup
                .number()
                .typeError(currentFlatmateAgeTypeError)
                .min(18, currentFlatmateAgeMin)
                .required(currentFlatmateAgeRequired),
            current_flatmate_smoker: yup
                .string()
                .required(currentFlatmateSmokerRequired),
            current_flatmate_pets: yup
                .string()
                .required(currentFlatmatePetsRequuired),
            current_flatmate_occupation: yup
                .string()
                .required(currentFlatmateOccupationRequired),
            current_flatmate_gender: yup
                .string()
                .required(currentFlatmateGenderRequired),
        }),
    });
};

const stepSixSchema = (t) => {
    const {
        amenitiesMin,
        amenitiesRequired,
        titleMin,
        titleMax,
        titleRequired,
        descriptionMin,
        descriptionMax,
        descriptionRequired,
        photosMax,
        photosRequired,
    } = t("validation.stepSix");

    return yup.object().shape({
        selectedAmenities: yup
            .array()
            .min(1, amenitiesMin)
            .required(amenitiesRequired),
        title: yup
            .string()
            .min(10, titleMin)
            .max(50, titleMax)
            .required(titleRequired),
        description: yup
            .string()
            .min(50, descriptionMin)
            .max(500, descriptionMax)
            .required(descriptionRequired),
        images: yup.array().max(maxFiles, photosMax).required(photosRequired),
    });
};

export {
    stepOneSchema,
    stepTwoSchema,
    stepThreeSchema,
    stepFourSchema,
    stepFiveSchema,
    stepSixSchema,
};

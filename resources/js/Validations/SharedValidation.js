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
    } = t("shared.validation.stepOne");

    return yup.object().shape({
        address_1: yup.string().max(30, address1Max).required(address1Required),
        city: yup.string().max(20, cityMax).required(cityRequired),
        area: yup.string().max(20, areaMax).required(areaRequired),
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
    } = t("shared.validation.stepTwo");

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
    } = t("shared.validation.stepThree");

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
    } = t("shared.validation.stepFour");

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

const stepFiveSchema = (current_occupants) =>
    yup.object().shape({
        new_flatmate_min_age: yup
            .number()
            .typeError("That doesn't look like an age")
            .min(18, "Your new flatmate should be more than 18 years old")
            .required(),
        new_flatmate_max_age: yup
            .number()
            .typeError("That doesn't look like an age")
            .min(18, "Your new flatmate should be more than 18 years old")
            .required()
            .when("new_flatmate_min_age", (new_flatmate_min_age, schema) => {
                return schema.test({
                    test: (new_flatmate_max_age) =>
                        new_flatmate_max_age > new_flatmate_min_age,
                    message: "Max age must be greater than the min age",
                });
            }),
        new_flatmate_smoker: yup.string().required("Smoker field is required"),
        new_flatmate_pets: yup.string().required("Pet field is required"),
        new_flatmate_occupation: yup
            .string()
            .required("Occupation field is required"),
        new_flatmate_gender: yup.string().required("Gender field is required"),
        ...(current_occupants >= 1 && {
            current_flatmate_age: yup
                .number()
                .typeError("That doesn't look like an age")
                .min(18, "You should be more than 18 years old")
                .required("Age is required"),
            current_flatmate_smoker: yup
                .string()
                .required("Smoker field is required"),
            current_flatmate_pets: yup
                .string()
                .required("Pet field is required"),
            current_flatmate_occupation: yup
                .string()
                .required("Occupation field is required"),
            current_flatmate_gender: yup
                .string()
                .required("Gender field is required"),
        }),
    });

const stepSixSchema = yup.object().shape({
    electedAmenities: yup
        .array()
        .min(1, "At least one amenity is required")
        .required("Amenities are required"),
    title: yup.string().min(10).max(50).required(),
    description: yup.string().min(50).max(500).required(),
    photos: yup
        .array()
        .max(maxFiles, `You can upload up to ${maxFiles} images`)
        .of(
            yup
                .mixed()
                .test("fileFormat", "Unsupported file format", (value) =>
                    supportedFormats.includes(value.type)
                )
                .test("fileSize", "File size is too large", (value) =>
                    value ? value.size <= 1048576 : true
                )
        ),
});

export {
    stepOneSchema,
    stepTwoSchema,
    stepThreeSchema,
    stepFourSchema,
    stepFiveSchema,
    stepSixSchema,
};

import * as yup from "yup";

const maxFiles = 9;
const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];

const stepOneSchema = (t) => {
    const {
        address1Required,
        address1Max,
        cityRequired,
        cityMax,
        postCodeRequired,
        postCodeMax,
        minutesRequired,
        modeRequired,
        stationRequired,
    } = t("validation.stepOne");

    return yup.object().shape({
        address_1: yup.string().max(30, address1Max).required(address1Required),
        city: yup.string().max(30, cityMax).required(cityRequired),
        post_code: yup.string().max(7, postCodeMax).required(postCodeRequired),
        minutes: yup.string().required(minutesRequired),
        mode: yup.string().required(modeRequired),
        station: yup.string().required(stationRequired),
    });
};

const stepTwoSchema = (t) => {
    const {
        sizeRequired,
        typeRequired,
        furnishedRequired,
        costTypeError,
        costRequired,
        depositTypeError,
        depositRequired,
        whatIAmRequired,
    } = t("validation.stepTwoFlat");

    return yup.object().shape({
        size: yup.string().required(sizeRequired),
        type: yup.string().required(typeRequired),
        furnished: yup.string().required(furnishedRequired),
        what_i_am: yup.string().required(whatIAmRequired),
        cost: yup.number().typeError(costTypeError).required(costRequired),
        deposit: yup
            .number()
            .typeError(depositTypeError)
            .required(depositRequired),
    });
};

const stepThreeSchema = (t) => {
    const {
        selectedAmenitiesMin,
        selectedAmenitiesRequired,
        availableFromTypeError,
        availableFromMin,
        availableFromRequired,
        minimumStayRequired,
        maximumStayTest,
        maximumStayRequired,
        daysAvailableRequired,
    } = t("validation.stepThreeFlat");

    return yup.object().shape({
        selectedAmenities: yup
            .array()
            .min(1, selectedAmenitiesMin)
            .required(selectedAmenitiesRequired),
        available_from: yup
            .date()
            .typeError(availableFromTypeError)
            .min(new Date(), availableFromMin)
            .required(availableFromRequired),
        // furnished: yup.string().required("Room furnished is required"),
        minimum_stay: yup.string().required(minimumStayRequired),
        maximum_stay: yup
            .string()
            .test("greater-than-minimum", maximumStayTest, function (value) {
                const minimumStay = this.resolve(yup.ref("minimum_stay"));
                if (!minimumStay || !value) {
                    return true; // Allow validation to pass if either field is empty
                }
                return parseInt(value, 10) > parseInt(minimumStay, 10);
            })
            .required(maximumStayRequired),
        days_available: yup.string().required(daysAvailableRequired),
    });
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

const stepFiveSchema = (t) => {
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
    });
};

const stepSixSchema = (t) => {
    const {
        titleMin,
        titleMax,
        titleRequired,
        descriptionMin,
        descriptionMax,
        descriptionRequired,
        photosMax,
        photosFileFormat,
        photosFileSize,
    } = t("validation.stepSix");

    return yup.object().shape({
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
        photos: yup
            .array()
            .max(maxFiles, photosMax)
            .of(
                yup
                    .mixed()
                    .test("fileFormat", photosFileFormat, (value) =>
                        supportedFormats.includes(value.type)
                    )
                    .test("fileSize", photosFileSize, (value) =>
                        value ? value.size <= 1048576 : true
                    )
            ),
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

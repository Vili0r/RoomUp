import * as yup from "yup";

const maxFiles = 9;
const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];

const stepOneSchema = (t) => {
    const {
        cityMax,
        cityRequired,
        areaMax,
        areaRequired,
        roomSizeRequired,
        availableFromTypeError,
        availableFromMin,
        availableFromRequired,
        searchingForRequired,
        minimumStayRequired,
        maximumStayTest,
        maximumStayRequired,
        daysAvailableRequired,
        budgetTypeError,
        budgetRequired,
    } = t("validation.stepOneFlatmate");

    return yup.object().shape({
        city: yup.string().max(20, cityMax).required(cityRequired),
        area: yup.string().max(20, areaMax).required(areaRequired),
        available_from: yup
            .date()
            .typeError(availableFromTypeError)
            .min(new Date(), availableFromMin)
            .required(availableFromRequired),
        searching_for: yup.string().required(searchingForRequired),
        room_size: yup.string().required(roomSizeRequired),
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
        budget: yup
            .number()
            .typeError(budgetTypeError)
            .required(budgetRequired),
    });
};

const stepTwoSchema = (t) => {
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
    const {
        myAgeTypeError,
        myAgeMin,
        myAgeRequired,
        mySmokerRequired,
        myPetsRequired,
        myOccupationRequired,
        myGenderRequired,
    } = t("validation.stepTwoFlatmate");

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

        age: yup
            .number()
            .typeError(myAgeTypeError)
            .min(18, myAgeMin)
            .required(myAgeRequired),
        smoker: yup.string().required(mySmokerRequired),
        pets: yup.string().required(myPetsRequired),
        occupation: yup.string().required(myOccupationRequired),
        gender: yup.string().required(myGenderRequired),
    });
};

const stepThreeSchema = (t) => {
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

const stepFourSchema = (t) => {
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

export { stepOneSchema, stepTwoSchema, stepThreeSchema, stepFourSchema };

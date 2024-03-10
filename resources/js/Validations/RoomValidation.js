import * as yup from "yup";
const maxFiles = 9;

const editRoomSchema = (t) => {
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
    const {
        titleMin,
        titleMax,
        titleRequired,
        descriptionMin,
        descriptionMax,
        descriptionRequired,
        photosMax,
    } = t("validation.stepSix");

    return yup.object().shape({
        sub_title: yup
            .string()
            .min(10, titleMin)
            .max(25, titleMax)
            .required(titleRequired),
        sub_description: yup
            .string()
            .min(50, descriptionMin)
            .max(250, descriptionMax)
            .required(descriptionRequired),
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
            .test("greater-than-minimum", maximumStayTest, function (value) {
                const minimumStay = this.resolve(yup.ref("minimum_stay"));
                if (!minimumStay || !value) {
                    return true; // Allow validation to pass if either field is empty
                }
                return parseInt(value, 10) > parseInt(minimumStay, 10);
            })
            .required(maximumStayRequired),
        days_available: yup.string().required(daysAvailableRequired),
        images: yup.array().max(maxFiles, photosMax),
    });
};

export default editRoomSchema;

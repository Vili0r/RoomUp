import * as yup from "yup";

const customerContactSchema = (t) => {
    const { firstNameRequired, firstNameMax, emailType, emailRequired } = t(
        "validation.register.stepOne"
    );

    const { descriptionMin, descriptionMax, descriptionRequired } =
        t("validation.stepSix");
    const { lastNameRequired } = t("validation.register.stepOne");
    const { reasonRequired } = t("validation.reportedListing");

    return yup.object().shape({
        first_name: yup
            .string()
            .max(255, firstNameMax)
            .required(firstNameRequired),
        last_name: yup
            .string()
            .max(255, firstNameMax)
            .required(lastNameRequired),
        email: yup.string().email(emailType).required(emailRequired),
        reason: yup.string().required(reasonRequired),
        details: yup
            .string()
            .min(10, descriptionMin)
            .max(200, descriptionMax)
            .required(descriptionRequired),
    });
};

export default customerContactSchema;
